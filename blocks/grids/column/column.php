<?php

$domID = isset($attributes['domID']) ? $attributes['domID'] : UniqueID('col_');

$styles = "<style scoped>";
$styles .= "@media screen and (min-width: 0px) { #{$domID} {";
$styles .= isset($attributes['paddingMobilex1']) ? "padding-left:{$attributes['paddingMobilex1']}rem;" : "padding-left:1rem;";
$styles .= isset($attributes['paddingMobilex2']) ? "padding-right:{$attributes['paddingMobilex2']}rem;" : "padding-right:1rem;";
$styles .= isset($attributes['paddingMobiley1']) ? "padding-top:{$attributes['paddingMobiley1']}rem;" : "padding-top:1rem;";
$styles .= isset($attributes['paddingMobiley2']) ? "padding-bottom:{$attributes['paddingMobiley2']}rem;" : "padding-bottom:1rem;";
$styles .= "}}";
$styles .= "@media screen and (min-width: 768px) { #{$domID} {";
$styles .= isset($attributes['paddingx1']) ? "padding-left:{$attributes['paddingx1']}rem;" : "padding-left:1rem;";
$styles .= isset($attributes['paddingx2']) ? "padding-right:{$attributes['paddingx2']}rem;" : "padding-right:1rem;";
$styles .= isset($attributes['paddingy1']) ? "padding-top:{$attributes['paddingy1']}rem;" : "padding-top:1rem;";
$styles .= isset($attributes['paddingy2']) ? "padding-bottom:{$attributes['paddingy2']}rem;" : "padding-bottom:1rem;";
$styles .= "}}";
$styles .= "</style>";

$sizeDesktop = isset($attributes['size']) ? $attributes['size'] : '12';
$sizeMobile = isset($attributes['sizeMobile']) ? $attributes['sizeMobile'] : '12';
$orderMobile = isset($attributes['orderMobile']) ? "order-{$attributes['orderMobile']}" : '';

$output = "<div id='{$domID}' class='col-{$sizeMobile} col-lg-{$sizeDesktop} {$orderMobile} order-lg-1 {$attributes['classes']}'>";
$output .= $styles;
$output .= $content;
$output .= "</div>";

return $output;