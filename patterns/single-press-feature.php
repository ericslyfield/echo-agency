<?php
/**
 * Title: Single Press Feature
 * Slug: echo-agency/single-press-feature
 * Categories: query, my-patterns, posts
 * Keywords: post meta
 * Block Types: core/template-part/post-meta
 * Description: Press page.
 */
?>

register_block_pattern(
    'echo-agency/press-feature',
    array(
        'title'       => __( 'Press Feature with Circular Gallery', 'echo-agency' ),
        'categories'  => array( 'featured' ),
        'description' => _x( 'A featured press section with circular layout and thumbnail gallery', 'Block pattern description', 'echo-agency' ),
        'content'     => '<!-- wp:group {"className":"press-feature-container","layout":{"type":"constrained"}} -->
<div class="wp-block-group press-feature-container">
    <!-- wp:columns {"className":"press-feature-layout"} -->
    <div class="wp-block-columns press-feature-layout">
        <!-- wp:column {"width":"60%"} -->
        <div class="wp-block-column" style="flex-basis:60%">
            <!-- wp:image {"className":"feature-main-image","sizeSlug":"large"} -->
            <figure class="wp-block-image feature-main-image"><img src="' . esc_url( get_theme_file_uri( 'assets/images/placeholder.jpg' ) ) . '" alt=""/></figure>
            <!-- /wp:image -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column {"width":"40%","className":"press-content"} -->
        <div class="wp-block-column press-content" style="flex-basis:40%">
            <!-- wp:heading {"level":1,"className":"press-title"} -->
            <h1 class="press-title">VOGUE MIDDLE EAST</h1>
            <!-- /wp:heading -->

            <!-- wp:group {"className":"press-quote-container"} -->
            <div class="wp-block-group press-quote-container">
                <!-- wp:paragraph {"className":"press-quote"} -->
                <p class="press-quote">"Rami Al Ali Convenes Local Creatives to Spread Hope Through Couture"</p>
                <!-- /wp:paragraph -->
                
                <!-- wp:image {"className":"source-logo","width":100} -->
                <figure class="wp-block-image source-logo"><img src="' . esc_url( get_theme_file_uri( 'assets/images/source-logo.png' ) ) . '" alt="Source Logo" width="100"/></figure>
                <!-- /wp:image -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->

    <!-- wp:group {"className":"press-gallery"} -->
    <div class="wp-block-group press-gallery">
        <!-- wp:heading {"level":3,"className":"gallery-title"} -->
        <h3 class="gallery-title">View other press</h3>
        <!-- /wp:heading -->

        <!-- wp:gallery {"columns":3,"className":"press-thumbnails"} -->
        <figure class="wp-block-gallery has-3-columns press-thumbnails">
            <ul class="blocks-gallery-grid">
                <li class="blocks-gallery-item">
                    <figure>
                        <img src="' . esc_url( get_theme_file_uri( 'assets/images/press1.jpg' ) ) . '" alt="Mojeh"/>
                        <figcaption class="blocks-gallery-item__caption">MOJEH</figcaption>
                    </figure>
                </li>
                <li class="blocks-gallery-item">
                    <figure>
                        <img src="' . esc_url( get_theme_file_uri( 'assets/images/press2.jpg' ) ) . '" alt="The Sandy Times"/>
                        <figcaption class="blocks-gallery-item__caption">THE SANDY TIMES</figcaption>
                    </figure>
                </li>
                <li class="blocks-gallery-item">
                    <figure>
                        <img src="' . esc_url( get_theme_file_uri( 'assets/images/press3.jpg' ) ) . '" alt="Sheerluxe"/>
                        <figcaption class="blocks-gallery-item__caption">SHEERLUXE</figcaption>
                    </figure>
                </li>
            </ul>
        </figure>
        <!-- /wp:gallery -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->'
    )
);