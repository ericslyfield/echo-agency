<?php
/**
 * Title: Featured Projects Grid
 * Slug: echo-agency/featured-projects-cards
 * Categories: all, featured
 * Keywords: projects, grid, portfolio
 * Block Types: core/query
 */
?>

<!-- wp:group {"className":"featured-projects","layout":{"type":"constrained"},"style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}}}} -->
<div class="wp-block-group featured-projects">
    <!-- wp:group {"className":"projects-filter","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"flex-end"}} -->
    <div class="wp-block-group projects-filter">
        <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"right"}} -->
        <div class="wp-block-buttons">
            <!-- wp:button {"className":"is-style-outline filter-btn"} -->
            <div class="wp-block-button is-style-outline filter-btn"><a class="wp-block-button__link">Fashion</a></div>
            <!-- /wp:button -->
            
            <!-- wp:button {"className":"is-style-outline filter-btn"} -->
            <div class="wp-block-button is-style-outline filter-btn"><a class="wp-block-button__link">Beauty</a></div>
            <!-- /wp:button -->
            
            <!-- wp:button {"className":"is-style-outline filter-btn"} -->
            <div class="wp-block-button is-style-outline filter-btn"><a class="wp-block-button__link">Music</a></div>
            <!-- /wp:button -->
            
            <!-- wp:button {"className":"is-style-outline filter-btn"} -->
            <div class="wp-block-button is-style-outline filter-btn"><a class="wp-block-button__link">Lifestyle</a></div>
            <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->

    <!-- wp:query {"queryId":1,"query":{"perPage":3,"pages":0,"offset":0,"postType":"project","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false},"displayLayout":{"type":"flex","columns":3}} -->
    <div class="wp-block-query">
        <!-- wp:post-template -->
        <!-- wp:group {"className":"project-card","layout":{"type":"constrained"}} -->
        <div class="wp-block-group project-card">
            <!-- wp:post-featured-image {"isLink":true,"width":"100%","height":"400px","style":{"border":{"radius":"0px"}}} /-->
            
            <!-- wp:post-title {"level":3,"isLink":true,"style":{"typography":{"textTransform":"uppercase"}}} /-->
            
            <!-- wp:post-excerpt {"moreText":"VIEW","style":{"spacing":{"margin":{"top":"1rem","bottom":"1rem"}}}} /-->
        </div>
        <!-- /wp:group -->
        <!-- /wp:post-template -->
    </div>
    <!-- /wp:query -->
    
    <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons">
        <!-- wp:button {"className":"view-all-btn"} -->
        <div class="wp-block-button view-all-btn"><a class="wp-block-button__link">VIEW ALL PRESS</a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->
</div>
<!-- /wp:group -->