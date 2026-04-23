# Git Commits - Flujo y Convenciones

Este spec define cómo deben ayudar los agentes (Claude, Cursor, etc.) cuando una persona pide "quiero un commit" o algo equivalente.

## 0. Toolchain de commits del proyecto

El proyecto usa las siguientes herramientas — los agentes deben tenerlas en cuenta al sugerir commits:

| Herramienta | Versión | Rol |
|---|---|---|
| **commitizen** (`cz-conventional-changelog`) | 4.3.1 | CLI interactiva para redactar commits (`npm run commit` / `cz`) |
| **commitlint** (`@commitlint/config-conventional`) | — | Valida el formato del mensaje en cada commit vía husky |
| **husky** | — | Ejecuta `commitlint` en el hook `commit-msg` |

### Flujo recomendado para el usuario

```bash
npm run commit   # lanza cz → guía interactiva → commitlint valida automáticamente
```

Los agentes **no deben sugerir `git commit -m "..."` directamente** salvo que la persona lo prefiera explícitamente, ya que saltea la guía interactiva de commitizen. En ese caso, el mensaje debe igualmente cumplir el formato de `@commitlint/config-conventional` o husky lo rechazará.

### Formato que acepta commitlint (`@commitlint/config-conventional`)

```
<tipo>(<scope opcional>): <descripción en minúsculas>

<cuerpo opcional>

<footer opcional>
```

Reglas:
- La descripción **no debe terminar en punto**.
- El tipo y la descripción van **en minúsculas**.
- El cuerpo y el footer se separan del encabezado con una línea en blanco.
- **Máximo 100 caracteres por línea** (encabezado, cuerpo y footer) — commitlint rechaza mensajes que superen este límite.
- Los **mensajes deben escribirse en español** (convención del equipo).
- Usar **infinitivo** en la descripción: "agregar", "corregir", "refactorizar" (opción principal). Como alternativa también se acepta **presente de indicativo**: "agrega", "corrige", "refactoriza". Ambas son convenciones hispanohablantes válidas para Conventional Commits; lo importante es ser consistente dentro del proyecto.

**Tipos válidos**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`.

## 1. Estrategia de ramas

### 1.1 Ramas protegidas

Las siguientes ramas se consideran **protegidas**:

- `master`
- `develop`
- `sandbox`

**Regla**:  
Los agentes **no deben crear commits directamente** en estas ramas, salvo que la persona lo pida explícitamente y entienda el riesgo.

### 1.2 Crear rama de trabajo

Si la persona está en una rama protegida y pide un commit:

1. Informar que la rama actual es protegida.
2. Sugerir crear una rama de trabajo desde la rama actual, con un nombre convencional:
   - `feat/<slug>` para features nuevas.
   - `fix/<slug>` para bugfixes.
   - `chore/<slug>` para tareas de mantenimiento.
3. Proponer 1–2 nombres de ejemplo en base a la descripción del cambio.
4. Una vez confirmada la rama, sugerir el comando:

```bash
git checkout -b feat/mi-cambio
```

(ajustando el prefijo y el slug).

## 2. Alcance del commit (qué entra)

Cuando la persona diga "quiero un commit", **no asumir** el alcance. El agente debe aclarar:

- ¿Usar **solo lo que ya está en stage**?
- ¿Agregar **todos los cambios** del working directory?
- ¿Agregar **solo algunos paths/patrones** (ej. `components/...`, `content/...`)?

### 2.1 Preguntas mínimas

Si la persona no especifica nada, el agente debe preguntar explícitamente algo equivalente a:

- "¿Quieres commitear **solo lo que ya está en stage**, o **agrego también cambios nuevos**?"

Y si la respuesta es ambigua, sugerir:

- Opción A: "Solo lo que está en stage".
- Opción B: "Agregar todo"
- Opción C: "Agregar solo estos paths: …".

El agente **no debe ejecutar `git add` ni cambiar el stage** sin confirmación clara.

## 3. Formato de mensaje de commit (semántico)

El proyecto usa **Conventional Commits** validado por `commitlint`. Ver sección 0 para el formato exacto y las reglas.

### 3.1 Generación de mensaje por el agente

Cuando la persona pida un commit:

1. Mirar el diff (o al menos un resumen) y proponer 1–2 mensajes candidatos en español, siguiendo el formato de la sección 0.
2. La descripción debe responder "¿qué cambia?" y, si aplica, el "para qué"; el cuerpo (si se usa) profundiza en el "por qué" o el "cómo técnico".
3. Mostrar los mensajes propuestos y pedir confirmación antes de generar el comando.
4. **Recordar** que el flujo recomendado es `npm run commit` — solo proponer `git commit -m` si la persona lo prefiere explícitamente.

Ejemplo:

```text
feat(header): agregar variante negativa con soporte de tokens del DS

Refactorizar useHeader, estilos y subcomponentes para consumir tokens del
design system. Eliminar logo.jsx legacy en favor del Logo.jsx actualizado.
Agregar tests unitarios para useHeader cubriendo la nueva variante.
```

## 4. Flujo completo cuando la persona dice "quiero un commit"

Cuando el usuario pida "quiero un commit", el agente debe seguir este flujo general:

1. **Detectar rama actual**
   - Si es rama protegida → aplicar sección 1.2 y sugerir crear rama de trabajo.
2. **Aclarar alcance del commit**
   - Preguntar explícitamente si debe usar solo lo que ya está en stage o si hay que agregar más cambios.
   - Si la persona pide "todo", proponer el comando `git add .` o variantes más específicas (por ejemplo, solo ciertos paths).
3. **Generar mensaje semántico**
   - Analizar los cambios y proponer 1–2 commits candidatos en formato semántico.
   - Pedir a la persona que elija o ajuste el mensaje.
4. **Proponer comando(s) finales**
   - Sugerir el comando exacto de commit, por ejemplo:

```bash
git commit -m "feat(components): agregar demo card para UI LN"
```

   - En entornos donde el agente puede ejecutar comandos, **no ejecutar `git commit` sin confirmación explícita**.
5. **(Opcional) Sugerir siguiente paso**
   - Si es una rama de feature y el commit es aprobado, sugerir:
     - `git push -u origin <branch>` si es el primer push.
     - O solo `git push` si la rama ya está publicada.

## 5. Guardrails

Los agentes que implementen este spec deben respetar:

- **No modificar la configuración de Git** (`git config`).
- **No forzar push** (`git push --force`) salvo indicación explícita de la persona.
- **No crear commits en ramas protegidas** sin advertirlo y recibir una confirmación clara.
- **No incluir archivos potencialmente sensibles** (por ejemplo `.env`, credenciales, dumps de datos) sin confirmación explícita.
- Ser transparentes: siempre mostrar al usuario los comandos que sugieren antes de ejecutarlos (si es que los ejecutan).

