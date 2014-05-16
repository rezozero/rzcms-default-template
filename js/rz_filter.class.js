/**
 * Copyright REZO ZERO 2013
 * 
 * This work is licensed under a Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License. 
 * 
 * Ce(tte) œuvre est mise à disposition selon les termes
 * de la Licence Creative Commons Attribution - Pas d’Utilisation Commerciale - Pas de Modification 3.0 France.
 *
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-nd/3.0/
 * or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.
 *
 * ========== REQUIRES ===========
 *
 * - modernizr
 * - jquery
 *
 * =========== Usage ============
 *
 *	new RZFilter({
 *		filtersBar: 		'.gallery_tag_filters',
 *		containerProjects: 	'.gallery_section_container',
 *		projects: 			'.excerpt',
 *		filterActiveClass: 	'current'
 *	});
 * 
 *
 * @file rz_filter.class.js
 * @copyright REZO ZERO 2013
 * @author Ambroise Maupate
 */
RZFilter = function (options) {
	var _this = this;

	// This is the easiest way to have default options.
    _this.settings = $.extend({
        // These are the defaults.
        filterActiveClass: 	"active",
        projectHiddenClass: "hidden",
        projectMaskedClass: "masked",
        resetClass: 		"all",
        filterTag: 			"a",
        dataName: 			"data-filter",
        filtersBar: 		'#filters',
        projects: 			'.project',
        containerProjects: 	'#container_projects'
    }, options );

	_this.filtersBar = 			$(_this.settings.filtersBar);
	_this.projects = 			$(_this.settings.containerProjects+' '+_this.settings.projects);
	_this.containerProjects = 	$(_this.settings.containerProjects);

	if (_this.filtersBar.length && 
		_this.projects.length > 0) {
		_this.bind();
	}
	else {
		//throw('[RZFilter] No project or filter to apply.');
		//console.log('[RZFilter] No project or filter to apply.');
	}
};
RZFilter.prototype.settings = null;
RZFilter.prototype.filterBar = null;
RZFilter.prototype.projects = null;
RZFilter.prototype.containerProjects = null;

RZFilter.prototype.bind = function() {
	var _this = this;

	_this.filtersBar.find(_this.settings.filterTag).off('click', $.proxy(_this.onClick, _this));
	_this.filtersBar.find(_this.settings.filterTag).on('click', $.proxy(_this.onClick, _this));
};

RZFilter.prototype.onClick = function(event) {
	var _this = this;
	var filterSelected = $(event.currentTarget);
	var filterClass = filterSelected.attr(_this.settings.dataName);
	var selector  = '.'+filterSelected.attr(_this.settings.dataName);

	console.log("[RZFilter] Filter by => "+filterClass);

	if( filterSelected.hasClass(_this.settings.resetClass) || 
		filterClass == "all") {
		console.log("[RZFilter] Reset filters");
		selector = _this.settings.projects;
	}
	
	if(Modernizr.csstransitions) {
		_this.filtersBar.find(_this.settings.filterTag).removeClass(_this.settings.filterActiveClass);
		filterSelected.addClass(_this.settings.filterActiveClass);
	} else {
		_this.filtersBar.find(_this.settings.filterTag+'.'+_this.settings.filterActiveClass).animate({
			'border-width': '1px',
			'border-bottom-color': '#bcbcbc'},
			200, function() {
				_this.filtersBar.find(_this.settings.filterTag).removeClass(_this.settings.filterActiveClass);
				filterSelected.addClass(_this.settings.filterActiveClass);
		});
	}

	filterSelected.addClass(_this.settings.filterActiveClass);

	if(Modernizr.csstransitions) {
		_this.projects.addClass(_this.settings.projectMaskedClass);
	} else {
		_this.projects.fadeOut(250);
	}

	setTimeout(function() {
		_this.gridFiltered(selector);
	}, 250);

	event.preventDefault();
	return false;
};

RZFilter.prototype.gridFiltered = function(selector) 
{
	var _this = this;
	_this.projects.addClass(_this.settings.projectHiddenClass);
	$(selector).removeClass(_this.settings.projectHiddenClass);
	setTimeout(function() { 
		_this.reDisplay(selector);
	}, 50);
};

RZFilter.prototype.reDisplay = function(selector) {
	var _this = this;

	var i = 1;
	var delay;
	var goodProjects = $(selector);
	
	goodProjects.each(function(index) {
		var goodProject = $(this);
		delay = i*100;
		setTimeout(function(){
			if(Modernizr.csstransitions) {
				goodProject.removeClass(_this.settings.projectMaskedClass);
			} else {
				goodProject.fadeIn(250);
			}
		},delay);
		i++;
	});
};