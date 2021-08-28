Este fichero sirve para poder levantar un entorno de desarrollo en el menor tiempo posible.
Para ello necesitaremos comprender como tenemos montado todo.

# Entorno de desarrollo
En este setup usaremos vscode con su feature de devcontainers para inicializar un entorno lo mas rapidamente posible con todos sus plugins y contenedores asociados, aunque por supuesto tambien se puede levantar el entorno a mano usando el archivo de docker-compose en la ruta _.devcontainer/docker-compose.yml_ y las utilidades necesarias.

El proyecto en su nivel de desarrollo consta fundamentalmente de dos procesos separados para cada una de las funcionalidades de la aplicacion.

# Backend
## Server
Tenemos la parte servidor con node.js.

El backend tiene dos funciones principalmente:

- Exponer una api.
- Servir el codigo frontend al cliente.

Todas aquellas llamadas que no comiencen por /api seran redirigidas al servidor de webpack que respondera con el codigo cliente.

Para levantar el servidor usaremos _nodemon_, que nos permitira escuchar los cambios del codigo en tiempo real hay que ejecutar el siguiente comando:
```NODE_ENV=development nodemon express.js```
## Database
Bueno, no hay mucho misterio aqui. Una base de datos sencilla para persistir informacion.
Para inicializarla usaremos la utilidad de migraciones knex.

Para ello, dentro de la carpeta db del proyecto correremos el comando ```npx knex migrate:latest```

# Frontend
La parte de frontend está hecha con la librería de React, la cual tiene implementada tambien la parte de navegación con react-router.

Para levantar el servidor que compila el codigo cliente, usaremos el comando ```webpack-dev-server --config=configs/webpack/dev.js``` 


