import { IS_DEV, IS_SANDBOX } from 'fusion:environment';

// Mock de la respuesta del chat **solo en dev o sandbox**

// `session_id` falso: en modo mock no se crea sesión contra el backend.
export const MOCK_SESSION_ID = 'mock-session';

export const MOCK_USER = {
    isSubscribed: true,
    id: 'mock-user'
};

// Latencia simulada, para ver el estado "Foodit está pensando…" y el tipeo.
const MOCK_LATENCY_MS = 600;

const MOCK_ANSWER = `Para organizar tu semana de manera eficiente, te propongo un **menú variado** que combina proteínas, vegetales y preparaciones prácticas. Este plan incluye opciones para almuerzo y cena, permitiéndote optimizar el tiempo en la cocina mediante el uso de *ingredientes* versátiles.

## Planificación semanal

| Comida | Lunes | Martes | Miércoles | Jueves | Viernes | Sábado |
| --- | --- | --- | --- | --- | --- | --- |
| Almuerzo | Ñoquis de batata con salsa de espárragos | Hamburguesas de pollo caseras con ensalada fresca | Frittata de vegetales | Tacos de masa de zanahoria rellenos con carne | Croquetas de atún con ensalada | Ensalada campera con huevo |
| Cena | Sopa crema de calabaza | Wok de vegetales con arroz | Tarta de acelga | Milanesas de berenjena | Pizza casera integral | Libre |
| Postre | Fruta de estación | Yogur con granola | Fruta de estación | Compota de manzana | Helado casero | Libre |

### Cómo aprovecharlo

*   Las **preparaciones del lunes y el miércoles** rinden para dos comidas: cociná de más y guardá.
*   Los vegetales se pueden dejar cortados el domingo, así los días de semana son solo armado.
*   El sábado queda libre a propósito: sin margen, ninguna planificación sobrevive a la primera semana.

Podés reemplazar cualquier proteína por su versión vegetariana sin cambiar el resto del plan.`;

export const isChatMockEnabled = () => {
    if (typeof window === 'undefined') return false;
    if (IS_DEV !== 'true' && IS_SANDBOX !== 'true') return false;

    return new URLSearchParams(window.location.search).get('mockChat') === '1';
};

export const sendMockChatMessage = ({ message }) =>
    new Promise(resolve => {
        setTimeout(
            () =>
                resolve({
                    success: true,
                    message_type: 'input',
                    error: null,
                    data: {
                        message: {
                            query: message,
                            answer: MOCK_ANSWER,
                            follow_up_query:
                                '¿Querés que arme la lista de compras de este menú?',
                            sources: []
                        },
                        session_id: MOCK_SESSION_ID,
                        chat_count: 1,
                        max_reached: false,
                        session_status: 'active'
                    }
                }),
            MOCK_LATENCY_MS
        );
    });
