<?php
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