<?php

register_block_type("{$block['path']}", array(

    'editor_script' => "block__{$block['slug']}__script",
    'editor_style'  => "block__{$block['slug']}__style",

    'render_callback' => function($attributes, $content) {

        $output = "<div class='wrapper mx-auto'>";
        $output .= $content;
        $output .= "</div>";

        return $output;

}));