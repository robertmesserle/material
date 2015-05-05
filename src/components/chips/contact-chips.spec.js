describe('<md-autocomplete-chips>', function() {
  var scope;
  var AUTOCOMPLETE_CHIPS_TEMPLATE = '\
      <md-autocomplete-chips\
          ng-model="items"\
          md-items="querySearch($query)"\
          md-avatar-name="name"\
          md-item-image="image"\
          md-item-email="email"\
          filter-selected="filterSelected"\
          placeholder="To">\
      </md-autocomplete-chips>';

  beforeEach(module('material.components.chips'));

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    var img = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    scope.allContacts = [
      {
        name : 'NAME',
        email : 'email',
        image : img
      },{
        name : 'NAME2',
        email : 'email2',
        image : img
      },{
        name : 'NAME3',
        email : 'email3',
        image : img
      }
    ];
    scope.items = [];
  }));

  describe('basic functionality', function () {
    it('should show the placeholder', inject(function($timeout) {
      var element = buildChips(AUTOCOMPLETE_CHIPS_TEMPLATE);
      var ctrl = element.controller('mdAutocompleteChips');
      $timeout.flush();
      expect(element.find('input').length).toBe(1);
      expect(element.find('input')[0].placeholder).toBe('To');
    }));

    describe('filtering selected items', function() {
      it('should filter when enabled', inject(function($timeout) {
        scope.querySearch = jasmine.createSpy('querySearch').and.callFake(function(q) {
          return scope.allContacts;
        });
        scope.items.push(scope.allContacts[2]);
        scope.filterSelected = true;
        var element = buildChips(AUTOCOMPLETE_CHIPS_TEMPLATE);
        var ctrl = element.controller('mdAutocompleteChips');
        $timeout.flush();

        var autocompleteElement = element.find('md-autocomplete');
        var autocompleteCtrl = autocompleteElement.controller('mdAutocomplete');
        element.scope().$apply(function() {
          autocompleteCtrl.scope.searchText = 'NAME';
          autocompleteCtrl.keydown({});
        });

        var matches = autocompleteCtrl.matches;
        expect(matches.length).toBe(2);
      }));

      it('should not filter when disabled', inject(function($timeout) {
        scope.querySearch = jasmine.createSpy('querySearch').and.callFake(function(q) {
          return scope.allContacts;
        });
        scope.items.push(scope.allContacts[2]);
        scope.filterSelected = false;
        var element = buildChips(AUTOCOMPLETE_CHIPS_TEMPLATE);
        var ctrl = element.controller('mdAutocompleteChips');
        $timeout.flush();

        var autocompleteElement = element.find('md-autocomplete');
        var autocompleteCtrl = autocompleteElement.controller('mdAutocomplete');
        element.scope().$apply(function() {
          autocompleteCtrl.scope.searchText = 'NAME';
          autocompleteCtrl.keydown({});
        });

        var matches = autocompleteCtrl.matches;
        expect(matches.length).toBe(3);
      }));
    });

  });

  // *******************************
  // Internal helper methods
  // *******************************

  function buildChips (str) {
    var container;
    inject(function ($compile) {
      container = $compile(str)(scope);
      container.scope().$apply();
    });
    return container;
  }

});
