<?php
/**
 * Copyright REZO ZERO 2014
 *
 * This work is licensed under a Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License.
 *
 * Ce(tte) œuvre est mise à disposition selon les termes
 * de la Licence Creative Commons Attribution - Pas d’Utilisation Commerciale - Pas de Modification 3.0 France.
 *
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-nd/3.0/
 * or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.
 *
 * Default template
 *
 * @file index.php
 * @copyright REZO ZERO 2013
 * @author Ambroise Maupate
 */

if (!defined("RZCMS_ENTRYPOINT")) {
	// If file directly requested, throw 403
	header('HTTP/1.0 403 Forbidden');
	echo("<h2>HTTP/1.0 403 Forbidden</h2>");
}
else {

	define('TEMPLATE_FOLDER', 			dirname(__FILE__));
	define('TEMPLATE_BASE_FOLDER', 		rz_core::getTemplateFolder());
	define('TEMPLATE_JS_FOLDER', 		TEMPLATE_BASE_FOLDER.'js/');
	define('TEMPLATE_CSS_FOLDER', 		TEMPLATE_BASE_FOLDER.'css/');
	define('TEMPLATE_IMAGES_FOLDER', 	TEMPLATE_BASE_FOLDER.'img/');


	/*
	 * Check if twig is correctly setup
	 */
	if(rz_twig_tools::init(TEMPLATE_FOLDER))
	{
		/*
		 * Prepare default assignations
		 */
		rz_template::$globalAssignation = rz_twig_tools::prepareBaseAssignation();
		rz_template::$globalAssignation['head']['checksum'] = rz_user::getChecksum();
		rz_template::$globalAssignation['head']['currentURL'] = rz_core::getCurrentURL();
		
		/*
		 * Grunt versioning
		 */
		rz_template::$globalAssignation['grunt'] = include(TEMPLATE_FOLDER.'/public/config/assets.config.php');
		/*
		 * Template specific assignations
		 */
		rz_template::$globalAssignation['mainNavigation'] = default_mainNavigation::getBlock();

		/*
		 * Specific templates for nodes
		 */
		$specificContentTemplates = array(
			'home',
			//'contact'
		);

		/*
		 * List here nodes name that have to return a 404 error
		 */
		$noOutputNodes = array(
			//'test'
		);

		if ($this->getRequestedNode() === null ||
			in_array($this->getRequestedNode()->node_name, $noOutputNodes)) {
			include(TEMPLATE_FOLDER.'/404/404.php');
		}
		else {

			$view = rz_template::getViewByController(TEMPLATE_FOLDER, $specificContentTemplates);
			if ($view !== false)
			{
				echo $view;
			}
			else {
				include(TEMPLATE_FOLDER.'/404/404.php');
			}
		}
	}
}
