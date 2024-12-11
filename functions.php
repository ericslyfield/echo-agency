<?php
/**
* Theme Functions
*
* @package Echo
*/

// Run Autoloader
require_once 'autoloader.php';

// Load
new Styling;
new Options;


// Register Block Template Support for Classic Themes Fallback
// function theme_setup() {
     // add_theme_support('block-template-parts');
     // add_theme_support('wp-block-styles');
// }
// add_action('after_setup_theme', 'theme_setup');


function echo_get_talent_counts($talent_name) {
    $projects_query = new WP_Query([
        'post_type' => 'projects',
        'tax_query' => [
            [
                'taxonomy' => 'talent-tag',
                'field'    => 'name',
                'terms'    => $talent_name
            ]
        ],
        'posts_per_page' => -1,
    ]);

    $press_query = new WP_Query([
        'post_type' => 'press',
        'tax_query' => [
            [
                'taxonomy' => 'talent-tag',
                'field'    => 'name',
                'terms'    => $talent_name
            ]
        ],
        'posts_per_page' => -1,
    ]);

    return [
        'projects' => $projects_query->found_posts,
        'press' => $press_query->found_posts
    ];
}


function echo_agency_register_blocks() {
     register_block_type( __DIR__ . '/build/blocks/semi-circle' );
 }
 add_action( 'init', 'echo_agency_register_blocks' );

 register_block_type(
    'echo-agency/artist-view-more',
    array(
        'api_version' => 3,
        'editor_script' => 'echo-agency-editor-script',
        'render_callback' => 'echo_agency_render_view_more_block',
        'attributes' => array(
            'artistId' => array(
                'type' => 'number',
                'default' => 0
            ),
            'className' => array(
                'type' => 'string',
                'default' => ''
            )
        )
    )
);

?>

