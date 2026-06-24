export function getItemNearest({ items = [], target = 0, key = 'width' }) {
    if (!items || items.length === 0) {
        return null;
    }

    return items.reduce((nearest, current) => {
        const currentValue = current[key] || 0;
        const nearestValue = nearest[key] || 0;

        const currentDiff = Math.abs(currentValue - target);
        const nearestDiff = Math.abs(nearestValue - target);

        if (currentDiff < nearestDiff) {
            return current;
        }

        if (nearestDiff < currentDiff) {
            return nearest;
        }

        if (currentValue > nearestValue) {
            return current;
        }

        return nearest;
    });
}
