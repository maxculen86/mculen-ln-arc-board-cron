import { SITE_FOODIT } from 'fusion:environment';

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
