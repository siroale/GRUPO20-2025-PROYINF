-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: boletinesDB
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `boletin`
--

DROP TABLE IF EXISTS `boletin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boletin` (
  `id_boletin` int NOT NULL AUTO_INCREMENT,
  `ruta_archivo` varchar(600) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `fecha_publicacion` date NOT NULL,
  `estado` varchar(45) NOT NULL,
  `subido_por` int NOT NULL,
  `veces_visitado` int DEFAULT NULL,
  PRIMARY KEY (`id_boletin`),
  KEY `fk_boletines_usuarios_idx` (`subido_por`),
  CONSTRAINT `fk_boletines_usuarios` FOREIGN KEY (`subido_por`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boletin`
--

LOCK TABLES `boletin` WRITE;
/*!40000 ALTER TABLE `boletin` DISABLE KEYS */;
/*!40000 ALTER TABLE `boletin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boletin_fuente`
--

DROP TABLE IF EXISTS `boletin_fuente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boletin_fuente` (
  `id_boletin_fuente` int NOT NULL AUTO_INCREMENT,
  `id_boletin` int NOT NULL,
  `id_fuente` int NOT NULL,
  `proporcion_contenido` int DEFAULT NULL,
  PRIMARY KEY (`id_boletin_fuente`),
  KEY `fk_boletin_fuente_boletin1_idx` (`id_boletin`),
  KEY `fk_boletin_fuente_fuente1_idx` (`id_fuente`),
  CONSTRAINT `fk_boletin_fuente_boletin1` FOREIGN KEY (`id_boletin`) REFERENCES `boletin` (`id_boletin`) ON DELETE CASCADE,
  CONSTRAINT `fk_boletin_fuente_fuente1` FOREIGN KEY (`id_fuente`) REFERENCES `fuente` (`id_fuente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boletin_fuente`
--

LOCK TABLES `boletin_fuente` WRITE;
/*!40000 ALTER TABLE `boletin_fuente` DISABLE KEYS */;
/*!40000 ALTER TABLE `boletin_fuente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `descarga`
--

DROP TABLE IF EXISTS `descarga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `descarga` (
  `id_descarga` int NOT NULL AUTO_INCREMENT,
  `id_boletin` int NOT NULL,
  `id_usuario` int NOT NULL,
  `fecha_descarga` date NOT NULL,
  PRIMARY KEY (`id_descarga`),
  KEY `fk_descargas_boletines1_idx` (`id_boletin`),
  KEY `fk_descargas_usuarios1_idx` (`id_usuario`),
  CONSTRAINT `fk_descargas_boletines1` FOREIGN KEY (`id_boletin`) REFERENCES `boletin` (`id_boletin`),
  CONSTRAINT `fk_descargas_usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `descarga`
--

LOCK TABLES `descarga` WRITE;
/*!40000 ALTER TABLE `descarga` DISABLE KEYS */;
/*!40000 ALTER TABLE `descarga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fuente`
--

DROP TABLE IF EXISTS `fuente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fuente` (
  `id_fuente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `categoria` varchar(45) NOT NULL,
  `url_fuente` varchar(600) NOT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id_fuente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fuente`
--

LOCK TABLES `fuente` WRITE;
/*!40000 ALTER TABLE `fuente` DISABLE KEYS */;
/*!40000 ALTER TABLE `fuente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `tipo_usuario` varchar(45) NOT NULL,
  `fecha_registro` date NOT NULL,
  PRIMARY KEY (`id_usuario`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'insano@gmail.com','elInsanoo','$2y$10$aStacyOHC6KWT43TtT1lYeCx07pBcpN5vQY8kCAiyz9c9P56.G56a','normal','2024-10-17'),(3,'goms@gmail.com','goms','$2y$10$c/nmJgduVCjBYCcY3s7YsuD5z/EefxNVJZx87n23TWSxRnvvqtyBW','normal','2024-10-17'),(4,'admin@gmail.com','acmon','$2y$10$sIo6yYEHY9sLbXbRZatSIuiNFJ0mhoQa8sZT4bzJ0NFr4bBlvx8OO','admin','2024-10-17');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-17  4:03:26
