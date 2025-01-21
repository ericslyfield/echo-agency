<?php


add_filter(
	'excerpt_more',
	function( $more ) {
		return ' . . . ';
	},
	20
);