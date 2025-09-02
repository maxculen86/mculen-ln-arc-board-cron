import React from 'react';
import { useAppContext } from 'fusion:context';

function OpeningContent() {
    const { globalContent } = useAppContext();
    const { headlines, subheadlines, description } = globalContent || {};

    return (
        <div className="nota-cards__opening-content">
            {/* Volanta (opcional) */}
            {subheadlines?.basic && (
                <div className="nota-cards__volanta">{subheadlines.basic}</div>
            )}

            {/* Título (obligatorio) */}
            {headlines?.basic && (
                <h1 className="nota-cards__title">{headlines.basic}</h1>
            )}

            {/* Bajada (opcional) */}
            {description?.basic && (
                <div className="nota-cards__bajada">{description.basic}</div>
            )}
        </div>
    );
}

export default OpeningContent;
