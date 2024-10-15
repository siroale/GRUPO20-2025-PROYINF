CREATE TABLE IF NOT EXISTS `boletinesDB`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `contraseña` VARCHAR(45) NOT NULL,
  `tipo_usuario` VARCHAR(45) NOT NULL,
  `fecha_registro` DATE NOT NULL,
  PRIMARY KEY (`id_usuario`, `email`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `boletinesDB`.`boletin` (
  `id_boletin` INT NOT NULL AUTO_INCREMENT,
  `ruta_archivo` VARCHAR(600) NOT NULL,
  `titulo` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(45) NULL,
  `fecha_publicacion` DATE NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `subido_por` INT NOT NULL,
  `veces_visitado` INT NULL,
  PRIMARY KEY (`id_boletin`),
  INDEX `fk_boletines_usuarios_idx` (`subido_por` ASC) VISIBLE,
  CONSTRAINT `fk_boletines_usuarios`
    FOREIGN KEY (`subido_por`)
    REFERENCES `boletinesDB`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `boletinesDB`.`fuente` (
  `id_fuente` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `categoria` VARCHAR(45) NOT NULL,
  `url_fuente` VARCHAR(600) NOT NULL,
  `fecha` DATE NULL,
  PRIMARY KEY (`id_fuente`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `boletinesDB`.`boletin_fuente` (
  `id_boletin_fuente` INT NOT NULL AUTO_INCREMENT,
  `id_boletin` INT NOT NULL,
  `id_fuente` INT NOT NULL,
  `proporcion_contenido` INT NULL,
  PRIMARY KEY (`id_boletin_fuente`),
  INDEX `fk_boletin_fuente_boletin1_idx` (`id_boletin` ASC) VISIBLE,
  INDEX `fk_boletin_fuente_fuente1_idx` (`id_fuente` ASC) VISIBLE,
  CONSTRAINT `fk_boletin_fuente_boletin1`
    FOREIGN KEY (`id_boletin`)
    REFERENCES `boletinesDB`.`boletin` (`id_boletin`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_boletin_fuente_fuente1`
    FOREIGN KEY (`id_fuente`)
    REFERENCES `boletinesDB`.`fuente` (`id_fuente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `boletinesDB`.`descarga` (
  `id_descarga` INT NOT NULL AUTO_INCREMENT,
  `id_boletin` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `fecha_descarga` DATE NOT NULL,
  PRIMARY KEY (`id_descarga`),
  INDEX `fk_descargas_boletines1_idx` (`id_boletin` ASC) VISIBLE,
  INDEX `fk_descargas_usuarios1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_descargas_boletines1`
    FOREIGN KEY (`id_boletin`)
    REFERENCES `boletinesDB`.`boletin` (`id_boletin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_descargas_usuarios1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `boletinesDB`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;



