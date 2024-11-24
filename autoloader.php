<?php
/**
 * Automatically loads files from a folder.
 * This file keeps your functions.php file clean!
 * 
 * Instead of writing into functions.php, use the classes folder 
 * and let each new file represent/manage it's own function.
 * 
 * $class = Name of the class being requested
 * 
 * @param  string 
 * @since  1.0.0
 */

spl_autoload_register( function($class) {
    // Convert namespace to file path
    $file = __DIR__ . '/assets/functions/' . str_replace('\\', '/', $class) . '.php' ;

    if( file_exists( $file ) ){
        require $file;
    }

});