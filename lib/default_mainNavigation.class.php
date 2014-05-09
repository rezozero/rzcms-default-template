<?php 
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
 * 		
 *
 * @file default_mainNavigation.class.php
 * @copyright REZO ZERO 2013
 * @author Ambroise Maupate
 */
class default_mainNavigation 
{
	static $assignation = array();

	public static function getBlock()
	{
		static::$assignation['entries']=array();

		if (rz_kernel::getInstance()->getRequestedNode() !== null) {
			static::$assignation['active'] = rz_kernel::getInstance()->getRequestedNode()->node_name;
		}

		/*
		 * Populating mainNavigation entries --- this can be cached
		 */
		$nodes = rz_kernel::getInstance()->getHomeNode()->get_children(array(
			'get_columns'=>array('node_id', 'node_name', 'node_type_id', 'parent_node_id', 'url_token'),
			'visible'=>1,
			'order_by'=>'order'
		));


		while ($node = rz_node::nudeHydrate($nodes)) {
			static::$assignation['entries'][] = array(
				'node'=>  $node,
				'title'=> $node->getHandler()->getDisplayTitle()
			);	
		}

		return static::$assignation;
	}
}