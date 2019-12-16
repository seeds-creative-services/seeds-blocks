(function (blocks, editor, components, i18n, element) {


  var el = element.createElement;

  var svgIcon = el('svg', {width: 24, height: 24},
    el('path', {fill: '#333', d: 'M 9.5 1 C 8.672 1 8 1.672 8 2.5 L 8 9 L 8 14 L 8 15.060547 L 5.3378906 13.710938 C 4.7798906 13.427938 4.1072344 13.492906 3.6152344 13.878906 C 2.8562344 14.474906 2.7887031 15.601203 3.4707031 16.283203 L 8.3085938 21.121094 C 8.8715937 21.684094 9.6346875 22 10.429688 22 L 17 22 C 18.657 22 20 20.657 20 19 L 20 12.193359 C 20 11.216359 19.292125 10.381703 18.328125 10.220703 L 11 9 L 11 2.5 C 11 1.672 10.328 1 9.5 1 z'})
  );


  /**
   * Register the "Video Embed" content block.
   */

  blocks.registerBlockType('elements/button', {


    title: i18n.__('Button', 'elements'),
    category: 'elements',
    icon: svgIcon,


    edit: function(props) {

      var attributes = props.attributes;

    },


    save: function(props) {

      return null;

    }


  });


})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
);