angular
    .module('material.components.chips')
    .directive('mdAvatarChipTemplate', MdAvatarChipTemplate);

/**
 * @ngdoc directive
 * @name mdChips
 * @module material.components.chips
 *
 * @description

 * @param {object} md-chip-data-map An object containing keys `name` and `image`, with values
 *    corresponding to the fieldnames of the chip object.
 *
 * @usage
 * <hljs lang="html">
 *   <md-chip-template
 *       md-avatar-chip-template
 *       md-chip-data-map="{name: 'myNameField', image: 'myImageField'}">
 *   </md-chip-template>
 * </hljs>
 *
 */

var MD_AVATAR_CHIP_TEMPLATE = '\
    <md-chip-template>\
      <div class="md-item-avatar">\
        <img \
            ng-src="{{$ctrl.item.image()}}"\
            alt="{{$ctrl.item.name()" />\
      </div>\
      <div class="md-avatar-name">\
        {{$ctrl.item.name()}}\
      </div>\
    </md-chip-template>';

/**
 * MdAvatarChipTemplate directive definition.
 */
function  MdAvatarChipTemplate($mdTheming, $mdUtil) {
  return {
    template: function(element, attrs) {
      return MD_AVATAR_CHIP_TEMPLATE;
    },
    restrict: 'A',
    compile: compile,
    controller: 'MdChipTemplateCtrl',
    controllerAs: '$ctrl',
    bindToController: true,
    replace: true,
    require: ['mdAvatarChipTemplate'],
    scope: {
      chipDataMap: '=mdChipDataMap'
    }
  };

  function compile(element, attr) {
    return function postLink(scope, element, attrs, controllers) {
      var avatarChipCtrl = controllers[0];
      avatarChipCtrl.initItemMap();
    };
  }
}

