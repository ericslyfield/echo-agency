<?php
/**
 * Register Artist View More Block
 *
 * @package echo-agency
 */

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

function echo_agency_render_view_more_block($attributes) {
    $artist_id = $attributes['artistId'];
    $class_name = $attributes['className'];
    
    if (!$artist_id) {
        return '';
    }
    
    $permalink = get_permalink($artist_id);
    
    return sprintf(
        '<div class="wp-block-echo-agency-artist-view-more %s">
            <a href="%s" class="view-more-link">View More</a>
        </div>',
        esc_attr($class_name),
        esc_url($permalink)
    );
}