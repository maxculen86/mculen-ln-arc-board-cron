#!/bin/bash
output_file="resources/packages/css/homeln10-style.css"

> "$output_file"

for dir in resources/packages/css/@ln/*contenidos* resources/packages/css/@ln/*common*; do
  if [ -d "$dir" ]; then
    for file in "$dir"/*.css; do
      if [ -f "$file" ]; then
        cat "$file" >> "$output_file"
      fi
    done
  fi
done
