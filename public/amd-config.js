var require = {
		baseUrl : '.',
		paths : {
			backbone : 'bower_components/backbone/backbone',
			jquery : 'bower_components/jquery/dist/jquery.min',
			underscore : 'bower_components/underscore/underscore-min',
			handlebars : 'bower_components/handlebars/handlebars.amd.min',
			handlebarshelpers :'libraries/handlebars/handlebars',
			css : 'bower_components/require-css/css',
			normalize : 'libraries/require/normalize',
			async : 'libraries/require/async',
			text : 'bower_components/text/text',
			swipe : 'bower_components/jquery-touchswipe/jquery.touchswipe.min',
			eventImpl : 'modules/core/eventImpl',
			material : 'vendor/material/js/base.min',
			sortable : 'bower_components/jquery-ui-sortable/jquery-ui-sortable.min',
			Waves : 'vendor/waves/waves'
		},
		shim : {
			'backbone' : {
				deps : [ 'underscore', 'jquery' ],
				exports : 'Backbone'
			},
			'animate' : {
				deps : [ 'jquery' ],
			},
			'autocomplete' : {
				deps : [ 'jquery', 'uicore' , 'uiwidget', 'uimenu', 'uiposition'],
			},
			'uimenu' : {
				deps : [ 'uiwidget'],
			},
			'foundation' : {
				deps : [ 'jquery' ]
			},
			'swipe' : {
				deps : [ 'jquery' ]
			},
			'sortable' : {
				deps : [ 'jquery' ]
			},
			material : {
				deps : [ 'jquery', 'sortable', 'Waves' ],
				exports : '$'
			}
		},
		waitSeconds : 60,
		/* urlArgs: "v=0.25",  */
		deps : ['app-bootstrap', ]
};


