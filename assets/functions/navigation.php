<?php
/**
 * Enqueue scripts and styles for navigation enhancement
 */
function echo_agency_enqueue_navigation_scripts() {
    wp_enqueue_style(
        'echo-agency-navigation',
        get_template_directory_uri() . '/assets/css/navigation.css',
        array(),
        '1.0.0'
    );

    wp_enqueue_script(
        'echo-agency-navigation',
        get_template_directory_uri() . '/assets/js/navigation.js',
        array(),
        '1.0.0',
        true
    );
}
add_action( 'wp_enqueue_scripts', 'echo_agency_enqueue_navigation_scripts' );

/**
 * Add custom class to navigation block
 */
function echo_agency_navigation_block_styles() {
    register_block_style(
        'core/navigation',
        array(
            'name'         => 'slide-overlay',
            'label'        => __( 'Slide Overlay', 'echo-agency' ),
            'is_default'   => true,
        )
    );
}
add_action( 'init', 'echo_agency_navigation_block_styles' );