# Herramientas de IA para trabajar en ARC

Resumen de las herramientas, configuraciones y automatizaciones que usamos
diariamente para investigar, implementar, revisar y validar cambios en el
repositorio de ARC.

> **Alcance:** este documento describe la configuración verificada en agosto de
> 2026. Las rutas bajo `~/.config/opencode` corresponden a la configuración
> global de cada desarrollador y no forman parte necesariamente del repositorio.

## Mapa rápido

| Área | Herramienta | Propósito |
| --- | --- | --- |
| Editor/agente | [OpenCode](https://github.com/anomalyco/opencode) | Interfaz principal para trabajar con modelos, tools, agentes y plugins. |
| Memoria | [Engram](https://github.com/Gentleman-Programming/engram) | Memoria persistente entre sesiones, recuperación después de compactación y registro de decisiones. |
| Inteligencia de código | CodeGraph | Mapa AST/simbólico del repositorio, referencias, call paths e impacto de cambios. |
| Protocolo de herramientas | [MCP](https://modelcontextprotocol.io/) | Conecta OpenCode con Azure DevOps, navegador, Engram y otros servicios. |
| Gestión del trabajo | [Azure DevOps](https://azure.microsoft.com/products/devops) | Work Items, ramas, builds, logs, PRs, tests y validación de sandbox. |
| Especificación | [OpenSpec](https://github.com/Fission-AI/OpenSpec) | Artefactos de cambio: propuesta, spec, diseño, tasks, implementación, verificación y archivo. |
| Navegador | [Playwright](https://playwright.dev/) | QA de UI, sandbox, demos, Composer y validaciones de comportamiento. |
| Calidad | SonarQube MCP | Gate de calidad y análisis estático antes de entregar cambios. |

## OpenCode y configuración global

OpenCode funciona como el host de la automatización. En nuestra configuración
se combinan:

- Agentes primarios para orquestar el trabajo.
- Subagentes especializados por fase o tipo de revisión.
- Plugins que interceptan mensajes, eventos y ejecución de tools.
- Skills que cargan instrucciones específicas según el contexto.
- MCP servers para acceder a sistemas externos.
- Perfiles de modelos con fallback por fase.

Archivos de referencia locales:

- Configuración global: [`~/.config/opencode/opencode.json`](file:///home/mculen/.config/opencode/opencode.json)
- Plugins globales: [`~/.config/opencode/plugins/`](file:///home/mculen/.config/opencode/plugins/)
- Comandos SDD: [`~/.config/opencode/commands/`](file:///home/mculen/.config/opencode/commands/)
- Perfiles SDD: [`~/.config/opencode/profiles/`](file:///home/mculen/.config/opencode/profiles/)
- Instrucciones globales: [`~/.config/opencode/AGENTS.md`](file:///home/mculen/.config/opencode/AGENTS.md)
- Configuración específica del proyecto: [`AGENTS.md`](../AGENTS.md)
- Skills y reglas de ARC: [`.claude/skills/`](../.claude/skills/)

Plugins externos declarados en la configuración global:

- [`@tarquinen/opencode-dcp`](https://www.npmjs.com/package/@tarquinen/opencode-dcp): poda dinámica del contexto.
- [`@openspoon/subtask2`](https://www.npmjs.com/package/@openspoon/subtask2): mejora del retorno de tareas delegadas.
- [`opencode-supermemory`](https://www.npmjs.com/package/opencode-supermemory): integración externa de memoria.
- [`@zenobius/opencode-skillful`](https://www.npmjs.com/package/@zenobius/opencode-skillful): carga y descubrimiento de skills.

Dependencias auxiliares instaladas globalmente incluyen el SDK de plugins de
OpenCode, autenticación Antigravity, gestión de Engram para SDD y statusline de
subagentes. La lista exacta está en
[`~/.config/opencode/package.json`](file:///home/mculen/.config/opencode/package.json).

## Engram: memoria persistente

Engram evita que el conocimiento de trabajo desaparezca al cerrar una sesión o
compactar el contexto. El plugin de OpenCode conecta eventos con un servidor
local HTTP y SQLite:

```text
OpenCode -> plugin engram.ts -> engram serve -> SQLite
```

Se usa para:

- Buscar decisiones, descubrimientos y bugs anteriores.
- Guardar decisiones de arquitectura y preferencias del equipo.
- Recuperar contexto al iniciar una sesión.
- Persistir resúmenes antes de cerrar una sesión.
- Mantener trazabilidad de los artefactos SDD.

Referencias:

- Repositorio: [Gentleman-Programming/engram](https://github.com/Gentleman-Programming/engram)
- Plugin local: [`~/.config/opencode/plugins/engram.ts`](file:///home/mculen/.config/opencode/plugins/engram.ts)
- Puerto local por defecto: `7437`

## Skills del repositorio

Las skills son instrucciones operativas que se cargan según el tipo de tarea.
No son simples prompts: definen gates, orden de investigación, validaciones,
herramientas permitidas y criterios de entrega.

### Skills base de ARC

- [`arc-xp`](../.claude/skills/arc-xp/SKILL.md): estándares generales del proyecto.
- [`arc-xp-ui`](../.claude/skills/arc-xp-ui/SKILL.md): componentes y PageBuilder.
- [`arc-xp-api`](../.claude/skills/arc-xp-api/SKILL.md): Content Sources, Resolvers y APIs.
- [`arc-xp-provider`](../.claude/skills/arc-xp-provider/SKILL.md): proveedores e integraciones externas.
- [`arc-xp-build`](../.claude/skills/arc-xp-build/SKILL.md): build system y asset pipeline.
- [`arc-xp-compliance`](../.claude/skills/arc-xp-compliance/SKILL.md): revisión de arquitectura y cumplimiento.
- [`arc-xp-docs`](../.claude/skills/arc-xp-docs/SKILL.md): documentación técnica.

### Skills de operación y QA

- [`azure-devops`](../.claude/skills/azure-devops/SKILL.md): integración con Azure DevOps.
- [`sandbox-demo-qa`](../.claude/skills/sandbox-demo-qa/SKILL.md): demos y validación en sandbox.
- [`arc-xp-local-qa`](../.claude/skills/arc-xp-local-qa/SKILL.md): QA local.
- [`composer-customembeds-qa`](../.claude/skills/composer-customembeds-qa/SKILL.md): Composer y CustomEmbeds.
- [`arc-xp-test-ui`](../.claude/skills/arc-xp-test-ui/SKILL.md): pruebas de UI.
- [`arc-xp-test-api`](../.claude/skills/arc-xp-test-api/SKILL.md): pruebas de APIs y resolvers.
- [`arc-xp-test-sdk`](../.claude/skills/arc-xp-test-sdk/SKILL.md): pruebas de lógica interna y SDK.
- [`arc-xp-test-regression`](../.claude/skills/arc-xp-test-regression/SKILL.md): regresión.

### Skills de disciplina de trabajo

- [`brainstorming`](../.claude/skills/brainstorming/SKILL.md): explorar requisitos antes de crear comportamiento.
- [`systematic-debugging`](../.claude/skills/systematic-debugging/SKILL.md): investigar causa raíz antes de corregir bugs.
- [`senior-architect`](../.claude/skills/senior-architect/SKILL.md): criterios de arquitectura y diseño.
- [`judgment-day`](../.claude/skills/judgment-day/SKILL.md): revisión adversarial doble.
- [`work-unit-commits`](../.claude/skills/work-unit-commits/SKILL.md): organizar cambios revisables.

## Agentes y orquestadores

El orquestador mantiene el hilo de conversación y delega el trabajo real a
subagentes especializados. En ARC se usan agentes para:

- Explorar el código y entender el impacto.
- Crear propuesta, especificación, diseño y tasks.
- Implementar cambios.
- Ejecutar verificación y QA.
- Revisar riesgo, confiabilidad, resiliencia y legibilidad.
- Refutar o confirmar hallazgos de revisiones.

El flujo SDD habitual es:

```text
init -> explore -> propose -> spec -> design -> tasks -> apply -> verify -> archive
```

También existen comandos para continuar, consultar estado, hacer fast-forward y
realizar onboarding.

Configuración y comandos:

- Agentes del proyecto: [`.claude/agents/`](../.claude/agents/)
- Agentes globales de OpenCode: [`~/.config/opencode/opencode.json`](file:///home/mculen/.config/opencode/opencode.json)
- Prompts SDD: [`~/.config/opencode/prompts/sdd/`](file:///home/mculen/.config/opencode/prompts/sdd/)
- Comandos: [`~/.config/opencode/commands/`](file:///home/mculen/.config/opencode/commands/)

## Perfiles de modelos y fallback

La configuración separa la estrategia de modelos del flujo SDD:

| Perfil | Uso |
| --- | --- |
| `premium` | Máxima capacidad para trabajo crítico y decisiones complejas. |
| `mixto` | Balance entre calidad, costo y disponibilidad. |
| `free` | Experimentación y trabajo sin costo de proveedor premium. |

El plugin `sdd-arcsdd-profile-loader` carga el perfil seleccionado y genera
agentes fallback. Ante errores recuperables como `429`, timeout, sobrecarga o
`503`, puede reintentar la fase con el modelo alternativo.

El plugin `sdd-model-router` descubre proveedores disponibles y calcula rutas
por rol y lane usando `benchmark-policy.json`, sin tocar credenciales.

Referencias:

- [`sdd-premium-arcsdd.json`](file:///home/mculen/.config/opencode/profiles/sdd-premium-arcsdd.json)
- [`sdd-mixto-arcsdd.json`](file:///home/mculen/.config/opencode/profiles/sdd-mixto-arcsdd.json)
- [`sdd-free-arcsdd.json`](file:///home/mculen/.config/opencode/profiles/sdd-free-arcsdd.json)
- [`sdd-model-router.ts`](file:///home/mculen/.config/opencode/plugins/sdd-model-router.ts)
- [`sdd-arcsdd-profile-loader.ts`](file:///home/mculen/.config/opencode/plugins/sdd-arcsdd-profile-loader.ts)

## Plugins personalizados para intake y control del flujo

### `azure-wi-link-autostart.ts`

Detecta URLs de Azure Work Items en el mensaje del usuario y las transforma en
un prompt estructurado de inicio automático. Obliga a:

1. Resolver las skills correctas.
2. Leer el Work Item y sus referencias.
3. Ejecutar el intake gate antes de SDD.
4. Clasificar la tarea como `hotfix` o `standard`.
5. Definir rama, ambiente de validación y plan de pruebas.
6. Avanzar solo cuando el intake esté listo.

Referencia: [`azure-wi-link-autostart.ts`](file:///home/mculen/.config/opencode/plugins/azure-wi-link-autostart.ts)

### `engram.ts`

Conecta eventos de OpenCode con Engram, inyecta el protocolo de memoria y
registra sesiones, tool calls, prompts y resúmenes.

Referencia: [`engram.ts`](file:///home/mculen/.config/opencode/plugins/engram.ts)

### `sdd-arcsdd-profile-loader.ts`

Carga perfiles de modelos y crea fallbacks para los agentes SDD. También puede
reintentar fases ante errores transitorios del proveedor.

Referencia: [`sdd-arcsdd-profile-loader.ts`](file:///home/mculen/.config/opencode/plugins/sdd-arcsdd-profile-loader.ts)

### `sdd-model-router.ts`

Descubre modelos disponibles, aplica la política de benchmarks y selecciona una
ruta por rol y lane (`premium`, `super`, `bestValue`, `free`).

Referencia: [`sdd-model-router.ts`](file:///home/mculen/.config/opencode/plugins/sdd-model-router.ts)

### `sdd-task-result-artifacts.ts`

Valida que una fase SDD devuelva un envelope de resultado correcto. Si una fase
falla o devuelve una salida vacía, bloquea el avance silencioso de las fases
siguientes y deja una continuación explícita para investigar el estado.

Referencia: [`sdd-task-result-artifacts.ts`](file:///home/mculen/.config/opencode/plugins/sdd-task-result-artifacts.ts)

### `opencode-review-transport.ts`

Transporta revisiones de agentes especializados mediante el comando local
`gentle-ai review opencode-transport`. Usa relays por tarea para mantener el
binding entre evidencia congelada, prompt y resultado.

Referencia: [`opencode-review-transport.ts`](file:///home/mculen/.config/opencode/plugins/opencode-review-transport.ts)

### Plugins complementarios

- `model-variants.ts`: variantes y selección de modelos.
- `skill-registry.ts`: descubrimiento y registro de skills.
- [`@tarquinen/opencode-dcp`](https://github.com/Opencode-DCP/opencode-dynamic-context-pruning): reducción dinámica de contexto.
- [`@openspoon/subtask2`](https://github.com/openspoon/subtask2): configuración del retorno de tareas.

Todos los plugins locales están en [`~/.config/opencode/plugins/`](file:///home/mculen/.config/opencode/plugins/).

## Intake de un Azure Work Item

El comportamiento esperado al pegar un Work Item en OpenCode es:

```text
URL del WI
  -> plugin azure-wi-link-autostart
  -> resolución de skills
  -> lectura del WI, links, comentarios e historial
  -> azure-wi-intake-gate
  -> clasificación hotfix/standard
  -> rama y ambiente
  -> SDD solo si intake_status = ready
```

El intake evita arrancar una implementación con requisitos incompletos. Las
preguntas abiertas deben resolverse antes de crear artefactos SDD o modificar
código.

## Herramientas de validación

- Azure DevOps MCP: Work Items, repositorios, ramas, PRs, builds, logs y tests.
- Playwright MCP: navegador, UI, sandbox, demos y evidencia visual.
- CodeGraph: navegación estructural y análisis de impacto antes de editar.
- SonarQube MCP: análisis de calidad y gate del diff.
- Scripts locales: validaciones de routing y benchmarks en
  [`~/.config/opencode/scripts/`](file:///home/mculen/.config/opencode/scripts/).

## Reglas de seguridad y mantenimiento

- No publicar tokens, API keys, cookies, archivos `.env` ni configuraciones con
  secretos.
- Separar la configuración global del usuario de los archivos versionados del
  repositorio.
- Verificar los links externos antes de publicar el documento en un repositorio
  personal.
- Actualizar este inventario cuando se agregue, retire o cambie un plugin,
  agente, skill, MCP server o perfil de modelos.

## Enlaces oficiales

- [OpenCode](https://github.com/anomalyco/opencode)
- [Engram](https://github.com/Gentleman-Programming/engram)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [OpenSpec](https://github.com/Fission-AI/OpenSpec)
- [Playwright](https://playwright.dev/)
- [Azure DevOps](https://azure.microsoft.com/products/devops)
- [SonarQube](https://www.sonarsource.com/products/sonarqube/)
- [GitHub](https://github.com/)
