import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';

const filterElements = (contentElements, subtype) => {
    // Si la nota es subtype 9 se usa un `find()` ya que para las notas de html libre
    // se debe tomar solo el primer elemento del contentElements de tipo 'raw_html'
    const filter = subtype === '9' ? 'find' : 'filter';
    const elements = contentElements[filter](element => {
        const { type, content = '' } = element;
        return type === 'raw_html' && content !== '';
    });

    // el método find devuelve un objeto por lo que se retorna dentro de un arreglo
    // para normalizar el resultado
    return subtype === '9' ? [elements] : elements;
};

const ScriptHtmlLibre = props => {
    const {
        globalContent: { type, subtype, content_elements: contentElements }
    } = props;

    if (type !== 'story') return null;

    const elements = filterElements(contentElements, subtype);

    return (
        <>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/pym/1.2.0/pym.v1.min.js" />
        </>
    );
};

ScriptHtmlLibre.propTypes = {
    globalContent: PropTypes.shape({
        type: PropTypes.string.isRequired,
        subtype: PropTypes.string.isRequired,
        content_elements: PropTypes.shape.isRequired
    }).isRequired
};

export default Consumer(ScriptHtmlLibre);
