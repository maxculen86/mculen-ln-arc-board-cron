import React from 'react';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';

const MarfeelMarkup = () => {
    // TODO: Verificar un validador adicional para confirmar que solo cargue en la seccion de notas porque ahora carga para todo el sitio
    const { globalContent } = useAppContext();
    const contentCode = get(
        globalContent,
        'content_restrictions.content_code',
        ''
    );
    const isAccessibleForFree = contentCode !== 'cerrada';
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'NewsArticle',
                    isAccessibleForFree: isAccessibleForFree
                })
            }}
        />
    );
};

export default MarfeelMarkup;
