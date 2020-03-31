(function (blocks, editor, components, i18n, element) {


  var el = element.createElement;


  var svgIcon = el('svg', {width: '24', height: '24', viewBox: '0 0 24 24'},
    el('path', {fill: '#EAA740', d: 'M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z'}),
    el('path', {fill: 'none',    d: 'M0 0h24v24H0z'}),
  );


  /**
   * Register the "Video Embed" content block.
   */

  blocks.registerBlockType('grids/column', {


    title: i18n.__('Grid Column', 'grids'),
    category: 'grids',
    icon: svgIcon,

    attributes: {

      visible: { type: 'boolean', default: true },
      size: { type: 'string', default: '12' },
      paddingx1: { type: 'string', default: '1' },
      paddingx2: { type: 'string', default: '1' },
      paddingy1: { type: 'string', default: '1' },
      paddingy2: { type: 'string', default: '1' },

      visibleMobile: { type: 'boolean', default: true },
      sizeMobile: { type: 'string', default: '12' },
      paddingMobilex1: { type: 'string', default: '1' },
      paddingMobilex2: { type: 'string', default: '1' },
      paddingMobiley1: { type: 'string', default: '1' },
      paddingMobiley2: { type: 'string', default: '1' },
      orderMobile: { type: 'string', default: undefined },

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

      $('#block-' + props.clientId).attr('data-size', attributes.size);

      return [

        el(editor.InspectorControls, { key: 'inspector' },

          el(components.PanelBody, {
            title: i18n.__('Desktop Settings'),
            initialOpen: true
          },

            el('div', { class: 'sidebar-options-set' }, 
              el('fieldset', { class: 'inline-field' },
                el('strong', {}, 'Show Column'),
                el('label', {}, 
                  el('span', { class: 'input-toggle' }, 
                    el('input', { 
                      type: 'checkbox',
                      checked: attributes.visible == 'md:block' ? true : false,
                      onChange: function(event) {
                        props.setAttributes({ visible: event.target.checked ? 'md:block' : 'md:hidden' });
                      } 
                    })
                  )
                )
              )
            ),

            el( 'div', { class: 'sidebar-options-set' },

              el(components.SelectControl, {

                label: i18n.__('Column Width'),
                selected: attributes.size || '12',
                value: attributes.size || '12',

                options: [
                  {label: '12 / 12',  value: '12'},
                  {label: '11 / 12',  value: '11'},
                  {label: '10 / 12',  value: '10'},
                  {label: '9 / 12',   value: '9'},
                  {label: '8 / 12',   value: '8'},
                  {label: '7 / 12',   value: '7'},
                  {label: '6 / 12',   value: '6'},
                  {label: '5 / 12',   value: '5'},
                  {label: '4 / 12',   value: '4'},
                  {label: '3 / 12',   value: '3'},
                  {label: '2 / 12',   value: '2'},
                  {label: '1 / 12',   value: '1'}
                ],

                onChange: function(value) {

                  props.setAttributes({ size: value });
                  $('#block-' + props.clientId).attr('data-size', value);

                }

              })

            ),

            el( 'div', { class: 'sidebar-options-set' },

              el( 'div', { class: 'components-base-control__field' },
                el( 'label', { class: 'components-base-control__label' }, 'Column Padding')
              ),

              el( 'div', { class: 'inline-inputs' },

                el( 'div', { class: 'inline-input' },
                  el(components.TextControl, {
                    type: 'number',
                    min: 0,
                    max: 5,
                    label: 'Left',
                    value: attributes.paddingx1,
                    onChange: function(value) {
                      props.setAttributes({ paddingx1: value })
                    }
                  })
                ),

                el( 'div', { class: 'inline-input' },
                  el(components.TextControl, {
                    type: 'number',
                    min: 0,
                    max: 5,
                    label: 'Right',
                    value: attributes.paddingx2,
                    onChange: function(value) {
                      props.setAttributes({ paddingx2: value })
                    }
                  })
                ),

                el( 'div', { class: 'inline-input' },
                  el(components.TextControl, {
                    type: 'number',
                    min: 0,
                    max: 5,
                    label: 'Top',
                    value: attributes.paddingy1,
                    onChange: function(value) {
                      props.setAttributes({ paddingy1: value })
                    }
                  })
                ),

                el( 'div', { class: 'inline-input' },
                  el(components.TextControl, {
                    type: 'number',
                    min: 0,
                    max: 5,
                    label: 'Bottom',
                    value: attributes.paddingy2,
                    onChange: function(value) {
                      props.setAttributes({ paddingy2: value })
                    }
                  })
                )
              
              )

            )

          ),

          el(components.PanelBody, {
            title: i18n.__('Mobile Settings'),
            initialOpen: false
          },

            el('div', { class: 'sidebar-options-set' }, 
              el('fieldset', { class: 'inline-field' },
                el('strong', {}, 'Show Column'),
                el('label', {}, 
                  el('span', { class: 'input-toggle' }, 
                    el('input', { 
                      type: 'checkbox',
                      checked: attributes.visibleMobile == 'block' ? true : false,
                      onChange: function(event) {
                        props.setAttributes({ visibleMobile: event.target.checked ? 'block' : 'hidden' });
                      } 
                    })
                  )
                )
              )
            ),
          
            el( 'div', { class: 'sidebar-options-set' },

              el(components.SelectControl, {

                label: i18n.__('Column Size'),
                selected: attributes.sizeMobile ? attributes.sizeMobile : '12',
                value: attributes.sizeMobile ? attributes.sizeMobile : '12',

                options: [
                  {label: '12 / 12',  value: '12'},
                  {label: '11 / 12',  value: '11'},
                  {label: '10 / 12',  value: '10'},
                  {label: '9 / 12',   value: '9'},
                  {label: '8 / 12',   value: '8'},
                  {label: '7 / 12',   value: '7'},
                  {label: '6 / 12',   value: '6'},
                  {label: '5 / 12',   value: '5'},
                  {label: '4 / 12',   value: '4'},
                  {label: '3 / 12',   value: '3'},
                  {label: '2 / 12',   value: '2'},
                  {label: '1 / 12',   value: '1'}
                ],

                onChange: function(value) {

                  props.setAttributes({ sizeMobile: value });

                }

              })

            ),

            el( 'div', { class: 'sidebar-options-set' },

              el( 'div', { class: 'components-base-control__field' },
                el( 'label', { class: 'components-base-control__label' }, 'Column Padding')
              ),

              el( 'div', { class: 'inline-inputs' },

                el( 'div', { class: 'inline-input' },
                  el(components.TextControl, {
                    type: 'number',
                    min: 0,
                    max: 5,
                    label: 'Left',
                    value: attributes.paddingMobilex1,
                    onChange: function(value) {
                      props.setAttributes({ paddingMobilex1: value })
                    }
                  })
                ),

                el( 'div', { class: 'inline-input' },
                  el(components.TextControl, {
                    type: 'number',
                    min: 0,
                    max: 5,
                    label: 'Right',
                    value: attributes.paddingMobilex2,
                    onChange: function(value) {
                      props.setAttributes({ paddingMobilex2: value })
                    }
                  })
                ),

                el( 'div', { class: 'inline-input' },
                  el(components.TextControl, {
                    type: 'number',
                    min: 0,
                    max: 5,
                    label: 'Top',
                    value: attributes.paddingMobiley1,
                    onChange: function(value) {
                      props.setAttributes({ paddingMobiley1: value })
                    }
                  })
                ),

                el( 'div', { class: 'inline-input' },
                  el(components.TextControl, {
                    type: 'number',
                    min: 0,
                    max: 5,
                    label: 'Bottom',
                    value: attributes.paddingMobiley2,
                    onChange: function(value) {
                      props.setAttributes({ paddingMobiley2: value })
                    }
                  })
                )
              
              )

            ),

            el( 'div', { class: 'sidebar-options-set' },
              el(components.TextControl, {
                type: 'number',
                label: i18n.__('Column Order'),
                value: attributes.orderMobile ? attributes.orderMobile : '',
                onChange: function(value) {
                  props.setAttributes({ orderMobile: value })
                }
              })
            )
          
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

        el( 'div', { class: 'block-col' },

          el('div', { class: 'class-wrapper', 'data-size': 'col-' + attributes.size, 'data-classes': classesID }),

          el(editor.InnerBlocks, {})

        )

      ];

    },


    save: function(props) {

      return el(editor.InnerBlocks.Content);

    }


  });


  $(window).on('load', function() {

    $('div[data-type="grids/column"]').each(function(i) {

      var column = $('div[data-type="grids/column"]').eq(i);
      var block = column.find('div[data-block]').first()
      var wrapper = block.find('.class-wrapper').first()
      var size = wrapper.attr('data-size').replace('col-', '')

      column.attr('data-size', size)
  
      console.log(size)
  
    });

  })


})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
);