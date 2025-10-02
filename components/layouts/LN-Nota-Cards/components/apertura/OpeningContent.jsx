import React from 'react';
import PropTypes from 'prop-types';

function OpeningContent({ data }) {
    const { title, subtitle, description } = data || {};

    return (
        <div className="nota-cards__opening-content">
            {/* Volanta (opcional) */}
            {subtitle && <div className="nota-cards__volanta">{subtitle}</div>}

            {/* Título (obligatorio) */}
            {title && <h1 className="nota-cards__title">{title}</h1>}

            {/* Bajada (opcional) */}
            {description && (
                <div className="nota-cards__bajada">{description}</div>
            )}
        </div>
    );
}

OpeningContent.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        description: PropTypes.string
    })
};

OpeningContent.defaultProps = {
    data: {}
};

export default OpeningContent;
