<?php

register_block_type("{$block['path']}", array(

    'editor_script' => "block__{$block['slug']}__script",
    'editor_style'  => "block__{$block['slug']}__style",

    'render_callback' => function($attributes, $content) {

        $classes  = "mt-" . ($attributes['mobileSize'] ?? 1) * 4;
        $classes .= " md:mt-" . ($attributes['size'] ?? 1) * 4;

        $output = "<div class='spacer block {$classes}'></div>";

        return $output;

}));