# Consideraciones al realizar test e2e

## Distribucion de carpetas

-   Los tests ubicados en la carpeta _preRelease_ se ejecutaran **ANTES** de realizar el **PROMOTE** del bundle en Arc, y antes de que las configuraciones en page builder sean realizadas (si es que existieran cambios), por ende, solo deben colocarse tests en esta carpeta que funcionen correctamente con la configuracion **ACTUAL** de page builder.
-   Los tests ubicados en la carpeta _posRelease_ se ejecutaran una vez **PROMOVIDO** el bundle, y aprobado el paso manual que da lugar a realizar las configuraciones necesarias en page builder.
-   Si algun componente es modificado y ya tenia un test en preRelease, y a partir de esa modificacion, necesita un cambio de configuracion en page builder, el test debe moverse a la carpeta _posRelease_.
-   Si los tests de _preRelease_ + _posRelease_ se ejecutan correctamente al final del CD, los tests de _posRelease_ seran movidos a _preRelease_. Por este motivo, **NO SE DEBEN REPETIR LOS NOMBRES DE ARCHIVOS entre ambas carpetas**.
-   Tener en cuenta que, luego de que sucediera lo anterior, posiblemente se requiera un refactor del test movido, con el fin de optimizar el mismo y seguir las premisas a continuacion.

## Premisas de desarrollo

-   Se recomienda unificar los tests bajo una misma url en un mismo archivo de tests, con el fin de minimizar la cantidad de requests y asi el tiempo de ejecucion total de los tests.
-   En lo posible, realizar el _goto()_ a la url en el _beforeAll()_ de jest, asignando el frame de respuesta a una variable, y utilizando la misma en los distintos tests subsiguientes.
-   Ej: Si tengo varias cosas a chequear en nota-noticia, hago el request a la nota de prueba en el _beforeAll()_, y luego hago N _test()_ de jest usando el frame obtenido
