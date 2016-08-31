/* Copyright 2015 VMware, Inc. All rights reserved. -- VMware Confidential */
/*
 * Controller for the events view.
 */

(function() {
   'use strict';
   angular
         .module('com.vmware.platform.ui')
         .controller('EventsViewController', EventsViewController);

   EventsViewController.$inject = [
      '$scope',
      'i18nService',
      'userSessionService',
      'vuiConstants',
      '$http',
      'columnRenderersRegistry',
      '$window',
      'listViewColumnService',
      'timeFormatterService'
   ];

   function EventsViewController(
      $scope, 
      i18nService,
      userSessionService, 
      vuiConstants, 
      $http,
      columnRenderersRegistry, 
      $window, 
      listViewColumnService, 
      timeFormatterService) {

      var self = this;
      var i18n = i18nService.getString.bind(i18nService, 'EventUi');
      var targetNameRenderer =
            columnRenderersRegistry.getColumnRenderer('object-name');
      var defaultPageSize = 100;
      var viewId = $scope._view.$id;
      var columnsChangeHandler = listViewColumnService
            .getColumnChangeHandler(viewId, $scope);

      var VPROB_REGEX = /(vprob|esx)\./;
      var VPROB_SITE = 'http://www.vmware.com/esx/support/askvmware/index.php';

      var requestedPage = 0;
      var hasNextPage = false;

      // flag indicating whether or not there is a pending data request
      self.pendingRequest = false;

      var previousPageLabel = i18n('eventPrevPage');
      var previousPageButton = {
         id: 1,
         tooltipText: previousPageLabel,
         label: previousPageLabel,
         enabled: false,
         iconClass: 'vui-icon-object-nav-history-left-hover',
         onClick: function() {
            requestedPage--;
            fetchEvents();
         }
      };

      var nextPageLabel = i18n('eventNextPage');
      var nextPageButton = {
         id: 2,
         tooltipText: nextPageLabel,
         label: nextPageLabel,
         enabled: false,
         iconClass: 'vui-icon-object-nav-history-right-hover',
         onClick: function() {
            requestedPage++;
            fetchEvents();
         }
      };

      var columnDefinitions = [{
         displayName: i18n(
               'eventConsoleView.eventDescriptionColumn.headerText'),
         field: 'contextSensitiveMessage',
         template: function(dataItem) {
            var value = dataItem.contextSensitiveMessage;
            return '<div>' +
                  '<i class="icon-vSphere-events"></i>' +
                  '<span' +
                  '" title="' + value + '">' +
                  value + '</span>' +
                  '</div>';
         }
      }, {
         displayName: i18n('eventConsoleView.eventTypeColumn.headerText'),
         field: 'categoryName',
         template: function(dataItem) {
            var icon = 'vui-icon-datagrid-status-unknown';
            switch (dataItem.categoryKey) {
               case 'info':
                  icon = 'vui-icon-datagrid-status-info';
                  break;
               case 'error':
                  icon = 'vsphere-icon-status-error';
                  break;
               case 'user':
                  icon = 'vui-icon-user';
                  break;
               case 'warning':
                  icon = 'vsphere-icon-status-warning';
                  break;
            }
            return '<div><i class="' + icon + '"></i>' +
                  dataItem.categoryName + '</div>';
         }
      }, {
         displayName: i18n(
               'eventConsoleView.eventTriggeredOnColumn.headerText'),
         field: 'createdTime',
         searchable: false,
         template: function(dataItem) {
            return '<div>' + dataItem.createdTime + '</div>';
         }
      }, {
         displayName: i18n('eventConsoleView.relatedTaskColumn.headerText'),
         field: 'taskInfoName'
      }, {
         displayName: i18n('eventConsoleView.eventTargetColumn.headerText'),
         field: 'targetEntityName',
         template: function(dataItem) {
            return targetNameRenderer(['targetEntityId', 'targetIcon',
                     'targetEntityName', 'labelIds'],
                  dataItem);
         }
      }, {
         displayName: i18n('eventConsoleView.userColumn.headerText'),
         field: 'userName'
      }, {
         displayName: i18n('eventConsoleView.nativeTypeColumn.headerText'),
         field: 'nativeEventType'
      }];

      self.eventsListOptions = {
                  data:[],
                  sortOrder: [{
                     field: 'createdTime',
                     dir: 'desc'
                  }],
                  actionBarOptions: {
                     actions: [previousPageButton, nextPageButton]
                  },
                  sortMode: vuiConstants.grid.sortMode.SINGLE,
                  selectionMode: vuiConstants.grid.selectionMode.SINGLE,
                  selectedItems: [],
                  height: '100%',
                  resizable: true,
                  reorderable: true,
                  columnMenu: {
                     sortable: false, // this will hide sort menu items
                     messages: {
                        columns: i18nService.getString('CommonUi', 'listview.showColumnsMenu'),
                        filter: i18nService.getString('CommonUi', 'listview.filterMenu')
                     }
                  },
                  columnHide: columnsChangeHandler,
                  columnReorder: columnsChangeHandler,
                  columnResize: columnsChangeHandler,
                  columnShow: columnsChangeHandler
               };


      listViewColumnService.applyPersistedState(columnDefinitions, viewId)
            .then(function(columnDefs) {
               self.eventsListOptions.columnDefs = columnDefs;
               fetchEvents();
            });

      // Listen for changes in the selection
      $scope.$watch(
         function() {
            return self.eventsListOptions.selectedItems;
         },

         function(selectedItemsList) {
               self.showAskVmware = false;
               if (selectedItemsList.length === 1) {
                  self.selectedEvent = selectedItemsList[0];
                  if (VPROB_REGEX.test(self.selectedEvent.nativeEventType)) {
                     self.showAskVmware = true;
                  }
                  self.hasRelatedEvents = false;
                  self.relatedEventsListOptions.data = [];
                  fetchRelatedEvents(self.selectedEvent);
               } else {
                  self.selectedEvent = null;
                  self.hasRelatedEvents = false;
               }
         });

      self.splitterOptions = {
         orientation: vuiConstants.splitter.orientation.VERTICAL,
         panes: [{
            min: '140px'
         }, {
            min: '100px'
         }]
      };

      self.relatedEventsListOptions = {
         columnDefs: [{
            displayName: i18n(
                  'eventConsoleView.eventTriggeredOnColumn.headerText'),
            width: '20%',
            field: 'createdTime',
            searchable: false,
            template: function(dataItem) {
               return ['<div>',
                        '<i class="icon-vSphere-events"></i>',
                        dataItem.createdTime,
                     '</div>'].join('');
            }
         }, {
            displayName: i18n(
                  'eventConsoleView.eventDescriptionColumn.headerText'),
            field: 'contextSensitiveMessage',
            width: '80%',
            template: function(dataItem) {
               return ['<div>',
                  '<linked-text text="dataItem.linkableFormattedMessage" targets="dataItem.linkableEntities" fallback-text="dataItem.fullFormattedMessage">',
                  '</linked-text>',
                  '</div>'].join('');
            }
         }],
         data: [],
         sortMode: vuiConstants.grid.sortMode.SINGLE,
         selectionMode: vuiConstants.grid.selectionMode.SINGLE,
         selectedItems: [],
         height: '100%',
         resizable: true
      };

      // Enables/Disables the paging buttons
      function setButtonsAvailability(enabled) {
         previousPageButton.enabled = enabled && requestedPage !== 0;
         nextPageButton.enabled = enabled && hasNextPage;
      }

      // Update the data on global refresh
      self.refresh = fetchEvents;

      // Handles clicks on the "Ask VMware.." button
      self.openHelp = function(selectedEvent) {
         userSessionService.getUserSession().then(function(userSession) {
            var url = VPROB_SITE + '?' + angular.element.param({
               eventtype: selectedEvent.nativeEventType,
               language: userSession.locale
            });
            $window.open(url);
         });
      };

      function fetchRelatedEvents(selectedEvent) {

         return $http.get('events/', {
            params: {
               serverGuid: selectedEvent.serverGuid,
               key: selectedEvent.key,
               chainId: selectedEvent.chainId
            }
         }).then(function(data) {
            if (self.selectedEvent.key === selectedEvent.key) {
               self.relatedEventsListOptions.data = data.data
                  .filter(function(dataItem) {
                     return dataItem.key !== selectedEvent.key;
                  })
                  .map(function(dataItem) {
                     timeFormatterService.formatDate(dataItem.createdTime).then(function(formattedDate) {
                        dataItem.createdTime = formattedDate;
                     });

                     return dataItem;
                  });

               self.hasRelatedEvents = self.relatedEventsListOptions.data.length !== 0;
            }
         });
      }

      function fetchEvents() {
         if (self.pendingRequest === true) {
            return;
         }
         self.pendingRequest = true;
         setButtonsAvailability(false);
         $http.get('events/', {
            params: {
               objectId: $scope._route.objectId,
               requestedPage: requestedPage
            }
         }).then(function(data) {
            self.eventsListOptions.data = data.data;
            self.eventsListOptions.data.forEach(function(event) {
               timeFormatterService.formatDate(event.createdTime).then(function(formattedDate) {
                  event.createdTime = formattedDate;
               });
            });
            hasNextPage = data.data && data.data.length === defaultPageSize;
         }).finally(function() {
            self.pendingRequest = false;
            setButtonsAvailability(true);
         });
      }
   }
})();
