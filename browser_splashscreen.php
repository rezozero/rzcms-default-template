<?php 

define('TEMPLATE_BASE_FOLDER', 		rz_core::getTemplateFolder());
define('TEMPLATE_JS_FOLDER', 		TEMPLATE_BASE_FOLDER.'js/');
define('TEMPLATE_CSS_FOLDER', 		TEMPLATE_BASE_FOLDER.'css/');
define('TEMPLATE_IMAGES_FOLDER', 	TEMPLATE_BASE_FOLDER.'img/');
define('TEMPLATE_FOLDER', 			dirname(__FILE__));

rz_core::baseHTML(rz_setting::get("site_title")); ?>
	<meta name="description" content="<?php echo(rz_setting::get("meta_description")); ?>" />
	<meta name="keywords" content="<?php echo(rz_setting::get("meta_keywords")); ?>" />
	<link rel="shortcut icon" href="<?php echo TEMPLATE_IMAGES_FOLDER; ?>favicon.png" />
	<link rel="apple-touch-icon-precomposed" href="<?php echo TEMPLATE_IMAGES_FOLDER; ?>apple-icon.png"/>
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-capable" content="no" />
	<link rel="stylesheet" href="<?php echo TEMPLATE_CSS_FOLDER; ?>style.css" type="text/css" />
	<link rel="stylesheet" type="text/css" href="<?php echo TEMPLATE_CSS_FOLDER; ?>style_notcompatible.css">
	<?php					
	rz_core::importCSSLibs();
	?>
</head>
<body id="browser_splashscreen">
	<div id="browser_splashscreen_container"><?php 

		rz_document::getAdminImage()->getView()->displayDocumentByArray(array("width"=>50, 'titled'=>0)); 

		?><h1><?php echo(rz_setting::get("site_title")._(" use latest web technologies.")); ?></h1>
		<p><?php echo(_("To access this website we encourage you to update your browser or to download one of these awesome recent browsers.")); ?></p>
		<ul id="browsers">
			<li class="chrome">
				<a target="_blank" href="https://www.google.com/chrome/"><img src="<?php echo rz_core::getAdminImagesFolder()."chrome.png" ?>" title="<?php echo(_("Download Google Chrome")); ?>" /><?php echo(_("Download Google Chrome")); ?></a>
			</li>
			<li class="firefox">
				<a target="_blank" href="http://www.mozilla.org/firefox"><img src="<?php echo rz_core::getAdminImagesFolder()."firefox.png" ?>" title="<?php echo(_("Download Mozilla Firefox")); ?>" /><?php echo(_("Download Mozilla Firefox")); ?></a>
			</li>
			<li class="opera">
				<a target="_blank" href="http://www.opera.com"><img src="<?php echo rz_core::getAdminImagesFolder()."opera.png" ?>" title="<?php echo(_("Download Opera")); ?>" /><?php echo(_("Download Opera")); ?></a>
			</li>
			<li class="ie">
				<a target="_blank" href="http://windows.microsoft.com/fr-FR/internet-explorer/download-ie"><img src="<?php echo rz_core::getAdminImagesFolder()."ie.png" ?>" title="<?php echo(_("Upgrade Internet Explorer")); ?>" /><?php echo(_("Download Internet Explorer")); ?></a>
			</li>
			<li class="clearfloat"></li>
		</ul>
	</div><?php 
	rzwidget_analytics::insertTrackingScript(); 
?></body>
</html>