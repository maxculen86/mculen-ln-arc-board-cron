import React from 'react';
import { useAppContext } from 'fusion:context';

function OpeningMeta() {
    const { globalContent } = useAppContext();
    const { publishDate, credits, label } = globalContent || {};

    return (
        <div className="nota-cards__opening-meta">
            {/* Fecha (obligatorio) */}
            {publishDate && (
                <div className="nota-cards__date">
                    {new Date(publishDate).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </div>
            )}

            {/* Autor (opcional) */}
            {credits?.by && credits.by.length > 0 && (
                <div className="nota-cards__author">
                    Por {credits.by.map(author => author.name).join(', ')}
                </div>
            )}

            {/* Chapita/Label (opcionall) */}
            {label?.basic?.text && (
                <div className="nota-cards__label">{label.basic.text}</div>
            )}

            {/* Sharestar (obligatorio) - Placeholder */}
            <div className="nota-cards__sharestar">
                {/* TODO: Integrar componente de sharestar */}
            </div>
        </div>
    );
}

export default OpeningMeta;
