(function (blocks, editor, components, i18n, element) {


  var el = element.createElement;


  var svgIcon = el('svg', {width: '24', height: '24', viewBox: '0 0 24 24'},
    el('path', {fill: 'none',    d: 'M0 0h24v24H0z'}),
    el('path', {fill: '#EAA740', d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'})
  );


  /**
   * Register the "Video Embed" content block.
   */

  blocks.registerBlockType('grids/row', {


    title: i18n.__('Grid Row', 'grids'),
    category: 'grids',
    icon: svgIcon,


    attributes: {
      classes: { type: 'string' },
      domID: { type: 'string' }
    },


    edit: function(props) {

      var attributes = props.attributes;
      var classesID = '';

      if(attributes.domID) {
        classesID = classesID + '#' + attributes.domID
      }

      if(attributes.classes) {
        classesID = classesID + ' .';
        classesID = classesID + String(attributes.classes).replace(' ', '.');
      }


      return [

        el(editor.InspectorControls, { key: 'inspector' },

          el(components.PanelBody, {
            title: i18n.__('Row Settings'),
            initialOpen: true
          }),

          el(components.PanelBody, {
            title: i18n.__('Advanced Settings'),
            initialOpen: false
          },

            el( 'div', { class: 'sidebar-options-set' },
              el(components.TextControl, {
                type: 'text',
                label: i18n.__('Element ID'),
                value: attributes.domID,
                onChange: function(value) {
                  props.setAttributes({ domID: value.replace(' ', '-') })
                }
              })
            ),

            el( 'div', { class: 'sidebar-options-set' },
              el(components.TextControl, {
                type: 'text',
                label: i18n.__('Element Classes'),
                value: attributes.classes,
                onChange: function(value) {
                  props.setAttributes({ classes: value })
                }
              })
            )

          )

        ),

        el( 'div', { class: 'block-row' },

          el('div', { class: 'class-wrapper', 'data-classes': classesID }),

          el(editor.InnerBlocks, { allowedBlocks: ['grids/column'] })

        )

      ];

    },


    save: function(props) {

      return el(editor.InnerBlocks.Content);

    }


  });


})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
);