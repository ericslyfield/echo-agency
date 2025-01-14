<?php

function register_circular_group_style() {
    register_block_style(
        'core/group',
        array(
            'name'  => 'circular',
            'label' => __( 'Circular', 'echo-agency' ),
        )
    );
    
    // Enqueue the custom CSS
    wp_enqueue_style(
        'circular-group-style',
        get_template_directory_uri() . '/assets/scss/circular-styles.scss'
    );
}
add_action( 'init', 'register_circular_group_style' );

function enqueue_circular_columns_style() {
    wp_enqueue_style(
        'circular-columns-style',
        get_template_directory_uri() . '/assets/css/circular-styles.css'
    );
}
add_action( 'wp_enqueue_scripts', 'enqueue_circular_columns_style' );