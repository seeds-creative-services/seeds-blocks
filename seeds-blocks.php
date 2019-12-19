<?php

/**
Plugin Name: Seeds Content Blocks
Description: Custom content blocks for building full-featured pages.
Version: 1.0.0
Author: Seeds Creative Services, LLC.
Author URI: https://seedscreativeservices.com
Text Domain: seeds_blocks
*/

class SeedsBlocks {
  
  public static $blocks = array();

  public function __construct() {

    /**
     * Exit if this file is accessed directly.
     */

    defined('ABSPATH') || exit;


    /**
     * Remove the default Gutenberg color themes.
     * @since 1.0.0
     */

    add_action('after_setup_theme', function() {

      add_theme_support('editor-color-palette');
      add_theme_support('disable-custom-colors');

    });


    /**
     * Override default Gutenberg styles.
     * Load global block Javascript files.
     * @since 1.0.0
     */

    add_action('admin_enqueue_scripts', function() {

      $scriptURL = plugins_url() . "/seeds-blocks/seeds-blocks.js";
      wp_register_script('seeds-blocks-script', $scriptURL, array('jquery'), '1.0.0', 'all');
      wp_enqueue_script('seeds-blocks-script');
    
    });


    $this->FetchCustomBlocks();
    $this->CreateCustomBlockCategories();

    $this->ActivateBlocks();
    $this->RegisterCustomBlocks();
    

  }

  public function FetchCustomBlocks() {

    $blocksPlugin = dirname(__FILE__) . "/blocks";
    $blocksTheme = get_stylesheet_directory() . "/theme/blocks";

    $counter_category = -1;

    /**
     * Load global custom blocks from the plugin.
     */

    foreach(scandir($blocksPlugin) as $category) {

      if(!in_array($category, array('.', '..')) && is_dir("{$blocksPlugin}/{$category}")) {

        $counter_category++;

          self::$blocks['categories'][$counter_category] = array(
            "slug" => $category,
            "title" => ucwords(str_replace("-", " ", $category))
          );

          foreach(scandir("{$blocksPlugin}/{$category}") as $block) {

            if(!in_array($block, array('.', '..')) && is_dir("{$blocksPlugin}/{$category}/{$block}")) {

              self::$blocks['blocks'][] = array(
                "slug" => $block,
                "dir" => "{$blocksPlugin}/{$category}/{$block}",
                "url" => plugins_url() . "/seeds-blocks/blocks/{$category}/{$block}",
                "path" => "{$category}/{$block}",
                "title" => ucwords(str_replace("-", " ", $block)),
                "category" => $category
              );

            }

          }

      }

    }

    /** 
     * Load specific custom blocks from the theme.
     */

    foreach(scandir($blocksTheme) as $category) {

      if(!in_array($category, array('.', '..')) && is_dir("{$blocksTheme}/{$category}")) {

        $counter_category++;

          self::$blocks['categories'][$counter_category] = array(
            "slug" => $category,
            "title" => ucwords(str_replace("-", " ", $category))
          );

          foreach(scandir("{$blocksTheme}/{$category}") as $block) {

            if(!in_array($block, array('.', '..')) && is_dir("{$blocksTheme}/{$category}/{$block}")) {

              self::$blocks['blocks'][] = array(
                "slug" => $block,
                "dir" => "{$blocksTheme}/{$category}/{$block}",
                "url" => get_stylesheet_directory_uri() . "/theme/blocks/{$category}/{$block}",
                "path" => "{$category}/{$block}",
                "title" => ucwords(str_replace("-", " ", $block)),
                "category" => $category
              );

            }

          }

      }

    }

  }

  public function CreateCustomBlockCategories() {

    add_filter('block_categories', function($categories, $post) {

      return array_merge(self::$blocks['categories'], $categories);
    
    }, 10, 2);

  }

  public function ActivateBlocks() {

    add_filter('allowed_block_types', function($allowed_blocks) {


      /** 
       * Allow customer Seeds blocks.
       */

      $blocks_custom = array();
      foreach(self::$blocks['blocks'] as $block) {

        $blocks_custom[] = $block['path'];

      }


      /**
       * Allow WordPress common blocks.
       */

      $blocks_common = array(
        'core/heading',
        'core/paragraph',
        // 'core/gallery',
        'core/image',
        'core/list',
        // 'core/quote',
        // 'core/audio',
        // 'core/cover',
        // 'core/file',
        // 'core/video'
      );


      /**
       * Allow WordPress formatting blocks.
       */

      $blocks_formatting = array(
        'core/table',
        // 'core/verse',
        // 'core/code',
        // 'core/freeform',
        // 'core/html',
        // 'core/preformatted',
        // 'core/pullquote'
      );


      /**
       * Allow WordPress layout blocks.
       */

      $blocks_layout = array(
        // 'core/button',
        'core/text-columns',
        'core/media-text',
        // 'core/more',
        // 'core/nextpage',
        // 'core/separator',
        // 'core/spacer'
      );


      /**
       * Allow WordPress widget blocks.
       */

      $blocks_widgets = array(
        'core/shortcode',
        // 'core/archives',
        // 'core/categories',
        // 'core/latest-comments',
        // 'core/latest-posts'
      );


      /**
       * If WooCommerce is available, allow WooCommerce blocks.
       */

      $blocks_plugins = array();
      if(class_exists('WooCommerce') && defined('WGPB_VERSION')) {

        $blocks_plugins[] = 'woocommerce/featured-product';
        $blocks_plugins[] = 'woocommerce/handpicked-products';
        $blocks_plugins[] = 'woocommerce/product-best-sellers';
        $blocks_plugins[] = 'woocommerce/product-category';
        $blocks_plugins[] = 'woocommerce/product-new';
        $blocks_plugins[] = 'woocommerce/product-on-sale';
        $blocks_plugins[] = 'woocommerce/product-top-rated';
        $blocks_plugins[] = 'woocommerce/products-by-attribute';
    
      }


      /**
       * Return the allowed blocks as an array.
       */

      return array_merge(
        $blocks_custom,
        $blocks_common,
        $blocks_formatting,
        $blocks_layout,
        $blocks_widgets,
        $blocks_plugins
      );

    }, 10, 2);

  }

  public function RegisterCustomBlocks() {

    add_action('init', function() {

      /**
       * Do nothing if Gutenberg blocks aren't supported.
       */

      if(!function_exists('register_block_type')) return;


      /** 
       * Loop through each of the custom blocks.
       */

      foreach(self::$blocks['blocks'] as $block) {


        /** 
         * Register the blocks Javascript file.
         */

        if(file_exists("{$block['dir']}/{$block['slug']}.js")) {

          wp_register_script(
            "block__{$block['slug']}__script",
            "{$block['url']}/{$block['slug']}.js",
            array('wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor'),
            filemtime("{$block['dir']}/{$block['slug']}.js"),
            true
          );

        }


        /** 
         * Register the blocks Stylesheet file.
         */

        if(file_exists("{$block['dir']}/{$block['slug']}.css")) {

          wp_register_style(
            "block__{$block['slug']}__style",
            "{$block['url']}/{$block['slug']}.css",
            array('wp-edit-blocks'),
            filemtime("{$block['dir']}/{$block['slug']}.css")
          );

        }


        /**
         * Register the custom block.
         */

        register_block_type("{$block['path']}", array(

          'editor_script' => "block__{$block['slug']}__script",
          'editor_style'  => "block__{$block['slug']}__style",

          'render_callback' => function($attributes, $content) {

            if(file_exists("{$block['dir']}/{$block['slug']}.php")) {

              include("{$block['dir']}/{$block['slug']}.php");

            }

          }

        ));

      }
      
    });
    
  }

}

global $SeedsBlocks;
$SeedsBlocks = new SeedsBlocks;