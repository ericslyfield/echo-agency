<?php

function register_webgl_text_animation_block() {
    register_block_type( get_template_directory() . '/blocks/webgl-text-animation' );
}
add_action( 'init', 'register_webgl_text_animation_block' );