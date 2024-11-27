<?php
class Options {
   public function __construct() {
    
       // Modern Supports Pack
       add_theme_support( 'wp-block-styles' );  // Allows alternative styles to be applied to existing blocks
        add_theme_support( 'post-thumbnails' ); 
        add_theme_support( 'responsive-embeds' );
        add_theme_support( 'html5', array('style','script', 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption') );

        // Specifically enable lightbox support
        add_theme_support( 'block-gallery-lightbox' );

       // RSS Feed Supoprt
       add_theme_support( 'automatic-feed-links' );

       // Post Format Support
       add_theme_support( 'post-formats', [ 
           'standard',
           'image',
           'video',
           'audio', 
           'status',
           'aside',
           'quote',
           'gallery',
           'link',
            ] );

       // Post Thumbnail Support
       add_theme_support( 'post-thumbnails' );
       add_image_size( 'small', 350, 350, false );
       add_image_size( 'medium', 825, 825, false );
       add_image_size( 'large', 1250, 1250, false ); 

       // Title Support
       add_theme_support( 'title-tag' );

       // Responive Video Embed Options
       add_theme_support( 'responsive-embeds' );

   }
}