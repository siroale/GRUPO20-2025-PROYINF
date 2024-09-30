<!DOCTYPE html>
<html lang="en">
   <head>
      <!-- basic -->
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <!-- mobile metas -->
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="viewport" content="initial-scale=1, maximum-scale=1">
      <!-- site metas -->
      <title>UNPAID</title>
      <meta name="keywords" content="">
      <meta name="description" content="">
      <meta name="author" content="">
      <!-- bootstrap css -->
      <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
      <!-- style css -->
      <link rel="stylesheet" type="text/css" href="../css/style.css">
      <!-- Responsive-->
      <link rel="stylesheet" href="../css/responsive.css">
      <!-- fevicon -->
      <link rel="icon" href="../images/fevicon.png" type="image/gif" />
      <!-- Scrollbar Custom CSS -->
      <link rel="stylesheet" href="../css/jquery.mCustomScrollbar.min.css">
      <!-- Tweaks for older IEs-->
      <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">
      <!-- owl stylesheets --> 
      <link rel="stylesheet" href="../css/owl.carousel.min.css">
      <link rel="stylesoeet" href="../css/owl.theme.default.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css" media="screen">
   </head>
   <body>
      <!-- header section start -->
      <?php include "includes/dbinc.php" ?>
      <div class="header_section">
         <div class="">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
               <a class="logo" href="visualizacion.php"><img src="../images/logo.svg"></a>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
               </button>
               <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav mr-auto">
                     <li class="nav-item">
                        <a class="nav-link" href="visualizacion.php">Inicio</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="about.html">About</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="services.html">Services</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="projects.html">Projects</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="contact.html">Contact Us</a>
                     </li>
                  </ul>
                  <div class="search_icon"><a href="#"><img src="../images/search-icon.png"></a></div>
               </div>
            </nav>
         </div>
      </div>
      <!-- header section end --> 
      <!-- banner section start --> 
      <div class="banner_section layout_padding">
         <div id="main_slider" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
               <div class="carousel-item active">
                  <div class="container">
                     <h1 class="banner_taital">Encuentra en la fundación<br>el apoyo que necesitas<br>para innovar</h1>
                     <div class="btn_main">
                        <div class="more_bt"><a href="#">Boletines</a></div>
                        <div class="contact_bt"><a href="#">Último boletin</a></div>
                     </div>
                  </div>
               </div>
               <div class="carousel-item">
                  <div class="container">
                     <h1 class="banner_taital">Encuentra en la fundación<br>el apoyo que necesitas<br>para innovar</h1>
                     <div class="btn_main">
                        <div class="more_bt"><a href="#">Boletines</a></div>
                        <div class="contact_bt"><a href="#">Último boletin</a></div>
                     </div>
                  </div>
               </div>
               <div class="carousel-item">
                  <div class="container">
                     <h1 class="banner_taital">Encuentra en la fundación<br>el apoyo que necesitas<br>para innovar</h1>
                     <div class="btn_main">
                        <div class="more_bt"><a href="#">Boletines</a></div>
                        <div class="contact_bt"><a href="#">Último boletin</a></div>
                     </div>
                  </div>
               </div>
            </div>
            <a class="carousel-control-prev" href="#main_slider" role="button" data-slide="prev">
            <i class="fa fa-left"><img src="../images/left-icon.png"></i>
            </a>
            <a class="carousel-control-next" href="#main_slider" role="button" data-slide="next">
            <i class="fa fa-right"><img src="../images/right-icon.png"></i>
            </a>
         </div>
      </div>
      <!-- banner section end -->
      <!-- service section start -->
      <div class="services_section layout_padding">
         <div class="container">
            <div class="services_taital">Nuestros Boletines</div>
            <p class="services_text">Presentamos las categorías de nuestros boletines en los que usted podrá encontrar lo que busca</p>
         </div>
         <div class="services_section_2 layout_padding">
            <div class="container-fluid padding_0">
               <div class="box_main">
                  <div class="box_left">
                     <div class="box_left_main">
                        <div class="box_left_one">
                           <div class="image_1"><img src="../images/img-1.png"></div>
                        </div>
                        <div class="box_right_one">
                           <div class="icon_1"><img src="../images/icon-1.png" width="30" height="30"><br><span>Adaptación y Mitigación al Cambio Climático</span></div>
                           <p class="long_text">Explora la adaptación y la mitigación como claves para enfrentar el cambio climático: ajustando prácticas y reduciendo emisiones para un futuro sostenible.</p>
                        </div>
                     </div>
                     <div class="see_bt"><a href="#">Ver más</a></div>
                  </div>
                  <div class="box_middle">
                     <div class="box_left_main">
                        <div class="padding_10">
                           <div class="icon_1"><img src="../images/icon-2.png" width="30" height="30"><br><span>Gestión Sostenible de Recursos Hídricos</span></div>
                           <p class="long_text">Este boletín aborda la gestión sostenible de los recursos hídricos, resaltando la importancia de conservar y utilizar el agua de manera eficiente para garantizar su disponibilidad para las futuras generaciones.</p>
                        </div>
                     </div>
                     <div class="see_bt"><a href="#">Ver más</a></div>
                  </div>
                  <div class="box_right">
                     <div class="box_left_main">
                        <div class="box_right_one">
                           <div class="icon_1"><img src="../images/icon-3.png" width="30" height="30"><br><span>Sistemas Alimentarios Sostenibles</span></div>
                           <p class="long_text">Este boletín explora la necesidad de sistemas alimentarios sostenibles, que promueven la producción y el consumo responsables para asegurar la seguridad alimentaria y proteger el medio ambiente.</p>
                        </div>
                        <div class="box_left_one">
                           <div class="image_2"><img src="../images/img-2.png"></div>
                        </div>
                     </div>
                     <div class="see_bt"><a href="#">Ver más</a></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- service section end -->
      
      <!-- client section start -->
      <div class="client_section layout_padding">
         <div class="container">
            <h1 class="client_taital">Lo que dicen nuestros colaboradores</h1>
            <p class="client_text">Opiniones serias y sinceras sobre nuestro trabajo</p>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
               <ol class="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
               </ol>
               <div class="carousel-inner">
                  <div class="carousel-item active">
                     <div class="client_section_2 layout_padding">
                        <div class="client_main">
                           <div class="client_left">
                              <div class="client_img"><img src="../images/tremendo_nucleo.png" width="200" height="200"></div>
                              <h4 class="henrry_name">Viktor Tapia</h4>
                              <h6 class="henrry_text">( Plata Infinita )</h6>
                           </div>
                           <div class="client_right">
                              <p class="lorem_text">Que iphone me compro? uno de un palo y medio o uno de un palo setecientos, NO IMPORTA, yo tengo mucha plata </p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="carousel-item">
                     <div class="client_section_2 layout_padding">
                        <div class="client_main">
                           <div class="client_left">
                              <div class="client_img"><img src="../images/colaborador-2.gif" width="200" height="200"></div>
                              <h4 class="henrry_name">Profe de OSI</h4>
                              <h6 class="henrry_text">( UML LOVER )</h6>
                           </div>
                           <div class="client_right">
                              <p class="lorem_text">Amamons OSI</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="carousel-item">
                     <div class="client_section_2 layout_padding">
                        <div class="client_main">
                           <div class="client_left">
                              <div class="client_img"><img src="../images/colaborador-3.png" width="200" height="200"></div>
                              <h4 class="henrry_name">Ruggiero</h4>
                              <h6 class="henrry_text">( Gritón )</h6>
                           </div>
                           <div class="client_right">
                              <p class="lorem_text">Si tienen dudas vuelvan al kinder o vayan a preguntarme afuera que estoy fumando. </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- client section end -->
      <!-- footer section start -->
      <div class="footer_section layout_padding">
         <div class="container">
            <div class="row">
               <div class="col-lg-4 col-sm-12">
                  <div class="map_text"><a href="#"><img src="../images/map-icon.png" class="image_main"><span class="padding_left_10">Loreley 1582, La Reina, Santiago</span></a></div>
               </div>
               <div class="col-lg-4 col-sm-12">
                  <div class="map_text"><a href="#"><img src="../images/call-icon.png" class="image_main"><span class="padding_left_10">+562 2431 3000</span></a></div>
               </div>
               <div class="col-lg-4 col-sm-12">
                  <div class="map_text"><a href="#"><img src="../images/mail-icon.png" class="image_main"><span class="padding_left_10">contacto@fia.cl</span></a></div>
               </div>
            </div>
         </div>
      </div>
      <!-- footer section end -->
      <!-- copyright section start -->
      <div class="copyright_section">
         <div class="container">
            <p class="copyright_text">Copyright 2022 Todos los derechos reservados sansanews.</p>
         </div>
      </div>
      <!-- copyright section end -->    
      <!-- Javascript files-->
      <script src="../js/jquery.min.js"></script>
      <script src="../js/popper.min.js"></script>
      <script src="../js/bootstrap.bundle.min.js"></script>
      <script src="../js/jquery-3.0.0.min.js"></script>
      <script src="../js/plugin.js"></script>
      <!-- sidebar -->
      <script src="../js/jquery.mCustomScrollbar.concat.min.js"></script>
      <script src="../js/custom.js"></script>
      <!-- javascript --> 
      <script src="../js/owl.carousel.js"></script>
      <script src="https:cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js"></script>
   </body>
</html>