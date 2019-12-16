(function (blocks, editor, components, i18n, element) {


  var el = element.createElement;

  var svgIcon = el('svg', {width: '24', height: '24', viewBox: '0 0 24 24'},
    el('path', {fill: '#333', d: 'M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z'}),
    el('path', {fill: 'none',    d: 'M0 0h24v24H0z'})
  );


  /**
   * Register the "Video Embed" content block.
   */

  blocks.registerBlockType('elements/spacer', {


    title: i18n.__('Spacer', 'elements'),
    category: 'elements',
    icon: svgIcon,


    attributes: {
      size: { type: 'string', default: '1' },
      domClasses: { type: 'string' },
      domID: { type: 'string' }
    },


    edit: function(props) {

      var attributes = props.attributes;

      return [

        el(editor.InspectorControls, { key: 'inspector' },

          el(components.PanelBody, {
            title: i18n.__('Spacer Settings'),
            initialOpen: true
          },
          
            el(components.TextControl, {
              type: 'number',
              min: 1,
              max: 10,
              label: 'Spacer Size',
              value: attributes.size,
              onChange: function(value) {
                props.setAttributes({ size: value })
              }
            })
          
          ),

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
                value: attributes.domClasses,
                onChange: function(value) {
                  props.setAttributes({ domClasses: value })
                }
              })
            )

          )

        ),

        el( 'div', { class: 'block-spacer', style: {
          'height': attributes.size + 'rem', 
          'line-height': attributes.size + 'rem'
        } }, 'Vertical Spacer')

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