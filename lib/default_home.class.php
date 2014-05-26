<?php 
/**
 * Home assignation controller
 * 
 * Default template
 */
class default_home extends rz_node_helper
{
	/**
	 * getView method is automatically called from template controller to display specific nodes or node-types
	 * 
	 * @return string HTML output
	 */
	public function getView()
	{
		rz_template::$globalAssignation['home'] = array(
			'node'=>$this->getNode(),
		);

		/*
		 * Return the twig generated HTML
		 */
		return rz_twig_tools::render( 'home.html.twig', rz_template::$globalAssignation );
	}
}