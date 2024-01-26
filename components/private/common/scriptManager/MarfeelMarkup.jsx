import React from 'react';
import { useAppContext } from 'fusion:context';

const MarfeelMarkup = () => {
    // TODO: Verificar un validador adicional para confirmar que solo cargue en la seccion de notas porque ahora carga para todo el sitio
    const {
        globalContent = { content_restrictions: { content_code: 'cerrada' } }
    } = useAppContext();
    const {
        content_restrictions: { content_code }
    } = globalContent;
    const isAccessibleForFree = content_code !== 'cerrada';

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: `{
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "isAccessibleForFree": ${isAccessibleForFree}
          }}`
            }}
        />
    );
};

export default MarfeelMarkup;
