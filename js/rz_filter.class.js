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
 * - modernizr (with -mod- prefix by default)
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
	var o = this;

	// This is the easiest way to have default options.
    o.settings = $.extend({
        // These are the defaults.
        filterActiveClass: 	"active",
        projectHiddenClass: "hidden",
        projectMaskedClass: "masked",
        resetClass: 		"all",
        dataName: 			"data-filter",
        filtersBar: 		'#filters',
        projects: 			'.project',
        containerProjects: 	'#container_projects',
        modernizerPrefix: 	'-mod-'
    }, options );

	o.filtersBar = 			$(o.settings.filtersBar);
	o.projects = 			$(o.settings.containerProjects+' '+o.settings.projects);
	o.containerProjects = 	$(o.settings.containerProjects);

	if (o.filtersBar.length && o.projects.length > 0) {
		o.bind();
	}
	else {
		throw('[RZFilter] No project or filter to apply.');
	}
};
RZFilter.prototype.settings = null;
RZFilter.prototype.filterBar = null;
RZFilter.prototype.projects = null;
RZFilter.prototype.containerProjects = null;

RZFilter.prototype.bind = function() {
	var o = this;

	o.filtersBar.find('a').unbind('click');
	o.filtersBar.find('a').bind('click', function(event) 
	{
		var filterSelected = $(this);
		var selector  = '.'+filterSelected.attr(o.settings.dataName);

		if(filterSelected.hasClass(o.settings.resetClass)) {
			selector = o.settings.projects;
		}
		
		if($('html').hasClass(o.settings.modernizerPrefix+'csstransitions')) {
			o.filtersBar.find('a').removeClass(o.settings.filterActiveClass);
			filterSelected.addClass(o.settings.filterActiveClass);
		} else {
			o.filtersBar.find('a.'+o.settings.filterActiveClass).animate({
				'border-width': '1px',
				'border-bottom-color': '#bcbcbc'},
				200, function() {
					o.filtersBar.find('a').removeClass(o.settings.filterActiveClass);
					filterSelected.addClass(o.settings.filterActiveClass);
			});
		}

		filterSelected.addClass(o.settings.filterActiveClass);

			if($('html').hasClass(o.settings.modernizerPrefix+'csstransitions')) {
				o.projects.addClass(o.settings.projectMaskedClass);
			} else {
				o.projects.fadeOut(250);
			}

		setTimeout(function() {
			o.gridFiltered(selector);
		}, 250);

		event.preventDefault();
		return false;
	});
};

RZFilter.prototype.gridFiltered = function(selector) 
{
	var o = this;
	o.projects.addClass(o.settings.projectHiddenClass);
	$(selector).removeClass(o.settings.projectHiddenClass);
	setTimeout(function() { 
		o.reDisplay(selector);
	}, 50);
};

RZFilter.prototype.reDisplay = function(selector) {
	var o = this;

	var i = 1;
	var delay;
	var goodProjects = $(selector);
	
	goodProjects.each(function(index) {
		var goodProject = $(this);
		delay = i*100;
		setTimeout(function(){
			if($('html').hasClass(o.settings.modernizerPrefix+'csstransitions')) {
				goodProject.removeClass(o.settings.projectMaskedClass);
			} else {
				goodProject.fadeIn(250);
			}
		},delay);
		i++;
	});
};