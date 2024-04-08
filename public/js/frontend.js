// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Arreglo para almacenar productos seleccionados
    const productosSeleccionados = [];

    // Función para actualizar el contador de productos seleccionados
    function actualizarContador() {
        const contador = document.querySelector('.carrito-contador');
        contador.textContent = productosSeleccionados.length;
    }

    // Manejador de eventos para mostrar el modal al hacer clic en el ícono del carrito
    const carritoIcono = document.querySelector('#carroCompras');
    carritoIcono.addEventListener('click', (e) => {
        e.preventDefault();
        const modalProductos = new bootstrap.Modal(document.getElementById('productosModal'));
        modalProductos.show();
    });

    // Manejador de eventos para agregar productos seleccionados al hacer clic en ellos
    document.querySelectorAll('.producto').forEach((producto, index) => {
        producto.addEventListener('click', () => {
            const nombreProducto = producto.getAttribute('data-nombre');
            const imagenProducto = producto.getAttribute('data-imagen');
            productosSeleccionados.push({ id: index, nombre: nombreProducto, imagen: imagenProducto });
            actualizarModal(productosSeleccionados);
            actualizarContador();
        });
    });

    // Función para actualizar el contenido del modal con los productos seleccionados
    function actualizarModal(productos) {
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = '';

        const productosContainer = document.createElement('div');
        productosContainer.classList.add('d-flex', 'flex-wrap', 'justify-content-center', 'gap-3');

        productos.forEach((producto, index) => {
            const productoElement = document.createElement('div');
            productoElement.classList.add('producto-seleccionado', 'position-relative');

            // Crear botón para eliminar producto seleccionado
            const eliminarBtn = document.createElement('div');
            eliminarBtn.classList.add('close');
            eliminarBtn.title = 'Eliminar producto';
            eliminarBtn.innerHTML = '&times;';
            eliminarBtn.style.position = 'absolute';
            eliminarBtn.style.top = '0';
            eliminarBtn.style.right = '0';
            eliminarBtn.style.cursor = 'pointer';
            eliminarBtn.addEventListener('click', () => {
                productosSeleccionados.splice(index, 1);
                actualizarModal(productosSeleccionados);
                actualizarContador();
            });

            // Crear imagen del producto
            const imagenElement = document.createElement('img');
            imagenElement.src = producto.imagen;
            imagenElement.alt = producto.nombre;
            imagenElement.style.width = '100px';

            // Agregar imagen y botón de eliminar al contenedor del producto
            productoElement.appendChild(imagenElement);
            productoElement.appendChild(eliminarBtn);

            // Crear elemento para mostrar el nombre del producto
            const nombreElement = document.createElement('p');
            nombreElement.textContent = producto.nombre;
            productoElement.appendChild(nombreElement);

            // Agregar producto al contenedor de productos
            productosContainer.appendChild(productoElement);
        });

        // Agregar contenedor de productos al cuerpo del modal
        modalBody.appendChild(productosContainer);
    }

    // Manejador de eventos para el botón de "Comprar" en el modal
    document.querySelector('.modal-footer .btn-primary').addEventListener('click', () => {
        const modalBody = document.querySelector('.modal-body');
        // Mostrar mensaje de agradecimiento por la compra
        modalBody.innerHTML = `
            <div class="alert alert-success text-center" role="alert">
                ¡Gracias por su compra! ¡Regrese pronto!
            </div>
        `;
        // Limpiar arreglo de productos seleccionados y actualizar contador
        productosSeleccionados.length = 0;
        actualizarContador();
    });
});
