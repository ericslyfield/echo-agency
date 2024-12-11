<?php
function echo_agency_wrap_nav_text($title, $item) {
    // Wrap the original text in a span
    return '<span>' . esc_html($title) . '</span>';
}
add_filter('nav_menu_item_title', 'echo_agency_wrap_nav_text', 10, 2);

function echo_agency_add_data_attribute($atts, $item, $args) {
    // Add the data-replace attribute with the same text
    $atts['data-replace'] = esc_attr($item->title);
    // Add a class for styling
    $atts['class'] = isset($atts['class']) ? $atts['class'] . ' text-swap' : 'text-swap';
    return $atts;
}
add_filter('nav_menu_link_attributes', 'echo_agency_add_data_attribute', 10, 3);