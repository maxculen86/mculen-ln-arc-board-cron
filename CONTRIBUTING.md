# Contributing to Arc XP Contenidos

> Guía para contribuir al proyecto Arc XP Fusion de LN

## Antes de empezar

1. **Lee el contexto del proyecto**
   - [AGENTS.md](./AGENTS.md) - Contexto general para agentes AI
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Decisiones arquitectónicas
   - `openspec/specs/` - Especificaciones técnicas (SSOT)

2. **Verifica tu entorno**
   ```bash
   node -v  # v18.x LTS
   npm -v   # v9.x+
   ```

## Workflows

### Cambios estructurados (features, refactors, migraciones)

Usa **OpenSpec** para cambios que requieren planificación:

```bash
/opsx:new [nombre-del-cambio]     # Crear nuevo change
/opsx:continue                     # Crear siguiente artifact (proposal → design → specs → tasks)
/opsx:apply                        # Implementar tasks
/opsx:verify                       # Verificar implementación
/opsx:archive                      # Archivar change completado
```

**Flujo de artifacts**: proposal → design → specs → tasks

Más info: `openspec/README.md`

### Tareas rápidas (componente nuevo, fix pequeño, update lib)

Usa **atajos Fusion**:

```bash
/fusion-component [name]    # Crear componente siguiendo patrones
/fusion-debug [issue]       # Debug build/runtime
/fusion-update-libs [lib]   # Update dependencia
```

Ver: `.cursor/rules/arcxp-openspec-fusion-workflows.mdc`

## Flujo de trabajo con Git

### 1. Crear rama desde master

```bash
git checkout master
git pull origin master
git checkout -b tipo/descripcion-corta
```

Tipos de rama: `feature/`, `fix/`, `chore/`, `docs/`

### 2. Commits semánticos

Usa `/git-commit` o sigue `openspec/specs/git-commits.md`:

```
tipo(scope): descripción corta en presente

Detalle del cambio explicando el "por qué".

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

Tipos: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`

### 3. Pull Request

```bash
# Asegúrate de que tu branch esté actualizado
git pull origin master --rebase

# Push a remote
git push -u origin tipo/descripcion-corta

# Crear PR (con gh CLI o UI de GitHub)
gh pr create --title "tipo: descripción" --body "## Summary\n..."
```

## Verificación local

Antes de hacer commit/PR:

```bash
# Build (verifica sintaxis y compilación)
npm run build-dev

# Tests específicos (NO ejecutar suite completa en IDE)
npm test -- [nombre-archivo-o-suite]

# Ejemplo:
npm test -- processLayoutItems  # si modificaste processLayoutItems.js
```

Ver: `MEMORY.md` para preferencias de testing.

## Reglas de código

### Componentes Fusion

- **Patrón consumer/presenter**: Features usan este patrón (ver `openspec/specs/fusion-components.md`)
- **Imports Fusion**: Usa `fusion:consumer`, `fusion:content`, etc.
- **Reutilizar primero**: Revisa `openspec/specs/common-ui-libs.md` antes de crear UI nueva
- **Separación multi-site**: Componentes de la-nacion-ar y foodit claramente separados

### Estilo

- Prettier + ESLint (Airbnb + Prettier)
- Single quotes, sin trailing commas
- Indent de 4 espacios en JSX
- Hooks empiezan con `use` (ej. `useBookmark`)

### Guardrails críticos

**NUNCA modificar sin aprobación explícita:**
- `.fusion/` (managed by Arc XP)
- `components/output-types/` (SEO/performance critical)

**Multi-site:**
- `default.jsx` = solo la-nacion-ar
- `foodit.jsx` = solo foodit
- Mantener componentes separados por site

## Recursos

- [Arc XP Developer Center](https://arcxp.com/developers)
- [Fusion Documentation](https://arcxp.com/developers/fusion)
- Specs internas: `openspec/specs/`
- Templates: `.claude/templates/fusion/`

## Dudas o problemas

1. Revisa specs en `openspec/specs/`
2. Consulta con el equipo en Slack
3. Abre un issue en GitHub con contexto completo
