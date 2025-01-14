<?php
/**
* Theme Functions
*
* @package echo-agency
*/

// Run Autoloader with error handling
$autoloader_path = __DIR__ . '/autoloader.php';
if (file_exists($autoloader_path)) {
    require_once $autoloader_path;
    
    // Only try to instantiate classes if they exist
    if (class_exists('styling')) {
        new styling();
    }
    if (class_exists('options')) {
        new options();
    }
} else {
    // Log error or handle gracefully
    error_log('Echo Agency Theme: Autoloader file not found');
}


// Register Block Template Support for Classic Themes Fallback
// function theme_setup() {
     // add_theme_support('block-template-parts');
     // add_theme_support('wp-block-styles');
// }
// add_action('after_setup_theme', 'theme_setup');
