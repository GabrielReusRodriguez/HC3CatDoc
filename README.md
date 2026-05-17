# Visor del catàleg de documents HC3 de Catsalut

Aplicació per visualitzar i cercar el catàleg de documents HC3 de Catsalut.

## Requisits
- Navegador web modern
- Docker (opcional, per executar localment amb nginx)

## Instal·lació

### Opció 1: Executar directament des del navegador
1. Obriu el fitxer `src/index.html` amb el vostre navegador
2. Seleccioneu el fitxer CSV amb les dades

### Opció 2: Executar amb Docker
1. Construïu la imatge: `docker-compose build`
2. Inicieu el contenidor: `docker-compose up`
3. Obriu `http://localhost:8080` al navegador

## Funcionalitats
- Visualització de les dades en format taula
- Cerca per text lliure
- Filtrat per columnes
- Ordenació per columnes
- Paginació de resultats
- Neteja de filtres

## Estructura del projecte
```
/project
├──/data                    # Dades CSV
├──/src                     # Codi font
├──/cfg                     # Configuracions
├──/docker                  # Fitxers Docker
└──README.md                # Documentació
```