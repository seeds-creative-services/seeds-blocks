(function (blocks, editor, components, i18n, element) {


  var el = element.createElement;


  var svgIcon = el('svg', {width: '24', height: '24', viewBox: '0 0 24 24'},
    el('path', {fill: '#EAA740', d: 'M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z'}),
    el('path', {fill: 'none', d: 'M0 0h24v24H0z'})
  );


  /**
   * Register the "Video Embed" content block.
   */

  blocks.registerBlockType('elements/wrapper', {


    title: i18n.__('Wrapper', 'elements'),
    category: 'elements',
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
            title: i18n.__('Wrapper Settings'),
            initialOpen: true
          },

            el('p', {}, 'Page wrapper settings')

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
                value: attributes.classes,
                onChange: function(value) {
                  props.setAttributes({ classes: value })
                }
              })
            )

          )

        ),

        el( 'div', { class: 'block-wrapper' },

          el('div', { class: 'class-wrapper', 'data-classes': classesID }),

          el(editor.InnerBlocks, {})

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