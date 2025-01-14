<?php
/**
 * Plugin Name: Styles and Settings
 * Description: Loads theme-critical support for Javascript and CSS files.
 * Comment out a path to "turn it off".
 * Add new paths as options here. 
 */


if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

class Styling {

    // Protected properties to hold the registered styles and scripts
    protected $styles = [];
    protected $scripts = [];

    public function __construct() { 
        // Hook to enqueue assets
        add_action('wp_enqueue_scripts', [$this, 'enqueue_assets']);
    }

    // Public method to enqueue styles and scripts
    public function enqueue_assets() {
        // jQuery
        wp_enqueue_script('jquery');

        // Register styles and scripts
        $this->register_styles();
        $this->register_scripts();

        // Enqueue styles and scripts
        $this->enqueue_registered_styles();
        $this->enqueue_registered_scripts();
    }

    // Protected method to register styles
    protected function register_styles() {
        $this->register_style('stylesheet', '/assets/css/style.css');
    }

    // Protected method to register scripts
    protected function register_scripts() {
        //Registers default/core scripts (Do not delete this!)
        $this->register_script('scripts', '/assets/js/scripts.js');
        //Registers Ripple Click Animation
        $this->register_script('ripple-click', '/assets/js/ripple-click.js');
        //Registers Ripple Hover Animation
        $this->register_script('ripple-hover', '/assets/js/ripple-hover.js');
        // GSAP
        $this->register_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');      
        // Curtains
        // $this->register_script( 'curtains-js', 'https://cdnjs.cloudflare.com/ajax/libs/curtainsjs/6.2.0/curtains.min.js');
    }

    // Private method to register a style
    private function register_style($handle, $path) {
        $this->styles[$handle] = get_template_directory_uri() . $path;
        wp_register_style($handle, $this->styles[$handle], [], null, 'all');
    }

// Private method to register a script
private function register_script($handle, $path) {
    // Check if $path is a full URL (CDN link)
    if (filter_var($path, FILTER_VALIDATE_URL)) {
        // If it's a valid URL, use the CDN link
        $this->scripts[$handle] = $path;
        // Register the script with an empty version for CDN links
        wp_register_script($handle, $this->scripts[$handle], [], null, true);
    } else {
        // If it's not a valid URL, assume it's a relative path in the theme directory
        $this->scripts[$handle] = get_template_directory_uri() . $path;
        // Register the script with file modification time for cache busting
        wp_register_script($handle, $this->scripts[$handle], [], filemtime(get_template_directory() . $path), true);
    }
}

    // Private method to enqueue registered styles
    private function enqueue_registered_styles() {
        wp_enqueue_style('stylesheet');
    }

    // Private method to enqueue registered scripts
    private function enqueue_registered_scripts() {
        wp_enqueue_script('scripts');
        wp_enqueue_script('link-hover');
        wp_enqueue_script('ripple-click');
    }
}
