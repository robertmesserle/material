(function () {
  'use strict';
  angular
      .module('material.components.chips')
      .directive('mdContactChips', MdContactChips);

  /**
   * @ngdoc directive
   * @name mdChips
   * @module material.components.chips
   *
   * @description
   * `<md-contact-chips>` is an input component
   * @param {string=|object=} ng-model A model to bind the list of items to
   * @param {string=} placeholder Placeholder text that will be forwarded to the input.
   * @param {string=} secondary-placeholder Placeholder text that will be forwarded to the input,
   *    displayed when there is at least on item in the list
   * @param {boolean=} readonly Disables list manipulation (deleting or adding list items), hiding
   *    the input and delete buttons
   * @param {expression} md-on-append An expression expected to convert the input string into an
   *    object when adding a chip.
   *
   * @usage
   * <hljs lang="html">
   *   <md-contact-chips
   *       ng-model="toRecipients"
   *       md-contacts="ctrl.querySearch($query)"
   *
   *       placeholder="To">
   *   </md-contact-chips>
   * </hljs>
   *
   */


  var MD_CONTACT_CHIPS_TEMPLATE = '\
      <md-chips\
          ng-model="$mdContactChipsCtrl.contacts">\
          <md-autocomplete\
              md-selected-item="$mdContactChipsCtrl.selectedItem"\
              md-search-text="$mdContactChipsCtrl.searchText"\
              md-items="item in $mdContactChipsCtrl.queryContact($mdContactChipsCtrl.searchText)"\
              md-item-text="$mdContactChipsCtrl.mdContactName"\
              placeholder="{{placeholder}}">\
            <span md-highlight-text="$mdContactChipsCtrl.searchText">{{item[$mdContactChipsCtrl.contactName]}}</span>\
          </md-autocomplete>\
          <md-chip-template>\
            <span>{{$chip[$parent.$parent.$parent.$mdContactChipsCtrl.contactName]}}</span>\
          </md-chip-template>\
      </md-chips>';


  /**
   * MDChips Directive Definition
   *
   * @param $mdTheming
   * @param $log
   * @param $compile
   * @param $timeout
   * @returns {*}
   * @ngInject
   */
  function MdContactChips ($mdTheming, $log, $compile, $timeout) {
    return {
      template: function(element, attrs) {
        return MD_CONTACT_CHIPS_TEMPLATE;
      },
      restrict: 'E',
      controller: 'MdContactChipsCtrl',
      controllerAs: '$mdContactChipsCtrl',
      bindToController: true,
      compile: compile,
      scope: {
        contactQuery: '&mdContacts',
        placeholder: '@',
        contactName: '@mdContactName',

        readonly: '=readonly',
        mdOnAppend:'&'
      }
    };

    /**
     *
     *
     * @param element
     * @param attr
     * @returns {Function}
     */
    function compile(element, attr) {
      /**
       * Configures controller and transcludes elements if necessary.
       */
      return function postLink(scope, element, attrs, controllers) {
        $mdTheming(element);
        element.attr('tabindex', '-1');
      };
    }
  }
})();
