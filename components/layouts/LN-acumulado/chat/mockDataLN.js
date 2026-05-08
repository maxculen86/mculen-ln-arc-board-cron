export const MOCK_DELAY_MS = 1500;
export const MAX_CHAT_COUNT = 1;

export const SUGGESTED_QUESTIONS = [
    '¿Cómo será el nuevo formato del torneo?',
    '¿Cuál es el próximo rival de Argentina?',
    '¿Quien es hasta el momento el goleador del torneo? '
];

let chatCount = 0;
const sessionId = `mock-session-${Date.now()}`;

const MOCK_RESPONSES = {
    default: {
        titulo: 'LA NACION IA',
        descripcion:
            'No tengo información disponible sobre ese tema. Estoy acá para ayudarte con temas relacionados al al mundial de futbol 2026. Te invitamos a retomar el chat más adelante.',
        fuentes: []
    },
    mundial: {
        titulo: 'Mundial 2026',
        descripcion:
            'El Mundial de Fútbol 2026 se disputará entre el 11 de junio y el 19 de julio de 2026. Será el primero en contar con 48 selecciones, organizadas en 12 grupos de cuatro equipos. Estados Unidos, Canadá y México son las sedes anfitrionas.',
        fuentes: [
            {
                titulo: 'Todo sobre el Mundial 2026',
                url: 'https://www.lanacion.com.ar/deportes/futbol/mundial'
            },
            {
                titulo: 'Calendario y sedes confirmadas',
                url: 'https://www.lanacion.com.ar/deportes/futbol/mundial/sedes'
            }
        ]
    },
    clasificados: {
        titulo: 'Selecciones clasificadas al Mundial 2026',
        descripcion:
            'Las selecciones anfitrionas Estados Unidos, Canadá y México tienen lugar asegurado. En Sudamérica, Argentina —campeona del mundo— lidera las Eliminatorias junto a Brasil, Uruguay y Colombia entre los primeros puestos. La UEFA ya definió varios cupos con equipos como España, Francia e Inglaterra.',
        fuentes: [
            {
                titulo: 'Eliminatorias Sudamericanas: tabla de posiciones',
                url: 'https://www.lanacion.com.ar/deportes/futbol/eliminatorias'
            }
        ]
    },
    sedes: {
        titulo: 'Sedes del Mundial 2026',
        descripcion:
            'El Mundial 2026 se jugará en 16 ciudades de tres países: Estados Unidos aportará 11 sedes (Nueva York, Los Ángeles, Dallas, San Francisco, Seattle, Boston, Miami, Atlanta, Kansas City, Filadelfia y Guadalupe). México tendrá 3 sedes: Ciudad de México, Guadalajara y Monterrey. Canadá jugará en Toronto y Vancouver.',
        fuentes: [
            {
                titulo: 'Las 16 sedes del Mundial 2026',
                url: 'https://www.lanacion.com.ar/deportes/futbol/mundial/sedes-2026'
            }
        ]
    },
    argentina: {
        titulo: 'Argentina en el Mundial 2026',
        descripcion:
            'Argentina llega al Mundial 2026 como vigente campeona del mundo tras consagrarse en Qatar 2022. El equipo dirigido por Lionel Scaloni busca la bicampeonato, con Lionel Messi como referente, aunque su participación en el torneo dependerá de su estado físico al momento del certamen.',
        fuentes: [
            {
                titulo: 'Argentina campeona del mundo',
                url: 'https://www.lanacion.com.ar/deportes/futbol/seleccion-argentina'
            }
        ]
    }
};

function getResponseByKeyword(question) {
    const q = question.toLowerCase();
    if (q.includes('argentina') || q.includes('albiceleste'))
        return MOCK_RESPONSES.argentina;
    if (q.includes('sede') || q.includes('ciudad') || q.includes('estadio'))
        return MOCK_RESPONSES.sedes;
    if (
        q.includes('clasific') ||
        q.includes('clasificaron') ||
        q.includes('equipos')
    )
        return MOCK_RESPONSES.clasificados;
    if (
        q.includes('mundial') ||
        q.includes('fecha') ||
        q.includes('empieza') ||
        q.includes('cuándo')
    )
        return MOCK_RESPONSES.mundial;
    return MOCK_RESPONSES.default;
}

export function buildMockResponse(userQuestion) {
    chatCount += 1;
    const maxReached = chatCount >= MAX_CHAT_COUNT;
    const responseData = getResponseByKeyword(userQuestion);

    return {
        success: true,
        response_chat: {
            ...responseData,
            tips: [],
            continuation_prompt: null,
            sugerencias: [],
            keywords: []
        },
        session_id: sessionId,
        chat_count: chatCount,
        max_reached: maxReached,
        error: null,
        message_type: 'input'
    };
}
