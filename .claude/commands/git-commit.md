---
name: "Git: Commit"
description: Guiar la creación de commits semánticos en la rama correcta siguiendo el spec de git-commits.
category: Git
tags: [git, commit, workflow]
---

Guía para ayudar cuando la persona dice "quiero un commit" o pide ayuda para commitear cambios.

**Referencia principal**: `openspec/specs/git-commits.md`

## Cuándo usar este comando

Usar cuando:

- La persona diga "quiero un commit" o algo similar.
- La persona pida ayuda para escribir el mensaje de commit.
- La persona no esté segura de qué debe entrar en el commit.

## Flujo que debe seguir el agente (resumen)

Sigue siempre las reglas detalladas en `openspec/specs/git-commits.md`. En resumen:

1. **Detectar rama actual y ramas protegidas**
   - Si la rama actual es `master`, `main`, `develop` o `sandbox`:
     - Explicar que es una rama protegida.
     - Sugerir crear una rama de trabajo (ej. `feat/<slug>`, `fix/<slug>`, `chore/<slug>`).
     - Proponer 1–2 nombres de rama en base a la descripción del cambio y pedir confirmación.

2. **Aclarar el alcance del commit**
   - Preguntar si se debe:
     - Usar solo lo que ya está en stage.
     - Agregar todos los cambios del working directory.
     - O agregar solo ciertos paths/patrones.
   - No ejecutar `git add` sin una respuesta clara.

3. **Generar mensaje de commit semántico**
   - Revisar el diff (o un resumen) y proponer 1–2 mensajes en formato:
     - `<tipo>(<scope opcional>): <descripción corta>`
   - Usar tipos como `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.
   - Explicar brevemente el porqué en el cuerpo si aporta valor.
   - Pedir a la persona que elija o ajuste el mensaje.

4. **Proponer los comandos concretos**
   - Mostrar el/los comandos que se ejecutarían, por ejemplo:
     - `git add ...` (si corresponde).
     - `git commit -m "..."`.
   - No ejecutar `git commit` sin confirmación explícita de la persona.

5. **Siguiente paso opcional**
   - Si el commit se hace en una rama de feature y todo está bien:
     - Sugerir `git push -u origin <branch>` (primer push) o `git push` si ya existe.

## Guardrails

- No modificar `git config`.
- No usar `git push --force` salvo que la persona lo pida explícitamente y entienda el riesgo.
- No crear commits en ramas protegidas sin advertirlo y recibir confirmación clara.
- Tener cuidado de no incluir archivos sensibles (.env, credenciales, dumps de datos) sin confirmación.
- Siempre mostrar los comandos sugeridos antes de ejecutarlos.

