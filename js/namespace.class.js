/*
 * ============================================================================
 * [namespace] Namespace
 * ============================================================================
 */
var namespace = {};

	namespace.$body = null;
	namespace.$window = null;
	namespace.windowWidth = 0;
	namespace.windowHeight = 0;

	namespace.page = null;

	// Pages
	namespace.page1 = null;

	
/*
 * ============================================================================
 * Methods
 * 
 */


/**
 * On Load
 * @return {[type]} [description]
 */
namespace.onLoad = function () 
{
	
};


/**
 * DOM Ready
 * @return {[type]} [description]
 */
namespace.onReady = function () {

	var _this = this;

	namespace.$body = $('body');
	namespace.$window = $(window);
	namespace.windowWidth = namespace.$window.width();
	namespace.page = namespace.$body[0].id;

	namespace.baseFolder = temp.baseFolder;
	namespace.checksum = temp.checksum;

	// Resize
	// namespace.$window.on('resize', $.proxy(namespace.resize, namespace));
	// namespace.$window.trigger('resize');
	
	// Init
	namespace.init();

};


/**
 * Init when pages are loaded
 * @return {[type]} [description]
 */
namespace.init = function(){
	var _this = this;
	
	// Selectors 

	
	// Methods to call
	// _this.method1();

};


/**
 * Window resize callback
 * @return {[type]} [description]
 */
namespace.resize = function(){
	var _this = this;

	// Define width/height
	_this.windowWidth = _this.$window.width();
	_this.windowHeight = _this.$window.height();

};