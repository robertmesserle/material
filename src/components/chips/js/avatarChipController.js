angular
    .module('material.components.chips')
    .controller('MdChipTemplateCtrl', MdChipTemplateCtrl);



/**
 * Controller for the MdChipTemplateCtrl component
 * @constructor
 */
function MdChipTemplateCtrl ($scope) {
  this.parent = $scope.$parent;

  /**
   * Mapping from the fields of the user object to the fields required to
   * render an avatar.
   * @type {Object}
   * */
  this.chipDataMap;

  /**
   * Object whose keys are the keys provided in {@code chipDataMap}, and whose values are functions
   * which return the item's value for that key.
   * @type {Object}
   * */
  this.item = {};
}

MdChipTemplateCtrl.prototype.initItemMap = function() {
  var self = this;
  angular.forEach(this.chipDataMap, function(value, key) {
    self.item[key] = function() {
      return self.parent.$chip[value];
    }
  });
};
