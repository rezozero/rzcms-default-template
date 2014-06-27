/*
 * ============================================================================
 * [NAMESPACE] NAMESPACE
 * ============================================================================
 */
var NAMESPACE = {};

	NAMESPACE.$body = null;
	NAMESPACE.$window = null;
	NAMESPACE.windowWidth = 0;
	NAMESPACE.windowHeight = 0;

	NAMESPACE.page = null;

	// Pages
	NAMESPACE.page1 = null;

	
/*
 * ============================================================================
 * Methods
 * 
 */


/**
 * On Load
 * @return {[type]} [description]
 */
NAMESPACE.onLoad = function(){
	
};


/**
 * DOM Ready
 * @return {[type]} [description]
 */
NAMESPACE.onReady = function(){

	var _this = this;

	NAMESPACE.$body = $('body');
	NAMESPACE.$window = $(window);
	NAMESPACE.windowWidth = NAMESPACE.$window.width();
	NAMESPACE.page = NAMESPACE.$body[0].id;

	NAMESPACE.baseFolder = temp.baseFolder;
	NAMESPACE.checksum = temp.checksum;

	// Resize
	// NAMESPACE.$window.on('resize', $.proxy(NAMESPACE.resize, NAMESPACE));
	// NAMESPACE.$window.trigger('resize');
	
	// Init
	NAMESPACE.init();

};


/**
 * Init when pages are loaded
 * @return {[type]} [description]
 */
NAMESPACE.init = function(){
	var _this = this;
	
	// Selectors 

	
	// Methods to call
	// _this.method1();

};


/**
 * Window resize callback
 * @return {[type]} [description]
 */
NAMESPACE.resize = function(){
	var _this = this;

	// Define width/height
	_this.windowWidth = _this.$window.width();
	_this.windowHeight = _this.$window.height();

};