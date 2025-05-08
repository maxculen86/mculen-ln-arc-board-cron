import { useMemo } from 'react';

export const useRecipeElements = (contentElements = []) => {
    const preparacionElements = useMemo(
        () =>
            contentElements.filter(
                content =>
                    content?.subtype === 'custom-preparacion' ||
                    content?.type === 'list' ||
                    content?.type === 'header' ||
                    content?.type === 'image'
            ),
        [contentElements]
    );

    const tipsAndTricks = useMemo(
        () =>
            contentElements.filter(
                content =>
                    content?.type === 'header' || content?.type === 'list'
            ),
        [contentElements]
    );

    return {
        preparacionElements,
        tipsAndTricks
    };
};
