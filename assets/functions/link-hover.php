<?php
function enqueue_rolling_text_script() {
    wp_enqueue_script(
        'rolling-text', 
        get_template_directory_uri() . 'assets/js/rolling-text.js', 
        array(), 
        '1.0', 
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_rolling_text_script');