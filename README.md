# Ramos SVG
Generador de la malla que permitirá
visualizar los ramos aprobados.

## Aportar

Para aportar, en la carpeta `data` se tienen dos ficheros por cada
carrera, estos son  `data_CARR.json` y `colors_CARR.json`. Se deben
crear ambos jsons (se pueden usar los existentes como base) para agregar
una carrera a la malla interactiva.

Un ejemplo de un semestre en `data_CARR.json` sería:

```json
"s2": [
      ["Química y Sociedad","QUI-010",3,"PC"],
      ["Pre-cálculo","MATE11",3,"PC",["MATE10"]],
      ["Álgebra lineal","MATE20",3,"PC",["MATE10"]],
      ["Administración de empresas","ICS001",3,"ICOM",["IWG-101"]],
      ["Inglés Básico","HCW319",2,"HUM"],
      ["Humanístico I","HRW1",2,"HUM"],
      ["Educación Física II","DEW-101",1,"HUM",["DEW-100"]]
   ]
```
Para modificar el JSON se debe saber lo siguiente:

`s2` Corresponde al semestre, en este caso, Semestre II. Es una lista con 5 objetos:
1. *Ramo*: El nombre completo del ramo.
2. *Sigla*: Sigla del ramo. Este campo es importante, ya que con éstos se calculan los prerrequisitos.
3. *Créditos*: Entero, la cantidad de créditos.
4. *Sector*: Sector del ramo al que pertenece (por ejemplo, *PC*: Plan Común), se deben agregar ó editar en el json `colors_CARR.json`.
5. *Prerrequisitos*: Una lista de strings que contiene los prerrequisitos del ramo. Es **importante**
que la sigla ya exista, de lo contrario podría fallar. Esta lista es opcional.

El json `colors_CARR.json` debe tener el formato

```json
{
	"SIGLA": ["COLOR", "pequeña descripcion"],
}
```

Ejemplo:

```json
{
	"PC": ["#00838F", "Plan Común"],
	...
}
```

## Probar malla
Para probar la malla, se tiene que abrir el `index.html` con **Firefox** (debido a que los otros navegadores tienen
desactivada la lectura de archivos locales por defecto), y al final de la URL agregar `?m=CARR`. Por ejemplo, 
para abrir `data_ICOM05.json` debería quedar algo como `index.html?m=ICOM05`.

Se aceptan Pull Requests para agregar carreras.

---
# Gracias

Se agradece especialmente a:
* Sebastián Aedo por crear esta maravilla
* Fernando Cardenas por agregar la malla de ICOM 05
* Daniel Torres por agregar la malla de ICOM 06 y retomarla para Ingeniería Comercial USM CC
* La malla interactiva original (con más carreras) contiene nuevos elementos, pero considero que lo minimalista es mejor :B
