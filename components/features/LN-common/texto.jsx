import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import ComText from '../../private/common/text';
import { fonts, sizes, weights } from '../../private/common/text/getFontData';

function Text(props) {
    const {
        type,
        id: featureId,
        customFields: { font, size, weight, htmlTag, link, text, className }
    } = props;

    return (
        <Static id={`${type}-${featureId}`} htmlOnly>
            <ComText
                id={featureId}
                tag={htmlTag || 'span'}
                font={font}
                size={size}
                weight={weight}
                text={text}
                link={link}
                extraClass={className}
            />
        </Static>
    );
}

Text.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        font: PropTypes.oneOf(Object.keys(fonts)).tag({
            label: 'Fuente',
            description: 'Seleccione la fuente que corresponda.',
            defaultValue: 'prumo'
        }),
        size: PropTypes.oneOf(Object.keys(sizes)).tag({
            label: 'Tamaño',
            description: 'Seleccione el tamaño de la fuente que corresponda.',
            defaultValue: 'medium'
        }),
        weight: PropTypes.oneOf(Object.keys(weights)).tag({
            label: 'Peso',
            description: 'Seleccione el peso de la fuente que corresponda.',
            defaultValue: 'regular'
        }),
        htmlTag: PropTypes.oneOf([
            'span',
            'p',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6'
        ]).tag({
            label: 'Etiqueta',
            description: 'Seleccione el tag html que corresponda.',
            defaultValue: 'span'
        }).isRequired,
        text: PropTypes.string.tag({
            label: 'Texto',
            description: 'Ingrese el texto que corresponda.',
            defaultValue: ''
        }).isRequired,
        link: PropTypes.url.tag({
            label: 'Url',
            description: 'Ingrese una url válida.',
            defaultValue: ''
        }),
        className: PropTypes.string.tag({
            label: 'extra ClassName',
            description: 'Ingrese la clase extra que necesite el elemento.',
            defaultValue: ''
        })
    }).isRequired
};

Text.label = 'LN Common Text';

export default Text;
