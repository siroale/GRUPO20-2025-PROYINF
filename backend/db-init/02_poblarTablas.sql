INSERT INTO usuario (rango, correo, contrasena, nombre, apellido, foto) VALUES
(1, 'admin@example.com', '1234', 'Juan', 'Pérez', '/media/profile_picture/murin.png'),
(2, 'ana@example.com', 'abcd', 'Ana', 'Martínez', '/media/profile_picture/murin.png'),
(2, 'luis@example.com', 'qwer', 'Luis', 'Gómez', '/media/profile_picture/murin.png'),
(2, 'maria@example.com', 'pass', 'María', 'Rodríguez', '/media/profile_picture/murin.png'),
(2, 'carlos@example.com', '0000', 'Carlos', 'López', '/media/profile_picture/murin.png'),
(2, 'laura@example.com', 'abcd', 'Laura', 'Fernández', '/media/profile_picture/murin.png'),
(2, 'david@example.com', 'xyz', 'David', 'Ruiz', '/media/profile_picture/murin.png'),
(2, 'sofia@example.com', 'pass', 'Sofía', 'Morales', '/media/profile_picture/murin.png'),
(2, 'diego@example.com', '9999', 'Diego', 'Jiménez', '/media/profile_picture/murin.png'),
(2, 'carla@example.com', '1111', 'Carla', 'Torres', '/media/profile_picture/murin.png');

INSERT INTO boletin (titulo, fecha, vistas, imagen, estado, cuerpo, desde, hasta, instruccion, autor, ruta) VALUES
('Boletín 1', CURRENT_DATE, 10, '/media/boletin/default_pic.png', 1, 'Contenido del boletín 1', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', 'Leer completo', 1, '/media/boletin/VeranoInvencible.pdf'),
('Boletín 2', CURRENT_DATE, 15, '/media/boletin/default_pic.png', 1, 'Contenido del boletín 2', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', 'Leer completo', 2, '/media/boletin/VeranoInvencible.pdf'),
('Boletín 3', CURRENT_DATE, 5, '/media/boletin/default_pic.png', 1, 'Contenido del boletín 3', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', 'Leer completo', 3, '/media/boletin/VeranoInvencible.pdf'),
('Boletín 4', CURRENT_DATE, 7, '/media/boletin/default_pic.png', 1, 'Contenido del boletín 4', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', 'Leer completo', 4, '/media/boletin/VeranoInvencible.pdf'),
('Boletín 5', CURRENT_DATE, 3, '/media/boletin/default_pic.png', 1, 'Contenido del boletín 5', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', 'Leer completo', 5, '/media/boletin/VeranoInvencible.pdf'),
('Boletín 6', CURRENT_DATE, 8, '/media/boletin/default_pic.png', 1, 'Contenido del boletín 6', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', 'Leer completo', 6, '/media/boletin/VeranoInvencible.pdf'),
('Boletín 7', CURRENT_DATE, 12, '/media/boletin/default_pic.png', 1, 'Contenido del boletín 7', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', 'Leer completo', 7, '/media/boletin/VeranoInvencible.pdf'),
('Boletín 8', CURRENT_DATE, 0, '/media/boletin/default_pic.png', 1, 'Contenido del boletín 8', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', 'Leer completo', 8, '/media/boletin/VeranoInvencible.pdf'),
('Boletín 9', CURRENT_DATE, 6, '/media/boletin/default_pic.png', 1, 'Contenido del boletín 9', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', 'Leer completo', 9, '/media/boletin/VeranoInvencible.pdf'),
('Boletín 10', CURRENT_DATE, 4, '/media/boletin/default_pic.png', 1, 'Contenido del boletín 10', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', 'Leer completo', 10, '/media/boletin/VeranoInvencible.pdf');

INSERT INTO fuente (link, nombre) VALUES
('https://ejemplo.com/fuente1', 'Fuente 1'),
('https://ejemplo.com/fuente2', 'Fuente 2'),
('https://ejemplo.com/fuente3', 'Fuente 3'),
('https://ejemplo.com/fuente4', 'Fuente 4'),
('https://ejemplo.com/fuente5', 'Fuente 5'),
('https://ejemplo.com/fuente6', 'Fuente 6'),
('https://ejemplo.com/fuente7', 'Fuente 7'),
('https://ejemplo.com/fuente8', 'Fuente 8'),
('https://ejemplo.com/fuente9', 'Fuente 9'),
('https://ejemplo.com/fuente10', 'Fuente 10');

INSERT INTO categoria (categoria) VALUES
('Tecnología'),
('Salud'),
('Ciencia'),
('Educación'),
('Economía'),
('Deportes'),
('Política'),
('Cultura'),
('Medio Ambiente'),
('Arte');

INSERT INTO boletin_fuente (id_boletin, id_fuente) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
(6, 6), (7, 7), (8, 8), (9, 9), (10, 10);

INSERT INTO boletin_categoria (id_boletin, id_categoria) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
(6, 6), (7, 7), (8, 8), (9, 9), (10, 10);

INSERT INTO fuente_categoria (id_fuente, id_categoria) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
(6, 6), (7, 7), (8, 8), (9, 9), (10, 10);

INSERT INTO noticia (titulo, fecha, cuerpo, id_fuente) VALUES
('Noticia 1', CURRENT_DATE, 'Cuerpo de la noticia 1', 1),
('Noticia 2', CURRENT_DATE, 'Cuerpo de la noticia 2', 2),
('Noticia 3', CURRENT_DATE, 'Cuerpo de la noticia 3', 3),
('Noticia 4', CURRENT_DATE, 'Cuerpo de la noticia 4', 4),
('Noticia 5', CURRENT_DATE, 'Cuerpo de la noticia 5', 5),
('Noticia 6', CURRENT_DATE, 'Cuerpo de la noticia 6', 6),
('Noticia 7', CURRENT_DATE, 'Cuerpo de la noticia 7', 7),
('Noticia 8', CURRENT_DATE, 'Cuerpo de la noticia 8', 8),
('Noticia 9', CURRENT_DATE, 'Cuerpo de la noticia 9', 9),
('Noticia 10', CURRENT_DATE, 'Cuerpo de la noticia 10', 10);
