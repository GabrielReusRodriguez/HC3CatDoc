#  Visor del catálogo de documentos Hc3 de Catsalut
**Descripción breve**:  Es una aplicación que  permite visualizar el catálogo de documentos HC3 de catsalut así como reqalziar búsquedas y filtrar.

---

## 📌 Contexto
Esta aplicación la usará un técnico informático para corregir los errores que salgan al subir documentos a la Historia Clinica Compartida de Cataluña (HC3 en adelante) corroborando que el tipo de documento subido es el que le corresponde al documento en HC3.

---

## 🛠Requisitos técnicos
- **Lenguaje**: Se ha de hacer en html5 con javascript y css.
- **Librerias**: Todas las librerias han de estar disponibles en ficheros locales.
- **Entorno**: Se ha de poder ejecutar desde ficheros locales, abriendolo con un navegador y sin usar ningún servidor.
- **Datos**: Los datos con las codificaciones se leeran de un fichero excel xlsx.
- **Control de version**: Crea una repositorio git sólo si no existe y ves  haciendo commit de los cambios. 
- No ha de fallar por CORS al descargar cualquier fichero que necesite.

---

## 📦 Estructura del proyecto
```plaintext
/project
├──/data        # Carpeta con el excel de datos.
├──/src         # Carpeta con el código fuente de la aplicación
├──/cfg         # Carpeta con las configuraciones del proyecto
├──README.md    # Documentación principal del proyecto.
    
```

---

## 🔧 Especificaciones funcionales

### 1. Módulo de lectura el excel de datos
**Descripcion**: El módulo encargado de leer el fichero de datos y parsearlo para obtener los datos.
**Entrada**: Un fichero xlsx en el pc del usuario.
**Salida**: un json con los datos leidos.
```json
[
    {
        'codigo': 'code1',
        'nombre_doc': 'descripcion1',
        'agrupador' : 'agrupa1'
    },
    {
        'codigo'        : 'code2',
        'nombre_doc'    : 'descripcion2',
        'agrupador'     : 'agrupador2'
    }
]
```
**Notas**: Los datos que usaremos de la enrada de datos son las columnas 'Codi tipus document', 'Nom tipus document' y  'Agrupador' de la pestaña 'Catàleg definitiu' 

### 2. Módulo de presentación de los datos
**Descripion**: Se encarga de crear la interfaz de usuario y gestionar las interacciones del usuario.
  
---

## 📝 Modelos de Datos
Todos los datos se representarán como strings

---

## 🔍 Reglas de Negocio
- Se ha de mostrar las columnas "Codi tipus document' , 'Nom tipus document' y 'Agrupador'.
- Se ha de poder filtrar por cualesquiera de las 3 columnas.
- Se ha de poder ordenar cualquiera de las 3 columnas.
- Se ha de poder buscar por texto libre y que busque coincidencias completas y parciales en las tres columnas.
- Se ha de paginar los resultados y el usuario ha de poder elegir el número de registros por página.


---

## 📂 Dependencias Externas
Sin restricciones

---


## 📌  Notas Adicionales
 
---
 
