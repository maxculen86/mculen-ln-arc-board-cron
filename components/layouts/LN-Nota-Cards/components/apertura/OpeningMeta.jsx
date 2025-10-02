import React from 'react';
import PropTypes from 'prop-types';

function OpeningMeta({ data }) {
    const { publishDate, authors, label } = data || {};

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
            {authors && authors.length > 0 && (
                <div className="nota-cards__author">
                    Por {authors.map(author => author.name).join(', ')}
                </div>
            )}

            {/* Chapita/Label (opcional) */}
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

OpeningMeta.propTypes = {
    data: PropTypes.shape({
        publishDate: PropTypes.string,
        authors: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string
            })
        ),
        label: PropTypes.shape({
            basic: PropTypes.shape({
                text: PropTypes.string
            })
        })
    })
};

OpeningMeta.defaultProps = {
    data: {}
};

export default OpeningMeta;
