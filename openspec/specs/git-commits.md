# Git Commits - Flujo y Convenciones

Este spec define cómo deben ayudar los agentes (Claude, Cursor, etc.) cuando una persona pide "quiero un commit" o algo equivalente.

## 1. Estrategia de ramas

### 1.1 Ramas protegidas

Las siguientes ramas se consideran **protegidas**:

- `master`
- `main`
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
- Opción B: "Agregar todo".
- Opción C: "Agregar solo estos paths: …".

El agente **no debe ejecutar `git add` ni cambiar el stage** sin confirmación clara.

## 3. Formato de mensaje de commit (semántico)

Se recomienda usar un formato semántico tipo **Conventional Commits** (adaptado a la cultura del equipo).

### 3.1 Estructura

Formato recomendado:

```text
<tipo>(<scope opcional>): <descripción detallada en presente>

<cuerpo opcional explicando el porqué con el contexto necesario>
```

Tipos más comunes:

- `feat` → nueva funcionalidad.
- `fix` → corrección de bug.
- `chore` → tareas de mantenimiento (build, tooling, etc.).
- `docs` → solo documentación.
- `refactor` → cambios internos sin nuevo comportamiento ni bugfix.
- `test` → solo tests.

### 3.2 Generación de mensaje por el agente

Cuando la persona pida un commit:

1. El agente debe mirar el diff (o al menos un resumen) y proponer 1–2 mensajes candidatos siguiendo el formato anterior.
2. La descripción detallada debería responder "¿qué cambia?" y, si aplica, el "para qué"; el cuerpo (si se usa) profundiza en el "por qué" o el "cómo técnico".
3. Mostrar los mensajes propuestos y pedir confirmación antes de generar el comando final de `git commit`.

Ejemplo:

- Mensaje propuesto:

```text
feat(components): agregar demo card para UI LN

Permite mostrar tarjetas de demo en el área de features/ui, siguiendo los patrones de Fusion.
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

