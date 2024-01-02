#!/bin/bash

src_dir="./src/statics"
out_dir="./resources/js"

# Recorre todas las carpetas dentro de ./src/
for folder in "$src_dir"/*; do
  # Verifica si es un directorio
  if [ -d "$folder" ]; then
    # Obtiene el nombre de la carpeta
    folder_name=$(basename "$folder")

    # Construye la ruta de entrada y salida
    input_dir="$folder"
    output_dir="$out_dir/$folder_name"

    # Crea el directorio de salida si no existe
    mkdir -p "$output_dir"

    # Ejecuta esbuild para cada carpeta
    esbuild "$input_dir/**/*.js" --bundle --minify --outdir="$output_dir"

    # Renombra los archivos de salida
    for file in "$output_dir"/*.js; do
      if [[ "$file" != *".min.js" ]]; then
        mv "$file" "${file%.js}.min.js"
      fi
    done
  fi
done
