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
    this.selectedItem = null;

    /** @type {string} */
    this.searchText = '';
  }


  MdContactChipsCtrl.prototype.queryContact = function(searchText) {
    var results = this.contactQuery({'$query': searchText});
    return this.filterSelected ?
        results.filter(this.filterSelectedContacts.bind(this)) : results;
  };


  MdContactChipsCtrl.prototype.filterSelectedContacts = function(contact) {
    return !this.filterSelected || (this.contacts.indexOf(contact) == -1);
  };

  // Init methods

  // Event methods

  // Helper methods.
})();
