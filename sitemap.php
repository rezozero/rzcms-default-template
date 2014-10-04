<?php
/**
 * Copyright REZO ZERO 2014
 *
 *
 *
 *
 * @file sitemap.php
 * @copyright REZO ZERO 2014
 * @author Ambroise Maupate
 */

define('TEMPLATE_FOLDER', dirname(__FILE__));
include(TEMPLATE_FOLDER.'/lib/template_autoload.class.php');

$get_columns = array(
	'node_id',
	'node_name',
	'node_type_id',
	'parent_node_id',
	'url_token',
	'lastmod_date'
);

/**
 * Choose your node-types
 */
$typesIDs = rz_node_type::get_rows(array(
	'get_columns'=>array('node_type_id'),
	'name'=> array(
		'page_type',
		/*
		 *
		 * Add your own node-types here
		 *
		 */
	)
))->fetchAll(PDO::FETCH_COLUMN, 0);


header("Content-type: text/xml");
print("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");

$nodedisplayed = array();

?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc><?php echo rz_core::getBaseFolder() ?></loc>
		<priority>1</priority>
	</url>
	<?php

	$langs = rz_translation::get_rows(array(
		'visible'=>1
	));

	/* Translations */
	while ($lang = rz_translation::hydrate($langs)) {
		$nodedisplayed = array();

		if ($lang->translation_id > 1) {
			?><url>
				<loc><?php echo rz_core::getBaseFolder().rz_core::getShortcutFromLocale($lang->locale).'/' ?></loc>
				<priority>1</priority>
			</url><?php
		}

		$nodes = rz_node::get_rows(array(
			'get_columns'=>   $get_columns,
			'visible'=>       1,
			'published'=>     1,
			'node_type_id'=>  $typesIDs,
			"order_by"=>      "parent_node_id",
			"node_name"=>     array("!=",HOME_NODE),
			'translation_id'=>$lang->translation_id
		));

		while ($cnode = rz_node::nudeHydrate($nodes)) {

			$typeName = $cnode->getTypeName();
			$classname = template_autoload::$templatePrefix."_".$typeName;

			/**
			 * Test if current node have a template class and a getView method
			 */
			if(!in_array($cnode->node_name, $nodedisplayed) &&
				class_exists($classname) &&
				method_exists($classname, 'getView')) {

				$nodedisplayed[] = $cnode->node_name;

				?><url>
					<loc><?php echo $cnode->getNodeURL() ?></loc>
					<lastmod><?php echo date("Y-m-d", strtotime($cnode->lastmod_date)) ?></lastmod>
					<priority>0.8</priority>
				</url><?php
			}
		}
	}

?></urlset>
