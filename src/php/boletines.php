<?php
include "includes/dbinc.php";

// Check if a search keyword is provided
$search_keyword = isset($_GET['keywords']) ? trim($_GET['keywords']) : '';
// Base query with search condition
$consulta_datos_boletines = "SELECT b.id_boletin, b.ruta_archivo, b.fecha_publicacion, b.titulo, b.descripcion, b.estado, u.nombre AS subido_por 
    FROM boletin b
    JOIN usuario u ON b.subido_por = u.id_usuario
    WHERE b.estado = 'activo'";
// Add search conditions if keyword is provided
if (!empty($search_keyword)) {
    $consulta_datos_boletines .= " AND (
        b.titulo LIKE :keyword OR 
        b.descripcion LIKE :keyword
    )";
}
// Add ordering
$consulta_datos_boletines .= " ORDER BY b.fecha_publicacion DESC";
// Prepare and execute the statement
$datos_boletines = $conn->prepare($consulta_datos_boletines);
// Bind parameters if keyword is not empty
if (!empty($search_keyword)) {
    $search_param = "%{$search_keyword}%";
    $datos_boletines->bindParam(':keyword', $search_param, PDO::PARAM_STR);
}
$datos_boletines->execute();
$boletines = $datos_boletines->fetchAll(PDO::FETCH_ASSOC);
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01+RDFa 1.1//EN" "http://www.w3.org/MarkUp/DTD/html401-rdfa11-1.dtd">
<!-- saved from url=(0052)https://opia.fia.cl/601/w3-propertyvalue-148969.html -->
<html lang="es">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!--begin-box:opia22_tr_EncabezadoHTML::1532:Encabezado de página HTML, invisible.-->
    <!--loc('* Encabezado w3 full, requerido en todas las páginas HTML de su sitio ')-->
    <title>Boletines de Vigilancia e Inteligencia en Innovación - Opia.CL: Observatorio para la Innovación Agraria, Agroalimentaria y Forestal</title>
    <style type="text/css">
        #recuadros_articulo_1606 .tab-content {
          background-color: #fff;
        }
        
        #recuadros_articulo_1606 .figure img  {
        border: 1px solid #ddd;
        }
    </style>
    <meta name="keywords" content=", Agrario, innovación en alimentos, agro, agricultura, innovación agrícola, tecnologías agrícolas, alimentos saludables, agricultura orgánica, Adaptación al Cambio Climático, Agricultura Orgánica, Alimentos más Saludables, Bioenergía y Energías Renovables No Convencionales (ERNC, Empresas asociativas, Gestión del recurso humano intrapredial, Patrimonio Alimentario, Recursos Hídricos, Riesgos Agroclimáticos, Apícola, Arroz, Berries, Flores, Frutales de nuez (almendro), avellano europeo, Frutales de nuez (nogal), Frutos Deshidratados, Hortalizas, Leguminosas, Pecuario (camélidos), Pecuario (carne bovina), Pecuario (ovino de carne centro sur), Plantas Medicinales, Productos Forestales No Madereros (PFNM), Quínoa, Vitivinicultura">
    <meta name="description" content="">
    <meta name="generator" content="Newtenberg Engine CMS - https://www.newtenberg.com/">
    <meta name="Newtenberg-Server" content="https://fia-engine.newtenberg.com">
    <meta name="Content-Encoding" content="UTF-8">
    <link rel="Top" type="text/html" href="https://opia.fia.cl/">
    <link rel="shortcut icon" href="https://opia.fia.cl/601/boxes-1532_favicon.ico">
    <script async="" src="https://www.google-analytics.com/analytics.js"></script>
    <script type="text/javascript">
        <!--
        
        var __cid = '501';
        var __iid = '601';
        var __pnid = '526';
        var __pvid = '148969';
        
        -->
    </script>
    <script type="text/javascript" src="../js/boletines/channels-501_js_main.js.download"></script>
    <script type="text/javascript" src="../js/boletines/channels-501_js_jquery_3_6_0.js.download"></script>
    <script type="text/javascript" src="../js/boletines/channels-501_js_cookies.js.download"></script>
    <!--end-box-->
    <!--begin-box:opia22_tr_meta_viewport::1530:Se incluyen las directivas meta que definen el estado inicial de la pantall apara responsive y además el modo de compatibilidad para Internet Explorer en caso que haya sido alterado. Pendiente el app_id de facebook-->
    <!--loc('* Código HTML libre dentro de la página.')-->
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <!--
<meta prefix="og: http://ogp.me/ns#" property="fb:app_id"  content="1657171797935701" />
-->
    <link rel="preconnect" href="https://fonts.googleapis.com/">
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="">
    <link href="../css/boletines/css2" rel="stylesheet">
    <link href="../css/boletines/css2(1)" rel="stylesheet">
    <link rel="stylesheet" href="../css/boletines/css">
    <link rel="stylesheet" href="../css/boletines.bootstrap-icons.css">
    <link rel="stylesheet" href="../css/boletines/font-awesome.css">
    <link rel="stylesheet" href="../css/boletines/channels-501_CSS_estilo_base.css">
    <link rel="stylesheet" href="../css/boletines/channels-501_bootstrap_social_css.css">

    <!--end-box-->
    <!--begin-box:aa_tr_google_analytics::1055:Caja que contiene el codigo analytics-->
    <!--loc('* Código JavaScript para la página.')-->
    <script type="text/javascript" src="https://www.googletagmanager.com/gtag/js?id=G-GR7762Z4BJ"></script>
    <script type="text/javascript" src="../js/boletines/boxes-1055_js_code.js.download"></script>
    <!--end-box-->
    <!--begin-box:w3_tr_link_externo:externo:1061:Permite que un vínculo se abra en una ventana nueva cuando tiene la clase externo-->
    <!--loc('* Incluye script para personalizar comportamiento de links')-->
    <script type="text/javascript">
        <!--
        $(document).ready(function(){$('.externo>a:not([class])').click(function(){window.open(this.href,'_blank','resizable=1,menubar=1,location=1,status=1,scrollbars=1,toolbar=1,width=,height=');return false});});
        -->
    </script>
    <!--end-box-->
    <!--begin-box:tr_meta_Facebook::1077:Metadatos para Facebook.-->
    <!--loc('Genera metadata para Facebook®')-->
    <meta prefix="og: http://ogp.me/ns#" property="og:title" content="Boletines de Vigilancia e Inteligencia en Innovación">
    <meta prefix="og: http://ogp.me/ns#" property="og:description" content="">
    <meta prefix="og: http://ogp.me/ns#" property="og:site_name" content="Opia.CL: Observatorio para la Innovación Agraria, Agroalimentaria y Forestal">
    <meta prefix="og: http://ogp.me/ns#" property="og:type" content="website">
    <meta prefix="og: http://ogp.me/ns#" property="og:locale" content="es_LA">
    <meta prefix="og: http://ogp.me/ns#" property="og:url" content="https://opia.fia.cl/601/w3-propertyvalue-148969.html">
    <meta prefix="og: http://ogp.me/ns#" property="og:image" content="propertyvalues-148969_recurso_1.thumb_i700x.jpg">
    <!--end-box-->
    <!--begin-box:tr_meta_Twitter::1078:Metadatos para Twitter.-->
    <!--Etiquetas META summary card de Twitter-->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@Opia_Chile">
    <meta name="twitter:title" content="Boletines de Vigilancia e Inteligencia en Innovación">
    <meta name="twitter:description" content="">
    <meta name="twitter:image" content="propertyvalues-148969_recurso_1.thumb_i700x.jpg">
    <!--end-box-->
    <!--begin-box:opia22_CSS_VigiFIA::1558:Estilos para VigiFIA.-->
    <!--loc('* Código CSS para la página.')-->
    <style type="text/css">
        /*.body-antena #header #navbar_navbar_container {
          border: 1px solid #d5ef69;
          border-width: 0 10px;
        }*/
        
        .body-antena #ar_tendencias_recurso img {
        	border: 1px solid #ddd;
        }
        
        #portada-antenas .tab-content .ntg-titulo-caja {
        border: none !important;
        }
        
        .btn-verde-claro.format-pdf a {
            min-height: unset;
        }
        
        .body-antena #pa_valores_antenas {
          margin-bottom: 3em;
        }
        
        .body-antena #pa_valores_antenas > li > a {
          margin: 0 0.5em 0.5em;
          border: 1px solid #ddd;
          color: #279989;
        }
        
        #recuadros_articulo_1608 ul.indice {
          float: right;
        }
    </style>
    <!--end-box-->
    <!--begin-box:css_NTG_Bs5_extension::1624:Código de estilos NTG bootstrap5 que complementan cualquier versión anterior para esto es necesario utilizar el prefijo ntg5- -->
    <!--loc('* Código CSS para la página.')-->
    <style type="text/css">
        @import "boxes-1624_style.css";
    </style>
    <!--end-box-->
</head>

<body class="body-antena">
    <div class="container-fluid" id="header">
        <div class="row">
            <!--begin-box:opia22_tr_logos::1531:logos y buscador-->
            <!--loc('* Código HTML libre dentro de la página.')-->
            <div class="container-fluid hidden-print" id="tr_logos_buscador">
                <div class="row ">
                    <div class="col-md-8 col-xs-10 logo-opia-header">
                        <a href="http://www.fia.cl/" title="Ir al sitio web FIA" class="logo-gob">
                            <img src="../images/boletines/channels-501_logo_fia_gob.svg" alt="logo FIA" width="156" height="80">
                            <span class="sr-only">FIA Fundación para la Innovación Agraria - Ministerio de Agricultira Chile</span>
                        </a>
                        <a href="https://opia.fia.cl/601/w3-channel.html" title="Ir al inicio del Observatorio" class="logo-opia-texto">
                            <img src="../images/boletines/channels-501_logo_opia_texto.svg" alt="logo OPIA" width="500" height="80">
                            <span class="sr-only">Observatorio para la Innovación Silvoagropecuaria y la Cadena Agroalimentaria</span>
                        </a>
                    </div>
                    <div class="visible-xs col-xs-2">
                        <button type="button" class="navbar-toggle opia collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
        <span></span>
        <span></span>
        <span></span>
      </button>
                    </div>
                    <div class="col-md-4 col-xs-12 tr-buscador">
                        <div id="tr_buscador">
							<form name="searchForm" action="" method="GET" class="buscador_portada">
								<fieldset>
									<legend title="buscador" class="hidden sr-only invisible oculto">Buscador general</legend>
									<div class="input-group input-group-md">
										<label for="keywords" class="hidden sr-only invisible oculto">Buscar</label>
										<input class="form-control" id="keywords" type="text" name="keywords" value="<?php echo htmlspecialchars($search_keyword); ?>" size="40" placeholder="BUSCAR">
										<span class="input-group-btn">
											<label for="boton_busqueda" class="hidden sr-only invisible oculto">Botón de búsqueda</label>
											<button type="submit" id="boton_busqueda" class="btn btn-link btn-xs"><i class="bi bi-search h3"></i></button>
										</span>
									</div>
								</fieldset>
							</form>
						</div>
                    </div>
                </div>
            </div>
            <!--end-box-->
            <!--begin-box-container:tr_menu_principal_contenedora::712:Muestra el header: logo y la navegación principal-->
            <!--loc('Caja contenedora')-->
            <div class="navbar navbar-default" id="navbar_navbar_default">
                <div class="container-fluid" id="navbar_navbar_container">
                    <div class="row">
                        <!--pos=1-->
                        <!--begin-box:tr_menu_principal_box01::608:- - -->
                        <!--loc('* Código HTML libre dentro de la página.')-->
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
	</button>
                            <a class="navbar-brand" href="https://opia.fia.cl/601/w3-propertyvalue-148969.html#">
                                <span class="sr-only">
    	Observatorio de Innovación Agraria, Agroalimentaria y Forestal
  		</span>
                            </a>
                        </div>
                        <!--end-box-->
                        <div class="collapse navbar-collapse" id="navbar-collapse-1">
                            <ul class="nav navbar-nav navbar-left">
                                <!--pos=2-->
                                <!--begin-box:tr_menu_principal_box02_inicio::1102:- - -->
                                <!--loc('* Código HTML libre dentro de la página.')-->
                                <!--end-box-->
                                <!--pos=3-->
                                <!--begin-box:tr_menu_principal_box02B::711:- - -->
                                <!--loc('* Lista de Valores de Clasificando')-->
                                <li><a class="pnid-526 pv-pid-0 pvid-13904 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-13904.html" title="Ir a Observatorio">Observatorio</a></li>
                                <li class="current active"><a class="pnid-526 pv-pid-0 pvid-147024 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-147024.html" title="Ir a VigiFIA">VigiFIA</a></li>
                                <li><a class="pnid-526 pv-pid-0 pvid-13905 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-13905.html" title="Ir a Oportunidades">Oportunidades</a></li>
                                <li><a class="pnid-526 pv-pid-0 pvid-13913 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-13913.html" title="Ir a Comunidad">Comunidad</a></li>
                                <li><a class="pnid-526 pv-pid-0 pvid-13906 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-13906.html" title="Ir a Actualidad">Actualidad</a></li>
                                <li><a class="pnid-526 pv-pid-0 pvid-13914 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-13914.html" title="Ir a Directorios">Directorios</a></li>
                                <li><a class="pnid-526 pv-pid-0 pvid-71885 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-71885.html" title="Ir a Base de Proyectos">Base de Proyectos</a></li>
                                <li><a class="pnid-526 pv-pid-0 pvid-13908 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-13908.html" title="Ir a Información de apoyo">Información<span class="hidden-md hidden-sm"> de apoyo</span></a></li>
                                <!--end-box-->
                            </ul>
                            <ul class="nav navbar-nav navbar-right">
                                <!--pos=4-->
                                <!--begin-box:tr_menu_principal_box03::610:- - -->
                                <!--loc('* Código HTML libre dentro de la página.')-->
                                <!--end-box-->
                                <!--pos=5-->
                                <!--begin-box:tr_menu_principal_box04::1080:- - -->
                                <!--loc('* Código HTML libre dentro de la página.')-->
                                <!--end-box-->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!--end-box-->
        </div>
    </div>
    <div id="contents">
        <div class="breadcrumb-container">
            <div class="container">
                <!--begin-box:pa_barraPosicion:breadcrumb:628:Barra de posición de este valor de clasificando-->
                <!--loc('* Barra de posición del valor de clasificando usando referer')-->
                <!--tipo_molde = propertyvalue-->
                <!--portadilla simple-->
                <p class="breadcrumb"><a class="channellink" href="https://opia.fia.cl/601/w3-channel.html">Inicio</a> / <a href="https://opia.fia.cl/601/w3-propertyvalue-147024.html" class=" pnid-526 pv-pid-0 pvid-147024 cid-501">VigiFIA</a> / <a class="current portadilla w3:propertyvalue pvid-148969 cid-501 active" href="https://opia.fia.cl/601/w3-propertyvalue-148969.html">Boletines de Vigilancia e Inteligencia en Innovación</a></p>
                <!--end-box-->
            </div>
        </div>
        <div id="opia22_encabezado">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <!--begin-box-container:tr_compartir_cc::1021:- - -->
                        <!--loc('Caja contenedora')-->
                        <div class="dropdown btn-group pull-left tr-compartir hidden-print" id="dropdown_compartir_hitos">
                            <!--pos=1-->
                        </div>
                        <!--end-box-->
                        <!--begin-box:pa_titulo::627:Titulo de este valor de clasificando-->
                        <!--loc('* Valor de Clasificando Completo')-->
                        <h1 class="page-header pnid-526 pv-pid-147024 pvid-148969 cid-501">Boletines VigiFIA</h1>
                        <!--end-box-->
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <!--begin-box:pa_VigiFIA_boletines_tabs_nav::1613:- - - -->
                    <!--loc('* Código HTML libre dentro de la página.')-->
                    <ul class="nav nav-pills nav-justified panorama-nav-tabs">

                    </ul>
                    <!--end-box-->
                </div>
            </div>
        </div>
        <!--begin-box-container:alt_w3_pa_Destacados_VigiFIA_Boletines_CC::1619:Caja que contiene los destacados de la sección VIGIFIA-->
        <!--loc('Caja contenedora')-->
        <div class="container margen-abajo-lg" id="portada-antenas">
            <div class="row">
                <div class="col-lg-9">
                    <div class="row margen-abajo-sm">
                    </div>
                    <div class="row margen-abajo-md">
                        <div class="col-md-12">
                            <!--pos=1-->
                            <!--begin-box:w3_pa_Destacados_Adaptacion_Mitigacion_Cambio_Climatico_pvid:recuadros recuadros-recursos sin-mime titulo-caja-grupo margen-abajo-md:1595:Caja que muestra destacados de Adaptación y Mitigación al Cambio Climático-->
                            <!--loc('* Recuadros de artículos')-->
                            <div id="recuadros_articulo_1595" class="recuadros recuadros-recursos sin-mime titulo-caja-grupo margen-abajo-md">
                                <h2 class="ntg-titulo-caja titulo-caja">Ultimos boletines de VigiFIA</h2>
                                <div id="recuadros_articulo_1595" class="recuadros recuadros-recursos sin-mime titulo-caja-grupo margen-abajo-md">
                                <?php
                                // Recorremos todos los boletines activos
                                foreach ($boletines as $boletin) {
                                    // Obtener los datos de cada boletín
                                    $id_boletin = $boletin['id_boletin'];
                                    $ruta_archivo = $boletin['ruta_archivo'];
                                    $fecha_publicacion = date('d-M-Y', strtotime($boletin['fecha_publicacion']));
                                    $titulo = $boletin['titulo'];
                                    $subido_por = $boletin['subido_por'];
                                    $descripcion = $boletin['descripcion'];
                                ?>
                                
                                <div class="recuadro media">
                                    <div class="figure pull-left recurso-con-borde cid-<?php echo $id_boletin; ?> aid-<?php echo $id_boletin; ?> binary-archivo_01 format-pdf">
                                    <form action="procesar_visitas.php" method="POST">
                                        <input type="hidden" name="id_boletin" value="<?php echo $id_boletin; ?>">
                                        <input type="hidden" name="ruta_archivo" value="<?php echo $ruta_archivo; ?>">
                                        <button type="submit" title="<?php echo $titulo; ?>">
                                            <img src="../images/boletines/articles-126033_archivo_01.thumb_miniThumb.jpg"
                                                alt="<?php echo $titulo; ?>"
                                                title="<?php echo $titulo; ?>">
                                        </button>
                                    </form>

                                    </div>
                                    <span class="small cid-<?php echo $id_boletin; ?> aid-<?php echo $id_boletin; ?> pnid-530 iso8601-<?php echo str_replace('-', '', $fecha_publicacion); ?>T0000000300"><?php echo $fecha_publicacion; ?></span>
                                    <div class="media-body">
                                    <h2 class="titulo aid-<?php echo $id_boletin; ?> cid-<?php echo $id_boletin; ?> media-heading">
                                    <form action="procesar_visitas.php" method="POST" style="display: inline;">
                                        <input type="hidden" name="id_boletin" value="<?php echo $id_boletin; ?>">
                                        <input type="hidden" name="ruta_archivo" value="<?php echo $ruta_archivo; ?>">
                                        <button type="submit" style="background: none; border: none; padding: 0; color: inherit; font-size: inherit; text-align: left; cursor: pointer;">
                                                <?php echo $titulo; ?>
                                        </button>
                                    </form>
                                    </h2>
                                    <h5 class = "abstract aid-126720 cid-501"> <?php echo $descripcion; ?></h5>
                                    <!-- <p class="small">Autor: </p> -->
                                    <span class="pv-branch pnid-721 cid-501">
                                        <span class="pnid-721 pv-pid-0 pvid-149116 cid-501">Escrito por <?php echo $subido_por; ?>, perteneciente a FIA</span>
                                    </span>
                                    <form action="registrar_descarga.php" method="GET" style="display: inline;">
                                        <input type="hidden" name="id_boletin" value="<?php echo $id_boletin; ?>">
                                        <button type="submit" style="margin-left: 5px;">Descargar</button>
                                    </form>
                                    </div>
            
                                </div>
                                
                                <?php } ?>

                                </div>
                            </div>
                            <!--end-box-->
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="row margen-abajo-sm">
                        <div class="col-md-12">
                            <h2 class="titulo-caja titulo-caja-gris">Boletines VigiFIA</h2>
                        </div>
                    </div>
                    <div class="row margen-abajo-md">
                        <div class="col-md-12">
                            <!--pos=4-->
                            <!--begin-box:pa_vigifia_boletines_subvalores:lista-menu lista-colapsable:1594:Caja que muestra subvalores de las secciones de Boletines de VigiFIA-->
                            <!--loc('* Lista de Valores de Clasificando')-->
                            <div class="lista-menu lista-colapsable" id="lista-menu">
                                <ul class="list-group nivel-1">
                                    <li class="list-group-item item-1"><a class="pnid-718 pv-pid-0 pvid-149014 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-149014.html" title="Ir a Adaptación y Mitigación al Cambio Climático">Adaptación y Mitigación al Cambio Climático<span class="counting">(10)</span></a> </li>
                                    <li class="list-group-item item-2"><a class="pnid-718 pv-pid-0 pvid-149015 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-149015.html" title="Ir a Gestión Sostenible de Recursos Hídricos">Gestión Sostenible de Recursos Hídricos<span class="counting">(10)</span></a> </li>
                                    <li class="list-group-item item-3"><a class="pnid-718 pv-pid-0 pvid-149016 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-149016.html" title="Ir a Sistemas Alimentarios Sostenibles">Sistemas Alimentarios Sostenibles<span class="counting">(10)</span></a> </li>
                                </ul>
                            </div>
                            <!--end-box-->
                        </div>
                    </div>
                    <div class="row margen-abajo-sm">
                        <div class="col-md-12">
                            <h2 class="titulo-caja titulo-caja-gris">Boletines Históricos</h2>
                        </div>
                    </div>
                    <div class="row margen-abajo-md">
                        <div class="col-md-12">
                            <!--pos=5-->
                            <!--begin-box:pa_vigifia_boletines_historicos_subvalores:lista-menu lista-colapsable:1614:Caja que muestra subvalores de las secciones de Boletines de VigiFIA-->
                            <!--loc('* Lista de Valores de Clasificando')-->
                            <div class="lista-menu lista-colapsable" id="lista-menu">
                                <ul class="list-group nivel-1">
                                    <li class="list-group-item item-1"><a class="pnid-719 pv-pid-0 pvid-149040 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-149040.html" title="Ir a Alimentos">Alimentos<span class="counting">(6)</span></a> </li>
                                    <li class="list-group-item item-2"><a class="pnid-719 pv-pid-0 pvid-149041 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-149041.html" title="Ir a Apicultura">Apicultura<span class="counting">(5)</span></a> </li>
                                    <li class="list-group-item item-3"><a class="pnid-719 pv-pid-0 pvid-149042 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-149042.html" title="Ir a Berries">Berries<span class="counting">(6)</span></a> </li>
                                    <li class="list-group-item item-4"><a class="pnid-719 pv-pid-0 pvid-149018 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-149018.html" title="Ir a Bioenergía">Bioenergía<span class="counting">(28)</span></a> </li>
                                    <li class="list-group-item item-5"><a class="pnid-719 pv-pid-0 pvid-149017 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-149017.html" title="Ir a Cambio Climático">Cambio Climático<span class="counting">(28)</span></a> </li>
                                    <li class="list-group-item item-6"><a class="pnid-719 pv-pid-0 pvid-149043 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-149043.html" title="Ir a Ovinos">Ovinos<span class="counting">(6)</span></a> </li>
                                    <li class="list-group-item item-7"><a class="pnid-719 pv-pid-0 pvid-149019 cid-501" href="https://opia.fia.cl/601/w3-propertyvalue-149019.html" title="Ir a TIC&#39;s">TIC's<span class="counting">(28)</span></a> </li>
                                </ul>
                            </div>
                            <!--end-box-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--end-box-->
        <div class="margen-abajo-md">
            <div class="container ">
                <div class="row">
                    <div class="col-sm-9"></div>
                    <div class="col-sm-3"></div>
                </div>
            </div>
        </div>
    </div>
    <!--begin-box:opia22_tr_footer::1549:- - -->
    <!--loc('* Código HTML libre dentro de la página.')-->
    <div id="footer" class="container-fluid">
        <div class="container">
            <div class="row">
                <!-- logo -->
                <div class="col-lg-3 col-md-12 logo-opia-footer">
                    <a href="http://www.fia.cl/" title="OPIA" class="logo-gob">
                        <img src="../images/boletines/channels-501_logo_fia_gob.svg" alt="logo FIA" width="156" height="80">
                        <span class="sr-only">FIA Fundación para la Innovación Agraria - Ministerio de Agricultira Chile</span>
                    </a>
                    <a href="https://opia.fia.cl/601/w3-channel.html" title="OPIA" class="logo-solo-texto">
                        <span class="texto-opia">Observatorio para la Innovación<br>Silvoagropecuaria y la Cadena Agroalimentaria
		  </span>
                        <span class="texto-fia">FUNDACIÓN PARA LA INNOVACIÓN AGRARIA</span>
                    </a>
                </div>
                <!-- Sitios de interés -->
                <div class="col-lg-3 col-md-4 col-12">
                    <ul class="list-unstyled">
                        <p class="titulo">SITIOS DE INTERÉS</p>
                        <li>
                            <a href="https://www.minagri.gob.cl/" target="blank">MINAGRI</a>
                        </li>
                        <li>
                            <a href="http://www.fia.cl/" target="blank">FIA</a>
                        </li>
                        <li>
                            <a href="http://bibliotecadigital.fia.cl/" target="blank">BIBLIOTECA DIGITAL FIA </a>
                        </li>
                    </ul>
                </div>
                <!-- Contacto -->
                <div class="col-lg-3 col-md-4 col-12">
                    <p class="titulo">CONTACTO</p>
                    <p>Loreley 1582, La Reina, Santiago<br> Teléfono: +562 2431 3000</p>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        //<![CDATA[
        
        // Botón para Ir Arriba
        jQuery(document).ready(function() {
          jQuery("#top").hide();
          jQuery(window).scroll(function () {
             if (jQuery(this).scrollTop() > 200) {
                 jQuery('#top').fadeIn();
             } else {
                 jQuery('#top').fadeOut();
             }
          });
          jQuery('#top a').click(function () {
            jQuery('body,html').animate({
               scrollTop: 0
            }, 800);
            return false;
          });
        });
        
        
        //]]>
    </script>
</body>

</html>
