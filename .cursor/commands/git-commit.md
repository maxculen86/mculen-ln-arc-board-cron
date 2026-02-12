---
name: /git-commit
id: git-commit
category: Git
description: Asiste en la creación de commits semánticos en la rama correcta siguiendo el spec de git-commits.
---

Asiste cuando la persona dice "quiero un commit" o pide ayuda para commitear cambios, siguiendo el spec `openspec/specs/git-commits.md`.

**Referencia principal**: `openspec/specs/git-commits.md`

## Flujo

1. **Detectar rama actual**

   - Ejecutar `git rev-parse --abbrev-ref HEAD` para obtener el nombre de la rama.
   - Si la rama es `master`, `main`, `develop` o `sandbox`:
     - Explicar que es una rama protegida.
     - Preguntar si quiere crear una rama nueva desde ahí.
     - Proponer nombres convencionales (`feat/<slug>`, `fix/<slug>`, `chore/<slug>`) en base a la descripción del cambio.
     - Sugerir el comando:

       ```bash
       git checkout -b feat/mi-cambio
       ```

       (ajustando el nombre).

2. **Aclarar el alcance del commit**

   - Preguntar explícitamente:
     - Si debe usarse solo lo que ya está en stage.
     - O si se deben agregar más cambios (y cuáles).
   - Si la persona quiere "todo":
     - Sugerir `git add .` o, preferiblemente, paths más específicos si se conocen.
   - No modificar el stage (`git add` / `git reset`) sin una confirmación clara.

3. **Analizar cambios y proponer mensaje semántico**

   - Obtener un resumen de cambios con:

     ```bash
     git status --short
     git diff --stat
     ```

   - Opcionalmente, inspeccionar diffs más detallados de archivos clave.
   - Proponer 1–2 mensajes de commit en formato:

     ```text
     <tipo>(<scope opcional>): <descripción corta en presente>
     ```

     usando tipos como `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.

   - Si aporta valor, proponer también un cuerpo de mensaje que explique el "por qué" o el "cómo".
   - Pedir a la persona que confirme o ajuste el mensaje.

4. **Proponer comandos finales (sin ejecutarlos por defecto)**

   - Construir el/los comandos sugeridos:

     ```bash
     git commit -m "feat(components): agregar demo card para UI LN"
     ```

   - Mostrar los comandos propuestos y pedir confirmación antes de cualquier ejecución.
   - En general, este comando debe centrarse en **proponer** y dejar que la persona ejecute, salvo que explícitamente pida que se ejecuten.

5. **Siguientes pasos opcionales**

   - Si el commit resultó exitoso y la rama no está publicada:

     ```bash
     git push -u origin <branch>
     ```

   - Si la rama ya existe en remoto:

     ```bash
     git push
     ```

   - Solo sugerir `git push`, no ejecutarlo sin una petición clara.

## Guardrails

- No modificar `git config`.
- No usar `git push --force` salvo petición explícita y consciente.
- No crear commits en `master`, `main`, `develop` o `sandbox` sin advertirlo y tener confirmación clara.
- Evitar incluir archivos sensibles (.env, credenciales, dumps) sin confirmación.
- Siempre ser transparente: mostrar los comandos y el mensaje de commit propuesto antes de que la persona actúe.

