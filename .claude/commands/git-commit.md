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
     - Advertir que es una rama protegida.
     - Sugerir crear una rama de trabajo (ej. `feat/<slug>`, `fix/<slug>`, `chore/<slug>`).
     - Proponer 1–2 nombres de rama y pedir confirmación antes de continuar.

2. **Revisar cambios y generar commit semántico**
   - Ejecutar `git status` y `git diff` para analizar cambios.
   - Determinar automáticamente:
     - Si hay staged changes: usar esos.
     - Si solo hay unstaged changes: agregar los archivos modificados relevantes.
   - Generar mensaje semántico detallado en formato:
     - `<tipo>(<scope opcional>): <descripción corta>`
     - Usar tipos: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`.
     - Agregar cuerpo del commit si el cambio necesita contexto adicional.

3. **Ejecutar commit directamente**
   - Ejecutar `git add` de los archivos necesarios (si corresponde).
   - Ejecutar `git commit` con el mensaje generado usando formato HEREDOC:
     ```bash
     git commit -m "$(cat <<'EOF'
     <tipo>(<scope>): <descripción>

     <cuerpo opcional con contexto>

     Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
     EOF
     )"
     ```
   - Mostrar el resultado del commit.

4. **Siguiente paso opcional**
   - Si el commit se hace en una rama de feature y todo está bien:
     - Sugerir `git push -u origin <branch>` (primer push) o `git push` si ya existe.

## Guardrails

- No modificar `git config`.
- No usar `git push --force` salvo que la persona lo pida explícitamente y entienda el riesgo.
- **CRÍTICO**: No crear commits en ramas protegidas (master/main/develop/sandbox) sin advertir y recibir confirmación explícita.
- No incluir archivos sensibles (.env, credenciales, dumps de datos, node_modules) en commits.
- Excluir archivos no relacionados del commit (usar `git add` selectivo, no `git add .` o `git add -A`).
- Siempre usar formato HEREDOC para mensajes de commit multi-línea.
- Incluir co-author de Claude en todos los commits.

