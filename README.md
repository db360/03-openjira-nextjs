## Next.js Da.B Open Jira App

Para iniciar localmente, se necesita la base de datos

```docker-compose up -d```

* -d = __detached__

* MongoDB URL LOCAL:

```mongodb://localhost:27017/entriesdb```

* Reconstruir los modulos de nodes
```yarn install```
* iniciar el servidor web en modo development
```yarn dev```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

## Configurar los datos de la BD con informacion de prueba

```http://localhost:3000/api/seed```