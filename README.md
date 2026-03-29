# Visor del catálogo de documentos HC3 de Catsalut

Esta aplicación permite visualizar el catálogo de documentos HC3 de Catsalut, realizar búsquedas y filtrar los datos.

## Estructura del proyecto
```plaintext
/project
├──/data        # Carpeta con el excel de datos.
├──/src         # Carpeta con el código fuente de la aplicación
├──/cfg         # Carpeta con las configuraciones del proyecto
├──README.md    # Documentación principal del proyecto.
```

## Requisitos técnicos
- **Lenguaje**: HTML5 con JavaScript y CSS.
- **Librerías**: Todas las librerías están disponibles en ficheros locales.
- **Entorno**: Se puede ejecutar desde ficheros locales, abriéndolo con un navegador y sin usar ningún servidor.
- **Datos**: Los datos con las codificaciones se leen de un fichero excel xlsx.

## Especificaciones funcionales
1. **Módulo de lectura del excel de datos**: Lee el fichero de datos y parsea los datos.
2. **Módulo de presentación de los datos**: Crea la interfaz de usuario y gestiona las interacciones del usuario.

## Reglas de Negocio
- Se muestran las columnas "Codi tipus document", "Nom tipus document" y "Agrupador".
- Se puede filtrar por cualquiera de las 3 columnas.
- Se puede ordenar cualquiera de las 3 columnas.
- Se puede buscar por texto libre y que busque coincidencias completas y parciales en las tres columnas.
- Se pagan los resultados y el usuario puede elegir el número de registros por página.

## Dependencias Externas
Sin restricciones.

