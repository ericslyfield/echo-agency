<?php
get_header();

if ( have_posts() ) :
    echo '<div class="archive-content">';

    // Check if we're viewing an archive for a custom post type
    if ( is_post_type_archive( 'talent' ) ) :
        echo '<h1>Talent Archive</h1>';
    elseif ( is_post_type_archive( 'press' ) ) :
        echo '<h1>Press Archive</h1>';
    else :
        echo '<h1>Archive</h1>';
    endif;

    // Loop through and display posts
    while ( have_posts() ) : the_post();
        ?>
        <div class="archive-post">
            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <div class="post-excerpt">
                <?php the_excerpt(); ?>
            </div>
        </div>
    <?php endwhile;

    // Pagination (if applicable)
    the_posts_pagination();

    echo '</div>';
else :
    echo '<p>No posts found.</p>';
endif;

get_footer();
