// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', (event) => {
    // Array para almacenar los productos seleccionados
    const productosSeleccionados = [];

    // Función para actualizar el contador de productos seleccionados
    function actualizarContador() {
        const contador = document.querySelector('.carrito-contador');
        contador.textContent = productosSeleccionados.length;
    }

    // Obtener el icono del carrito
    const carritoIcono = document.querySelector('#carroCompras');

    // Evento click en el icono del carrito
    carritoIcono.addEventListener('click', (e) => {
        e.preventDefault();
        // Mostrar el modal de productos seleccionados
        const modalProductos = new bootstrap.Modal(document.getElementById('productosModal'));
        modalProductos.show();
    });

    // Iterar sobre cada producto y agregar evento click
    document.querySelectorAll('.producto').forEach((producto, index) => {
        producto.addEventListener('click', () => {
            // Obtener información del producto seleccionado
            const nombreProducto = producto.getAttribute('data-nombre');
            const imagenProducto = producto.getAttribute('data-imagen');
            // Agregar el producto seleccionado al array
            productosSeleccionados.push({ id: index, nombre: nombreProducto, imagen: imagenProducto });
            // Actualizar el modal y el contador de productos
            actualizarModal(productosSeleccionados);
            actualizarContador();
        });
    });

    // Función para actualizar el contenido del modal con los productos seleccionados
    function actualizarModal(productos) {
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = '';

        // Contenedor para mostrar los productos seleccionados
        const productosContainer = document.createElement('div');
        productosContainer.classList.add('productos-container');

        // Iterar sobre los productos seleccionados y mostrarlos en el modal
        productos.forEach((producto, index) => {
            const productoElement = document.createElement('div');
            productoElement.classList.add('producto-seleccionado');

            // Botón para eliminar el producto seleccionado
            const eliminarBtn = document.createElement('div');
            eliminarBtn.classList.add('eliminar-btn');
            eliminarBtn.title = 'Haz click aquí para eliminar el producto';
            eliminarBtn.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
            eliminarBtn.onclick = function () {
                // Eliminar el producto seleccionado del array
                productosSeleccionados.splice(index, 1);
                // Actualizar el modal y el contador de productos
                actualizarModal(productosSeleccionados);
                actualizarContador();
            };

            // Mostrar la imagen del producto
            const imagenElement = document.createElement('img');
            imagenElement.src = producto.imagen;
            imagenElement.alt = producto.nombre;

            // Mostrar el nombre del producto
            const nombreElement = document.createElement('p');
            nombreElement.textContent = producto.nombre;

            productoElement.appendChild(imagenElement);
            productoElement.appendChild(eliminarBtn);
            productoElement.appendChild(nombreElement);

            productosContainer.appendChild(productoElement);
        });

        modalBody.appendChild(productosContainer);
    }

    // Evento click en el botón "Comprar" del modal
    document.querySelector('.modal-footer .btn-primary').addEventListener('click', () => {
        // Verificar si el carrito está vacío
        if (productosSeleccionados.length === 0) {
            // Mostrar aviso de que no hay productos seleccionados para comprar
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="alert alert-warning text-center" role="alert">
                    ¡Agregue productos al carrito antes de comprar!
                </div>
            `;
        } else {
            // Mostrar mensaje de agradecimiento por la compra
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="alert alert-success text-center" role="alert">
                    ¡Gracias por su compra! Regrese pronto.
                </div>
            `;
            // Vaciar el array de productos seleccionados y actualizar el contador
            productosSeleccionados.length = 0;
            actualizarContador();
        }
    });

});
