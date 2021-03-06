# Bsale Test

Este es una aplicación de tienda online para prueba de selección.
Consiste en una lista de productos con opción de búsqueda y filtros.

## Inicio

Para su comenzar, se debe clonar el repositorio usando el comando `git clone https://github.com/mpaulq/shop-test`.

### Instalación

Dentro de la carpeta del proyecto se deben instalar las dependencias:

```
cd shop-test
npm install
```

Usar el archivo `.env.example` para generar las variables de entorno y ajustar la conexión a la base de datos en MySQL.
Para esto se puede usar el comando `cp .env.example .env` y editar el archivo `.env` generado.

Finalmente, ejecutar el servidor con el comando `npm start`.

## Server

La capa del servidor consiste en una API REST con dos rutas:

* Categorías: Envía una consulta tipo GET a la ruta `/categories` y devuelve una lista con los atributos:
    - `id`: Número identificador.
    - `name`: Nombre de la categoría.
    
* Productos: Envía una consulta tipo GET a la ruta `/products`. Esta permite entregarle distintos parámetros de búsqueda:
    - `/products?name={nombre_producto}` filtra los resultados según nombre de producto.
    - `/products?category={id}` filtra los resultados según id de categoría.
    - `/products?discount=true/false` devuelve los productos con o sin descuento.
    - `/products?sort={attr}&order=asc/desc` devuelve ordenados según atributo `attr` y ordena según parámetro `order` con orden ascendente como defecto.
    - `/products?limit={n}&offset={m}` devuelve los primeros `n` elementos, empezando desde el m-ésimo.