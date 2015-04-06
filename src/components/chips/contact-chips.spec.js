describe('<md-contact-chips>', function() {
  var scope;
  var CONTACT_CHIPS_TEMPLATE = '\
      <md-contact-chips\
          ng-model="contacts"\
          md-contacts="querySearch($query)"\
          md-contact-name="name"\
          md-contact-image="image"\
          md-contact-email="email"\
          filter-selected="filterSelected"\
          placeholder="To">\
      </md-contact-chips>';

  beforeEach(module('material.components.chips'));

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    scope.allContacts = [
      {
        name : 'NAME',
        email : 'email',
        image : 'image'
      },{
        name : 'NAME2',
        email : 'email2',
        image : 'image2'
      },{
        name : 'NAME3',
        email : 'email3',
        image : 'image3'
      }
    ];
    scope.contacts = [];
  }));

  describe('basic functionality', function () {
    it('should show the placeholder', inject(function($timeout) {
      var element = buildChips(CONTACT_CHIPS_TEMPLATE);
      var ctrl = element.controller('mdContactChips');
      $timeout.flush();
      expect(element.find('input').length).toBe(1);
      expect(element.find('input')[0].placeholder).toBe('To');
    }));

    it('should work like chips with autocomplete', function() {

    });

    it('should render the contacts name and image', function() {

    });

    describe('filtering selected items', function() {
      it('should filter when enabled', function() {

      });

      it('should not filter when disabled', function() {

      });
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
