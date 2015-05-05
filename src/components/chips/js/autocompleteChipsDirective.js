angular
    .module('material.components.chips')
    .directive('mdAutocompleteChips', MdAutocompleteChips);

/**
 * @ngdoc directive
 * @name mdAutocompleteChips
 * @module material.components.chips
 *
 * @description
 * `<md-autocomplete-chips>` is an input component based on `md-chips` and makes use of an
 *    `md-autocomplete` element. The component allows the caller to supply a query expression
 *    which returns  a list of possible items. The user can select one of these and add it to
 *    the list of chips.
 *
 * @param {string=|object=} ng-model A model to bind the list of items to
 * @param {string=} placeholder Placeholder text that will be forwarded to the input.
 * @param {string=} secondary-placeholder Placeholder text that will be forwarded to the input,
 *    displayed when there is at least on item in the list
 * @param {expression} md-items An expression expected to return items matching the search
 *    test, `$query`.
 * @param {string} md-avatar-name The field name of the item object representing the
 *    item's name.
 * @param {string} md-item-email The field name of the item object representing the
 *    item's email address.
 * @param {string} md-item-image The field name of the item object representing the
 *    item's image.
 * @param {expression=} filter-selected Whether to filter selected items from the list of
 *    suggestions shown in the autocomplete.
 *
 *
 *
 * @usage With a chip template decorator, such as `md-avatar-chip`.
 * <hljs lang="html">
 *   <md-autocomplete-chips
 *       ng-model="ctrl.items"
 *       md-items="ctrl.querySearch($query)"
 *       md-avatar-name="name"
 *       md-item-image="image"
 *       md-item-email="email"
 *       md-filter-selected="ctrl.filterSelected"
 *       placeholder="To">
 *     <md-chip-template
 *         my-chip-template
 *         item-data-map="{}">
 *     </md-chip-template>
 *   </md-autocomplete-chips>
 * </hljs>
 *
 * with a custom chip template
 * <hljs lang="html">
 *   <md-autocomplete-chips
 *       ng-model="ctrl.items"
 *       md-items="ctrl.querySearch($query)"
 *       md-avatar-name="name"
 *       md-item-image="image"
 *       md-item-email="email"
 *       md-filter-selected="ctrl.filterSelected"
 *       placeholder="To">
 *     <md-chip-template>...</md-chip-template>
 *   </md-autocomplete-chips>
 * </hljs>
 *
 */


var MD_AUTOCOMPLETE_CHIPS_TEMPLATE = '\
    <md-chips class="md-autocomplete-chips"\
        ng-model="$mdAutocompleteChipsCtrl.items"\
        md-require-match="$mdAutocompleteChipsCtrl.requireMatch"\
        md-chip-content-template="{{$mdAutocompleteChipsCtrl.chipContentsTemplate}}"\
        md-autocomplete-snap>\
        <md-autocomplete\
            md-menu-class="md-autocomplete-chips-suggestions"\
            md-selected-item="$mdAutocompleteChipsCtrl.selectedItem"\
            md-search-text="$mdAutocompleteChipsCtrl.searchText"\
            md-items="item in $mdAutocompleteChipsCtrl.queryItem($mdAutocompleteChipsCtrl.searchText)"\
            md-item-text="$mdAutocompleteChipsCtrl.itemName"\
            md-no-cache="$mdAutocompleteChipsCtrl.filterSelected"\
            md-autoselect\
            placeholder="{{$mdAutocompleteChipsCtrl.items.length == 0 ?\
                $mdAutocompleteChipsCtrl.placeholder : $mdAutocompleteChipsCtrl.secondaryPlaceholder}}">\
          <div class="md-item-suggestion">\
            <img \
                ng-src="{{item[$mdAutocompleteChipsCtrl.itemImage]}}"\
                alt="{{item[$mdAutocompleteChipsCtrl.itemName]}}" />\
            <span class="md-avatar-name" md-highlight-text="$mdAutocompleteChipsCtrl.searchText">\
              {{item[$mdAutocompleteChipsCtrl.itemName]}}\
            </span>\
            <span class="md-item-email" >{{item[$mdAutocompleteChipsCtrl.itemSecondary]}}</span>\
          </div>\
        </md-autocomplete>\
    </md-chips>';

/**
 * MdAutocompleteChips Directive Definition
 *
 * @param $mdTheming
 * @returns {*}
 * @ngInject
 */
function MdAutocompleteChips ($mdTheming, $mdUtil) {
  return {
    template: function(element, attrs) {
      // Clone the element into an attribute. By prepending the attribute
      // name with '$', Angular won't write it into the DOM. The cloned
      // element propagates to the link function via the attrs argument,
      // where various contained-elements can be consumed.
      attrs['$mdUserTemplate'] = element.clone();
      return MD_AUTOCOMPLETE_CHIPS_TEMPLATE;
    },
    require: ['mdAutocompleteChips'],
    restrict: 'E',
    controller: 'MdAutocompleteChipsCtrl',
    controllerAs: '$mdAutocompleteChipsCtrl',
    bindToController: true,
    compile: compile,
    scope: {
      itemQuery: '&mdItems',
      placeholder: '@',
      secondaryPlaceholder: '@',
      itemImage: '@mdItemImage',
      itemName: '@mdItemName',
      itemSecondary: '@mdItemSecondary',
      filterSelected: '=',
      items: '=ngModel',
      requireMatch: '=?mdRequireMatch'
    }
  };

  function compile(element, attr) {
    var userTemplate = attr['$mdUserTemplate'];
    delete attr['$mdUserTemplate'];

    var chipContentsTemplate = getTemplateByQuery('md-chip-template') || 'HELLO';


    function getTemplateByQuery (query) {
      var element = userTemplate[0].querySelector(query);
      return element && element.outerHTML;
    }

    return function postLink(scope, element, attrs, controllers) {
      element.attr('tabindex', '-1');
      $mdUtil.initOptionalProperties(scope, attr);
      $mdTheming(element);

      var ctrl = controllers[0];
      ctrl.chipContentsTemplate = chipContentsTemplate;
    };
  }
}
