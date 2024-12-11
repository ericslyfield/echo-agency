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

?>

