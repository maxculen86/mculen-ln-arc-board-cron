import { SITE_FOODIT, API_IA_FOODIT } from 'fusion:environment';

const setPageUrl = (path = '') => `${SITE_FOODIT}${path}/`;

const buildUrlWithParams = (id, name) => {
    if (id.startsWith('/tema/tutorial-')) {
        const baseUrl = setPageUrl(id);
        const params = new URLSearchParams({
            query: 'recetas',
            title: name,
            groups: 'occasions',
            itemGroups: name
        });

        return `${baseUrl}?${params.toString()}`;
    }

    return setPageUrl(id);
};

export default function transformMenuData({
    children: childrenProp = [],
    isMobile = false
} = {}) {
    const menuItems = [];

    childrenProp.forEach(category => {
        const {
            name,
            _id: id,
            children: childrenCategory = [],
            navigation
        } = category || {};

        const displayTitle = isMobile ? name : navigation?.nav_title || name;

        if (childrenCategory.length > 0) {
            menuItems.push({
                title: displayTitle,
                data: [
                    {
                        items: childrenCategory.map(child => {
                            const { name: childName, _id: childId } = child;
                            const childTitle =
                                isMobile &&
                                childId.startsWith('/tema/tutorial-')
                                    ? child.navigation?.nav_title
                                    : child.navigation?.nav_title || childName;

                            return {
                                text: childTitle,
                                href: buildUrlWithParams(childId, childName),
                                menuType: 'primary'
                            };
                        })
                    }
                ]
            });
        } else {
            menuItems.push({
                title: displayTitle,
                href: setPageUrl(id)
            });
        }
    });

    menuItems.push({
        title: 'Conocenos',
        href: `https://conocenos.foodit.com.ar/`,
        menuType: 'secondary',
        className: '--no-app'
    });

    if (isMobile) {
        menuItems.push({
            title: 'CLUB LA NACION',
            href: setPageUrl('/club-la-nacion'),
            menuType: 'secondary',
            className: 'lg-none'
        });
    }

    return menuItems;
}

const getAuthHeaders = accessToken => ({
    'Content-Type': 'application/json',
    'x-authorization': accessToken
});

export const searchFood = async ({ query, userId, accessToken }) => {
    const response = await fetch(`${API_IA_FOODIT}/api/search`, {
        method: 'POST',
        headers: getAuthHeaders(accessToken),
        body: JSON.stringify({
            query,
            user_id: userId
        })
    });

    return response.json();
};

export const createSessionChat = async ({ accessToken, userId }) => {
    const response = await fetch(`${API_IA_FOODIT}/api/session`, {
        method: 'POST',
        headers: getAuthHeaders(accessToken),
        body: JSON.stringify({ user_id: userId })
    });

    const sessionResponse = await response.json();

    if (!sessionResponse.session_id) {
        throw new Error('Error obteniendo sessión');
    }

    return sessionResponse;
};

// Alimenta el `response_type` del request y el `answerFormat` del render: si divergen, el markdown se ve crudo
export const RESPONSE_FORMAT = 'markdown';

// El runtime de `Thread` sólo appendea mensaje cuando esta promesa resuelve
export const sendChatMessage = async ({
    sessionId,
    message,
    accessToken,
    userId
}) => {
    let response;
    try {
        response = await fetch(`${API_IA_FOODIT}/api/chat`, {
            method: 'POST',
            headers: getAuthHeaders(accessToken),
            body: JSON.stringify({
                session_id: sessionId,
                message,
                user_id: userId,
                response_type: RESPONSE_FORMAT
            })
        });
    } catch (err) {
        console.error('ChatFoodit - /api/chat: fetch falló (red o CORS)', err);
        throw err;
    }

    const rawBody = await response.text();

    if (!response.ok) {
        console.error(
            'ChatFoodit - /api/chat respondió con error',
            response.status,
            rawBody
        );
    }

    try {
        return JSON.parse(rawBody);
    } catch (err) {
        console.error(
            'ChatFoodit - /api/chat: body no es JSON válido',
            response.status,
            rawBody
        );
        throw err;
    }
};
