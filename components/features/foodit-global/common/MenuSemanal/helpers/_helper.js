/* eslint-disable no-console */
import get from '../../../../../private/common/utils/get';
import { getShortestImage } from '../../../../../private/LN/common/utils/mediaHelper';
import {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
} from './daysIds';

export const daysOfWeek = [
    {
        id: MONDAY,
        title: 'LUNES',
        callback: () => {}
    },
    {
        id: TUESDAY,
        title: 'MARTES',
        callback: () => {}
    },
    {
        id: WEDNESDAY,
        title: 'MIÉRCOLES',
        callback: () => {}
    },
    {
        id: THURSDAY,
        title: 'JUEVES',
        callback: () => {}
    },
    {
        id: FRIDAY,
        title: 'VIERNES',
        callback: () => {}
    },
    {
        id: SATURDAY,
        title: 'SÁBADO',
        callback: () => {}
    },
    {
        id: SUNDAY,
        title: 'DOMINGO',
        callback: () => {}
    }
];

export function menusDayTransform(menusDay) {
    const categories = {
        breakfast: { category: 'Desayuno', id: 'breakfast', recipes: [] },
        lunch: { category: 'Almuerzo', id: 'lunch', recipes: [] },
        dinner: { category: 'Cena', id: 'dinner', recipes: [] }
    };

    menusDay.forEach(menuItem => {
        const food = menuItem.bookmarkContent?.food?.toLowerCase() || '';
        const category = categories[food];

        if (category) {
            const { resizedUrl } = getShortestImage(
                menuItem.bookmarkContent.image.resized_urls
            );
            category.recipes.push({
                bookmarkId: menuItem.bookmarkId,
                id: menuItem.bookmarkContent.id,
                title: menuItem.bookmarkContent.title,
                image: resizedUrl,
                badge: menuItem.bookmarkContent.tag,
                url: menuItem.bookmarkContent.canonical_url
            });
        }
    });

    return Object.values(categories);
}

export function dayFoodQuantities(bookmarks = []) {
    const counts = bookmarks.reduce((acc, bookmark) => {
        const group = get(bookmark, 'bookmarkGroup', '');
        const food = get(bookmark, 'bookmarkContent.food', '');

        const key = `${group}-${food}`;

        if (!acc[key]) {
            acc[key] = { day: group, food, count: 0 };
        }

        acc[key].count += 1;

        return acc;
    }, {});

    return Object.values(counts);
}
