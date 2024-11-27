<?php
class Text_Distortion_Animation {

        /**
         * @var string The block style name
         */
        private $style_name = 'rgb-split-animation';
    
        /**
         * @var string The text domain
         */
        private $text_domain;
    
        /**
         * @var array Script dependencies
         */
        private $script_dependencies = array();
    
        /**
         * @var string Current plugin/theme version
         */
        protected $version = '1.0.0';
    
        /**
         * Initialize the class
         *
         * @param string $text_domain The theme text domain
         */
        public function __construct($text_domain = 'your-theme-text-domain') {
            $this->text_domain = $text_domain;
            $this->init();
        }
    
        /**
         * Initialize hooks and filters
         */
        private function init() {
            add_action('init', array($this, 'register_block_style'));
            add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
        }
    
        /**
         * Register the block style
         */
        public function register_block_style() {
            register_block_style(
                'core/heading',
                array(
                    'name'         => $this->style_name,
                    'label'        => __('RGB Split Animation', $this->text_domain),
                    'inline_style' => $this->get_inline_style(),
                )
            );
        }
    
        /**
         * Get inline style for initial block state
         *
         * @return string
         */
        protected function get_inline_style() {
            return ".is-style-{$this->style_name} { opacity: 0; }";
        }
    
        /**
         * Enqueue necessary assets
         */
        public function enqueue_assets() {
            $this->enqueue_vendor_scripts();
            $this->enqueue_custom_scripts();
            $this->enqueue_styles();
        }
    
        /**
         * Enqueue vendor scripts
         */
        private function enqueue_vendor_scripts() {
            wp_enqueue_script(
                'curtains-js',
                'https://cdn.jsdelivr.net/npm/curtainsjs@8.1.4/dist/curtains.umd.min.js',
                array(),
                '8.1.4',
                true
            );
            $this->script_dependencies[] = 'curtains-js';
        }
    
        /**
         * Enqueue custom scripts
         */
        private function enqueue_custom_scripts() {
            wp_enqueue_script(
                $this->style_name,
                $this->get_asset_url('js/rgb-split-animation.js'),
                $this->script_dependencies,
                $this->version,
                true
            );
        }
    
        /**
         * Enqueue styles
         */
        private function enqueue_styles() {
            wp_enqueue_style(
                $this->style_name,
                $this->get_asset_url('css/rgb-split-animation.css'),
                array(),
                $this->version
            );
        }
    
        /**
         * Get asset URL based on installation type
         *
         * @param string $path Relative path to asset
         * @return string
         */
        protected function get_asset_url($path) {
            if (is_child_theme()) {
                $file_path = get_stylesheet_directory() . '/' . $path;
                $url = get_stylesheet_directory_uri() . '/' . $path;
            } else {
                $file_path = get_template_directory() . '/' . $path;
                $url = get_template_directory_uri() . '/' . $path;
            }
    
            return file_exists($file_path) ? $url : false;
        }
}