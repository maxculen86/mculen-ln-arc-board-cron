import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Subtypes } from '../../../common/utils/subtypes/subtypeHelper';

const dataLayer = props => {
    const { globalContent } = props;

    const { content_restrictions, subtype: _subtype, _id } = globalContent;
    const valor =
        (content_restrictions && content_restrictions.content_code) || 'comun';
    const pageType = 'nota';
    const pageTypeText = 'nota';
    const subtype = Subtypes.find(sub => sub.id === _subtype);

    const scriptDataLayerReceta = `
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        metarefresh: 'N/A',
        pageType: 'N/A',
        mainTag: 'N/A',
        tags: 'N/A',
        autor: 'N/A',
        seccion: 'Recetas',
        longitud: 'N/A',
        formato: 'N/A',
        genero: 'N/A',
        tematica: 'N/A',
        valor: 'N/A',
        age: 'N/A',
        gender: 'N/A',
        marital: 'N/A',
        country: 'N/A',
        city: 'N/A',
        education: 'N/A',
        career: 'N/A',
        industry: 'N/A',
        income: 'N/A',
        interest: 'N/A'
    });`;

    const scriptDataLayerNota = `window.dataLayer = window.dataLayer || [];

    const _metarefresh = localStorage.getItem('CDmetaRefresh') !== null ? 'yes' : 'no';
    const _countNotas = localStorage.getItem('countNotas') || '0';

    if (_metarefresh === 'yes') {
        localStorage.removeItem('CDmetaRefresh');
    }

    const _dataLayer = {
        metarefresh: _metarefresh,
        pagetype: '${pageType}',
        subtype: '${(subtype &&
            subtype.nombre &&
            subtype.nombre.toLowerCase()) ||
            ''}',
        valor: '${valor}',
        nota_id: '${_id}'
    };

    if ('${pageTypeText}' === 'nota') {
        _dataLayer.notasLeidas = _countNotas;
    }

    window.dataLayer.push(_dataLayer);
    `;

    const scriptDataLayer =
        subtype && subtype.nombre === 'Receta'
            ? scriptDataLayerReceta
            : scriptDataLayerNota;

    return (
        <script
            id="scriptDataLayer"
            async
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: scriptDataLayer
            }}
        />
    );
};

dataLayer.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        subtype: PropTypes.string.isRequired,
        content_restrictions: { content_code: PropTypes.string.isRequired }
    }).isRequired
};

export default dataLayer;
