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
        menuType: 'secondary'
    });

    if (isMobile) {
        menuItems.push({
            title: 'CLUB LA NACION',
            href: setPageUrl('/club-la-nacion'),
            menuType: 'secondary'
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

export const createSessionChat = async ({ accessToken }) => {
    const response = await fetch(`${API_IA_FOODIT}/api/session`, {
        method: 'POST',
        headers: getAuthHeaders(accessToken)
    });

    const sessionResponse = await response.json();

    if (!sessionResponse.session_id) {
        throw new Error('Error obteniendo sessión');
    }

    return sessionResponse;
};

export const sendChatMessage = async ({ sessionId, message, accessToken }) => {
    const response = await fetch(`${API_IA_FOODIT}/api/chat`, {
        method: 'POST',
        headers: getAuthHeaders(accessToken),
        body: JSON.stringify({
            session_id: sessionId,
            message
        })
    });

    return response.json();
};
