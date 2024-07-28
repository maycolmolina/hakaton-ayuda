
const fileinp=document.getElementById('fileInput');

fileinp.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Obtenemos el archivo seleccionado
    const maxSizeInMB = 1; // Tamaño máximo permitido en megabytes
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convertimos el tamaño máximo a bytes
    if (file) {

        if (file.size > maxSizeInBytes) { // Verificamos si el tamaño del archivo es mayor a 1 MB
            const reader = new FileReader(); // Creamos un FileReader para leer el archivo
            reader.readAsDataURL(file); // Leemos el archivo como una URL de datos

            reader.onload = function(event) {
                const img = new Image(); // Creamos un nuevo objeto Image
                img.src = event.target.result; // Establecemos la fuente de la imagen

                img.onload = function() {
                    const canvas = document.createElement('canvas'); // Creamos un elemento canvas
                    const maxWidth = 800; // Ancho máximo deseado
                    const maxHeight = 800; // Altura máxima deseada
                    let width = img.width;
                    let height = img.height;

                    // Calcular las nuevas dimensiones manteniendo la proporción
                    if (width > height) {
                        if (width > maxWidth) {
                            height = height * (maxWidth / width); // Redimensionar altura proporcionalmente
                            width = maxWidth; // Establecer nuevo ancho
                        }
                    } else {
                        if (height > maxHeight) {
                            width = width * (maxHeight / height); // Redimensionar ancho proporcionalmente
                            height = maxHeight; // Establecer nueva altura
                        }
                    }

                    canvas.width = width; // Establecer ancho del canvas
                    canvas.height = height; // Establecer altura del canvas

                    const ctx = canvas.getContext('2d'); // Obtener el contexto 2D del canvas
                    ctx.drawImage(img, 0, 0, width, height); // Dibujar la imagen redimensionada en el canvas

                    // Convertir el contenido del canvas a un Blob con calidad de compresión JPEG
                    if(file.size>3*1024*1024){
                        canvas.toBlob(function(blob) {
                            const newImg = document.getElementById('outputImage'); // Obtener el elemento img para mostrar la imagen
                            newImg.src = URL.createObjectURL(blob); // Crear una URL para el Blob y establecerla como fuente de la imagen
                        }, 'image/jpeg', 0.5);
                    }
                    else if(file.size<2*1024*1024){
                        canvas.toBlob(function(blob) {
                            const newImg = document.getElementById('outputImage'); // Obtener el elemento img para mostrar la imagen
                            newImg.src = URL.createObjectURL(blob); // Crear una URL para el Blob y establecerla como fuente de la imagen
                        }, 'image/jpeg', 0.6);
                    }
                    
                    if(file.size<2*1024*1024) {
                        canvas.toBlob(function(blob) {
                            const newImg = document.getElementById('outputImage'); // Obtener el elemento img para mostrar la imagen
                            newImg.src = URL.createObjectURL(blob); // Crear una URL para el Blob y establecerla como fuente de la imagen
                        }, 'image/jpeg', 0.7);
                    }
                    
                }
            }
        } else {
            // Si la imagen es menor o igual a 1 MB, simplemente la mostramos sin redimensionar/comprimir
            const img = document.getElementById('outputImage');
            img.src = URL.createObjectURL(file); // Crear una URL para el archivo original y establecerla como fuente de la imagen
        }
    }
});
