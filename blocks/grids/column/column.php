<?php

register_block_type("{$block['path']}", array(

    'editor_script' => "block__{$block['slug']}__script",
    'editor_style'  => "block__{$block['slug']}__style",

    'render_callback' => function($attributes, $content) {

        $classes  = "w-" . ($attributes['sizeMobile'] ?? 12) . "/12";
        $classes .= " order-" . ($attributes['orderMobile'] ?? 1);
        $classes .= " pt-" . ($attributes['paddingMobiley1'] ?? 1) * 4;
        $classes .= " pr-" . ($attributes['paddingMobilex2'] ?? 1) * 4;
        $classes .= " pb-" . ($attributes['paddingMobiley2'] ?? 1) * 4;
        $classes .= " pl-" . ($attributes['paddingMobilex1'] ?? 1) * 4;
        $classes .= " md:w-" . ($attributes['size'] ?? 12) . "/12";
        $classes .= " md:order-" . ($attributes['order'] ?? 1);
        $classes .= " md:pt-" . ($attributes['paddingy1'] ?? 1) * 4;
        $classes .= " md:pr-" . ($attributes['paddingx2'] ?? 1) * 4;
        $classes .= " md:pb-" . ($attributes['paddingy2'] ?? 1) * 4;
        $classes .= " md:pl-" . ($attributes['paddingx1'] ?? 1) * 4;

        $output = "<div class='column {$classes}'>";
        $output .= $content;
        $output .= "</div>";

        return $output;

}));