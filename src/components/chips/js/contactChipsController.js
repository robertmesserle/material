(function () {
  'use strict';
  angular
      .module('material.components.chips')
      .controller('MdContactChipsCtrl', MdContactChipsCtrl);



  /**
   * Controller for the MdContactChips component
   *
   * @param $scope
   * @param $mdUtil
   * @param $mdConstant
   * @param $log
   * @param $element
   * @constructor
   */
  function MdContactChipsCtrl ($scope, $mdConstant, $log, $element) {
    /** @type {Object} */
    this.$mdConstant = $mdConstant;

    /** @type {angular.$scope} */
    this.$scope = $scope;

    /** @type {$log} */
    this.$log = $log;

    /** @type {$element} */
    this.$element = $element;

    /** @type {angular.NgModelController} */
    this.ngModelCtrl = null;

    /** @type {Object} */
    this.mdAutocompleteCtrl = null;

    /** @type {Array.<Object>} */
    this.contacts = [];

    /** @type {Object} */
    this.selectedItem = null;

    /** @type {string} */
    this.searchText = '';
  }


  MdContactChipsCtrl.prototype.getPlaceholder = function() {
    return this.items.length == 0 ?
        this.placeholder :
        this.secondaryPlaceholder ?
            this.secondaryPlaceholder :
            this.placeholder;
  };


  MdContactChipsCtrl.prototype.queryContact = function(searchText) {
    return this.contactQuery({'$query': searchText});
  };

  // Init methods

  // Event methods

  // Helper methods.
})();
