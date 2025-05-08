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
        title: 'LUNES'
    },
    {
        id: TUESDAY,
        title: 'MARTES'
    },
    {
        id: WEDNESDAY,
        title: 'MIÉRCOLES'
    },
    {
        id: THURSDAY,
        title: 'JUEVES'
    },
    {
        id: FRIDAY,
        title: 'VIERNES'
    },
    {
        id: SATURDAY,
        title: 'SÁBADO'
    },
    {
        id: SUNDAY,
        title: 'DOMINGO'
    }
];

export function menusDayTransform(menusDay) {
    const categories = {
        breakfast: { category: 'Desayuno', id: 'breakfast', recipes: [] },
        lunch: { category: 'Almuerzo', id: 'lunch', recipes: [] },
        dinner: { category: 'Cena', id: 'dinner', recipes: [] }
    };

    menusDay.forEach(menuItem => {
        const { bookmarkContent = {} } = menuItem || {};
        const food = bookmarkContent?.food?.toLowerCase() || '';
        const category = categories[food];

        if (category) {
            const { resizedUrl = '' } = getShortestImage(
                bookmarkContent?.image?.resized_urls
            );
            category.recipes.push({
                bookmarkId: menuItem?.bookmarkId,
                id: bookmarkContent?.id,
                title: bookmarkContent?.title,
                image: resizedUrl,
                badge: bookmarkContent?.tag,
                url: bookmarkContent?.canonical_url
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

export function getMealTotalById(articleId, bookmarks = []) {
    const counts = bookmarks.reduce((acc, bookmark) => {
        const group = get(bookmark, 'bookmarkGroup', '');
        const mealId = get(bookmark, 'bookmarkContent.id', '');
        const mealTitle = get(bookmark, 'bookmarkContent.title', '');

        if (mealId === articleId) {
            const key = `${group}-${mealId}`;

            if (!acc[key]) {
                acc[key] = { day: group, mealId, title: mealTitle, count: 0 };
            }

            acc[key].count += 1;
        }
        return acc;
    }, {});

    const mealsArray = Object.values(counts);
    const total = mealsArray.reduce((sum, meal) => sum + meal.count, 0);

    return {
        meals: mealsArray,
        total
    };
}
