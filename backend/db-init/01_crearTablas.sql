CREATE TABLE IF NOT EXISTS USUARIO (
  id_usuario SERIAL PRIMARY KEY,
  rango INT NOT NULL,
  correo VARCHAR(45) NOT NULL,
  contrasena VARCHAR(45) NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  apellido VARCHAR(45) NOT NULL,
  foto VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS boletin (
  id_boletin SERIAL PRIMARY KEY,
  titulo VARCHAR(45) NOT NULL,
  fecha DATE NOT NULL,
  vistas INT DEFAULT 0,
  imagen VARCHAR(300),
  ruta VARCHAR(300),
  estado SMALLINT NOT NULL,
  cuerpo TEXT,
  desde DATE,
  hasta DATE,
  instruccion TEXT,
  autor INT NOT NULL,
  CONSTRAINT fk_boletin_usuario
    FOREIGN KEY (autor)
    REFERENCES usuario(id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS fuente (
  id_fuente SERIAL PRIMARY KEY,
  link VARCHAR(500) NOT NULL,
  nombre VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS categoria (
  id_categoria SERIAL PRIMARY KEY,
  categoria VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS boletin_fuente (
  id_boletin INT NOT NULL,
  id_fuente INT NOT NULL,
  PRIMARY KEY (id_boletin, id_fuente),
  FOREIGN KEY (id_boletin)
    REFERENCES boletin(id_boletin)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  FOREIGN KEY (id_fuente)
    REFERENCES fuente(id_fuente)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS boletin_categoria (
  id_boletin INT NOT NULL,
  id_categoria INT NOT NULL,
  PRIMARY KEY (id_boletin, id_categoria),
  FOREIGN KEY (id_boletin)
    REFERENCES boletin(id_boletin)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  FOREIGN KEY (id_categoria)
    REFERENCES categoria(id_categoria)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS fuente_categoria (
  id_fuente INT NOT NULL,
  id_categoria INT NOT NULL,
  PRIMARY KEY (id_fuente, id_categoria),
  FOREIGN KEY (id_fuente)
    REFERENCES fuente(id_fuente)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  FOREIGN KEY (id_categoria)
    REFERENCES categoria(id_categoria)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS noticia (
  id_noticia SERIAL PRIMARY KEY,
  titulo VARCHAR(45) NOT NULL,
  fecha DATE NOT NULL,
  cuerpo TEXT NOT NULL,
  id_fuente INT NOT NULL,
  FOREIGN KEY (id_fuente)
    REFERENCES fuente(id_fuente)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);