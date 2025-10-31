import { useMemo } from 'react';
import { useAppContext } from 'fusion:context';
import { getUniqueAuthorsFromPosts } from '../../../../_helpers/getUniqueAuthorsFromPosts';
import get from '../../../../../../private/common/utils/get';

export const useLiveblogAuthors = () => {
    const { globalContent } = useAppContext();
    const { content_elements: contentElements = [] } = globalContent;
    const shouldShowAuthorsBox = get(
        globalContent,
        'label.mostrar_caja_autores.text',
        'Si'
    );

    return useMemo(() => {
        const authors = getUniqueAuthorsFromPosts(contentElements);
        const shouldShow = shouldShowAuthorsBox !== 'No' && authors.length >= 3;

        return { authors, shouldShow };
    }, [contentElements, shouldShowAuthorsBox]);
};
