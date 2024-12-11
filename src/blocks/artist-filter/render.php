<?php

function render_callback($attributes) {
    $selected = $attributes['selectedDiscipline'] ?? '';
    $disciplines = get_terms(['taxonomy' => 'discipline', 'hide_empty' => true]);
    
    ob_start(); ?>
    <div class="wp-block-echo-agency-artist-filter">
        <select id="discipline-filter" onchange="filterArtists(this.value)">
            <option value=""><?php _e('All Disciplines', 'echo-agency'); ?></option>
            <?php foreach ($disciplines as $discipline): ?>
                <option value="<?php echo esc_attr($discipline->term_id); ?>"
                    <?php selected($selected, $discipline->term_id); ?>>
                    <?php echo esc_html($discipline->name); ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>
    <script>
    function filterArtists(disciplineId) {
        const url = new URL(window.location);
        if (disciplineId) {
            url.searchParams.set('discipline', disciplineId);
        } else {
            url.searchParams.delete('discipline');
        }
        window.location = url;
    }
    </script>
    <?php
    return ob_get_clean();
}

// Register the render callback
register_block_render_callback('echo-agency/artist-filter', 'render_callback');