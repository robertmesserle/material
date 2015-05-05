angular
    .module('material.components.chips')
    .controller('MdAutocompleteChipsCtrl', MdAutocompleteChipsCtrl);



/**
 * Controller for the MdAutocompleteChips component
 * @constructor
 */
function MdAutocompleteChipsCtrl () {
  /** @type {Object} */
  this.selectedItem = null;

  /** @type {string} */
  this.searchText = '';
}


MdAutocompleteChipsCtrl.prototype.queryItem = function(searchText) {
  var results = this.itemQuery({'$query': searchText});
  return this.filterSelected ?
      results.filter(this.filterSelectedItems.bind(this)) : results;
};


MdAutocompleteChipsCtrl.prototype.filterSelectedItems = function(item) {
  return this.items.indexOf(item) == -1;
};
