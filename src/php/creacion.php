<?php
    session_start();

    include "includes/dbinc.php";
    include "includes/eliminar_boletin.php";
/*   
    Este pedazo sirve para verificar si el usuario es admin, descomentarlo luego, supongo.
    if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] !== 'admin') {
        // Si no es administrador, redirigir o mostrar mensaje de acceso denegado
        header('Location: landing.php'); // O redirigir a otra página
        exit();
    }
*/
    $nombreUsuario = $_SESSION['user_name'];
    ?>

<!DOCTYPE html>

<head>

    <link rel="stylesheet" href="../css/style.css">

</head>

<body>
    
    <button id="openModalBtn" class="upload-button">
            <span class="btn__icon">
                <svg stroke-linejoin="round" stroke-linecap="round" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                    <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path>
                    <path d="M9 15l3 -3l3 3"></path>
                    <path d="M12 12l0 9"></path>
                </svg>
            </span>
            <span class="btn__text">Upload</span>
    </button>

    <!-- Un boton chanta de logout -->
    <div class="navbar-text">
        <?php echo "Hola, $nombreUsuario"; ?> <!-- Muestra el nombre del usuario -->
    </div>
    <div class="ml-auto">
        <form action="includes/logout.php" method="POST"> <!-- El formulario para hacer logout -->
            <button type="submit" class="btn btn-danger">Logout</button>
        </form>
    </div>

    <div id="uploadModal" class="modal">
        <div class="modal-header">
            <div class="modal-logo">
                <span class="logo-circle">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="25"
                    height="25"
                    viewBox="0 0 512 419.116"
                    >
                    <defs>
                        <clipPath id="clip-folder-new">
                        <rect width="512" height="419.116"></rect>
                        </clipPath>
                    </defs>
                    <g id="folder-new" clip-path="url(#clip-folder-new)">
                        <path
                        id="Union_1"
                        data-name="Union 1"
                        d="M16.991,419.116A16.989,16.989,0,0,1,0,402.125V16.991A16.989,16.989,0,0,1,16.991,0H146.124a17,17,0,0,1,10.342,3.513L227.217,57.77H437.805A16.989,16.989,0,0,1,454.8,74.761v53.244h40.213A16.992,16.992,0,0,1,511.6,148.657L454.966,405.222a17,17,0,0,1-16.6,13.332H410.053v.562ZM63.06,384.573H424.722L473.86,161.988H112.2Z"
                        fill="var(--c-action-primary)"
                        stroke=""
                        stroke-width="1"
                        ></path>
                    </g>
                    </svg>
                </span>
            </div>
            <p class="modal-title">Subir Archivo</p>
            <button id="closeModalBtn" class="btn-close">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                    fill="var(--c-text-secondary)"
                    ></path>
                </svg>
            </button>
        </div>
        <form action="upload.php" method="post" enctype="multipart/form-data">
            <div class="modal-body">

                <div class="card-file">
                    <label class="input_label">Nombre Archivo</label>
                    <input class="input_field" type="text" name="nombre" required>
                </div>

                <div class="card-file">
                    <label class="input_label">Descripcion</label>
                    <input class="input_field" type="text" name="descripcion" required>
                </div>

                <p class="modal-description">Adjunte un archivo debajo</p>
                <div id="uploadArea" class="upload-area">
                    <input type="file" id="fileInput" name="file" accept="application/pdf" style="display: none;" required>
                    <span class="upload-area-icon">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="35"
                        height="35"
                        viewBox="0 0 340.531 419.116"
                        >
                        <g id="files-new" clip-path="url(#clip-files-new)">
                            <path
                            id="Union_2"
                            data-name="Union 2"
                            d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z"
                            transform="translate(2944 428)"
                            fill="var(--c-action-primary)"
                            ></path>
                        </g>
                        </svg>
                    </span>
                    <span class="upload-area-title">Arrastre un archivo para subirlo</span>
                    <span class="upload-area-description"> 
                        Tambien puede seleccionar un archivo haciendo <strong> click </strong>
                    </span>
                </div>
                <div id="uploadDone" style="display: none;">
                    <div id="previewArea" class="preview-area">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <input class="btn-primary" type="submit" name="submit" value="Subir archivo">
            </div>
        </form>
    </div>
    
    <?php
        include "mostrar_boletines_admin.php";
    ?>

    <script>
    // Obtener elementos del DOM
    var modal = document.getElementById("uploadModal");
    var openModalBtn = document.getElementById("openModalBtn");
    var closeModalBtn = document.getElementById("closeModalBtn");       
    var uploadArea = document.getElementById("uploadArea");
    var fileInput = document.getElementById("fileInput");
    var uploadDone = document.getElementById("uploadDone");
    var previewArea = document.getElementById('previewArea');


    // Función para resetear el área de subida de archivos
    function resetFileUpload() {
        // Limpiar el input de archivos
        fileInput.value = '';

        // Limpiar la vista previa
        previewArea.innerHTML = '';

        // Ocultar la vista de archivo subido
        uploadDone.style.display = 'none';

        // Mostrar de nuevo el área de subida
        uploadArea.style.display = 'flex';
    }


    // Función para mostrar la previsualización del archivo
    function showFilePreview(file) {
        previewArea.innerHTML = '';  // Limpiar cualquier vista previa anterior

        if (file) {
            const fileType = file.type;
            const fileName = file.name;
            const icon = document.createElement('div');
            icon.classList.add('preview-icon');

            if (fileType === 'application/pdf') {
                icon.innerHTML = `<svg height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                                        viewBox="0 0 303.188 303.188" xml:space="preserve">
                                        <g>
                                        <polygon style="fill:#E8E8E8;" points="219.821,0 32.842,0 32.842,303.188 270.346,303.188 270.346,50.525 	"/>
                                        <path style="fill:#FB3449;" d="M230.013,149.935c-3.643-6.493-16.231-8.533-22.006-9.451c-4.552-0.724-9.199-0.94-13.803-0.936
                                            c-3.615-0.024-7.177,0.154-10.693,0.354c-1.296,0.087-2.579,0.199-3.861,0.31c-1.314-1.36-2.584-2.765-3.813-4.202
                                            c-7.82-9.257-14.134-19.755-19.279-30.664c1.366-5.271,2.459-10.772,3.119-16.485c1.205-10.427,1.619-22.31-2.288-32.251
                                            c-1.349-3.431-4.946-7.608-9.096-5.528c-4.771,2.392-6.113,9.169-6.502,13.973c-0.313,3.883-0.094,7.776,0.558,11.594
                                            c0.664,3.844,1.733,7.494,2.897,11.139c1.086,3.342,2.283,6.658,3.588,9.943c-0.828,2.586-1.707,5.127-2.63,7.603
                                            c-2.152,5.643-4.479,11.004-6.717,16.161c-1.18,2.557-2.335,5.06-3.465,7.507c-3.576,7.855-7.458,15.566-11.815,23.02
                                            c-10.163,3.585-19.283,7.741-26.857,12.625c-4.063,2.625-7.652,5.476-10.641,8.603c-2.822,2.952-5.69,6.783-5.941,11.024
                                            c-0.141,2.394,0.807,4.717,2.768,6.137c2.697,2.015,6.271,1.881,9.4,1.225c10.25-2.15,18.121-10.961,24.824-18.387
                                            c4.617-5.115,9.872-11.61,15.369-19.465c0.012-0.018,0.024-0.036,0.037-0.054c9.428-2.923,19.689-5.391,30.579-7.205
                                            c4.975-0.825,10.082-1.5,15.291-1.974c3.663,3.431,7.621,6.555,11.939,9.164c3.363,2.069,6.94,3.816,10.684,5.119
                                            c3.786,1.237,7.595,2.247,11.528,2.886c1.986,0.284,4.017,0.413,6.092,0.335c4.631-0.175,11.278-1.951,11.714-7.57
                                            C231.127,152.765,230.756,151.257,230.013,149.935z M119.144,160.245c-2.169,3.36-4.261,6.382-6.232,9.041
                                            c-4.827,6.568-10.34,14.369-18.322,17.286c-1.516,0.554-3.512,1.126-5.616,1.002c-1.874-0.11-3.722-0.937-3.637-3.065
                                            c0.042-1.114,0.587-2.535,1.423-3.931c0.915-1.531,2.048-2.935,3.275-4.226c2.629-2.762,5.953-5.439,9.777-7.918
                                            c5.865-3.805,12.867-7.23,20.672-10.286C120.035,158.858,119.587,159.564,119.144,160.245z M146.366,75.985
                                            c-0.602-3.514-0.693-7.077-0.323-10.503c0.184-1.713,0.533-3.385,1.038-4.952c0.428-1.33,1.352-4.576,2.826-4.993
                                            c2.43-0.688,3.177,4.529,3.452,6.005c1.566,8.396,0.186,17.733-1.693,25.969c-0.299,1.31-0.632,2.599-0.973,3.883
                                            c-0.582-1.601-1.137-3.207-1.648-4.821C147.945,83.048,146.939,79.482,146.366,75.985z M163.049,142.265
                                            c-9.13,1.48-17.815,3.419-25.979,5.708c0.983-0.275,5.475-8.788,6.477-10.555c4.721-8.315,8.583-17.042,11.358-26.197
                                            c4.9,9.691,10.847,18.962,18.153,27.214c0.673,0.749,1.357,1.489,2.053,2.22C171.017,141.096,166.988,141.633,163.049,142.265z
                                            M224.793,153.959c-0.334,1.805-4.189,2.837-5.988,3.121c-5.316,0.836-10.94,0.167-16.028-1.542
                                            c-3.491-1.172-6.858-2.768-10.057-4.688c-3.18-1.921-6.155-4.181-8.936-6.673c3.429-0.206,6.9-0.341,10.388-0.275
                                            c3.488,0.035,7.003,0.211,10.475,0.664c6.511,0.726,13.807,2.961,18.932,7.186C224.588,152.585,224.91,153.321,224.793,153.959z"/>
                                        <polygon style="fill:#FB3449;" points="227.64,25.263 32.842,25.263 32.842,0 219.821,0 	"/>
                                        <g>
                                            <path style="fill:#A4A9AD;" d="M126.841,241.152c0,5.361-1.58,9.501-4.742,12.421c-3.162,2.921-7.652,4.381-13.472,4.381h-3.643
                                                v15.917H92.022v-47.979h16.606c6.06,0,10.611,1.324,13.652,3.971C125.321,232.51,126.841,236.273,126.841,241.152z
                                                M104.985,247.387h2.363c1.947,0,3.495-0.546,4.644-1.641c1.149-1.094,1.723-2.604,1.723-4.529c0-3.238-1.794-4.857-5.382-4.857
                                                h-3.348C104.985,236.36,104.985,247.387,104.985,247.387z"/>
                                            <path style="fill:#A4A9AD;" d="M175.215,248.864c0,8.007-2.205,14.177-6.613,18.509s-10.606,6.498-18.591,6.498h-15.523v-47.979
                                                h16.606c7.701,0,13.646,1.969,17.836,5.907C173.119,235.737,175.215,241.426,175.215,248.864z M161.76,249.324
                                                c0-4.398-0.87-7.657-2.609-9.78c-1.739-2.122-4.381-3.183-7.926-3.183h-3.773v26.877h2.888c3.939,0,6.826-1.143,8.664-3.43
                                                C160.841,257.523,161.76,254.028,161.76,249.324z"/>
                                            <path style="fill:#A4A9AD;" d="M196.579,273.871h-12.766v-47.979h28.355v10.403h-15.589v9.156h14.374v10.403h-14.374
                                                L196.579,273.871L196.579,273.871z"/>
                                        </g>
                                        <polygon style="fill:#D1D3D3;" points="219.821,50.525 270.346,50.525 219.821,0 	"/>
                                        </g>
                                    </svg>
                                <div id="file-name-display" class="nombre-submit">${fileName}</div>`;
            } else {
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M14 4V3H9.5a1.5 1.5 0 0 1-1.415-.997L7.09 0H2v8h4v1H2v1h4v1H2v2h12V7h-2v1h-1V6h-1V5h1v1h1v1h2V4z"/>
                </svg>
                <div id="file-name-display" class="nombre-submit">${fileName}</div>`;
            }
            previewArea.appendChild(icon);

            // Ocultar área de subida y mostrar la vista previa
            uploadArea.style.display = 'none';
            uploadDone.style.display = 'block';
        }
    }

    // Abrir el modal al hacer clic en el botón "Upload"
    openModalBtn.onclick = function() {
        modal.style.display = "block";
    }

    // Modificar el botón de cerrar para incluir el reset
    closeModalBtn.onclick = function() {
        // Resetear el área de subida de archivos
        resetFileUpload();

        // Ocultar el modal
        modal.style.display = "none";
    }

    // Al hacer clic en el área de subida, abrir selector de archivos
    uploadArea.onclick = function() {
        fileInput.click();
    }

    // Funcionalidad Drag & Drop
    uploadArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (event) => {
        event.preventDefault();
        uploadArea.classList.remove('drag-over');

        const files = event.dataTransfer.files;
        fileInput.files = files;

        // Mostrar la previsualización del archivo arrastrado
        showFilePreview(files[0]);
    });

    // resetear si se cancela la subida de archivos
    if (document.getElementById('cancelUploadBtn')) {
        document.getElementById('cancelUploadBtn').onclick = function() {
            resetFileUpload();
            modal.style.display = "none";
        }
    }

    // Cuando se selecciona un archivo mediante clic
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        showFilePreview(file);
    });
</script>

</body>
