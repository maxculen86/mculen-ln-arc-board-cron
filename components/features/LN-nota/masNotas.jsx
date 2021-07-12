import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import getArticlesFromAcumSource from '../../private/LN/common/utils/getArticlesFromAcumSource';
import filter from '../../../content/filters/LN/acumulado/articleMasNotas';
import addForwardSlash from '../../private/LN/common/utils/addForwardSlash';
import CajaTema from '../../private/LN/common/cajaTema';
import {
    NOTICIA,
    RECETA
} from '../../private/common/utils/subtypes/subtypeHelper';

const getSectionTitle = noteType => {
    if (Number(noteType) === 1) return 'Otras noticias de&nbsp;';
    if (Number(noteType) === 7) return 'Más recetas de&nbsp;';
    return 'Más notas de&nbsp;';
};

const getTitle = (customFilter, subtype, sectionName, path) => {
    if (customFilter === '1') {
        return `${getSectionTitle(subtype)}<a href='${addForwardSlash(
            path
        )}' class='com-link'>${sectionName}</a>`;
    }

    if (customFilter === '0') {
        return subtype === '7' ? 'Últimas Recetas' : 'Últimas Noticias';
    }

    return `Últimas notas de <a href='${addForwardSlash(
        path
    )}' class='com-link'> ${sectionName}</a>`;
};

const masNotas = props => {
    const {
        customFields: { cantidadNotas, filter: filterCustomField },
        globalContent: {
            subtype,
            taxonomy: {
                primary_section: { _id, _website, name: sectionName, path }
            },
            _id: idArticle
        },
        outputType,
        id: featureId
    } = props;

    if (!_id) return <></>;

    const title = getTitle(
        filterCustomField.toString(),
        subtype,
        sectionName,
        path
    );

    const getDoubleSize = size => ({
        tripleSize: Math.ceil(size * 1.5),
        originalSize: size
    });

    const size = getDoubleSize(cantidadNotas || 30);
    let sectionId = _id;
    let excludeSectionId = false;

    if (filterCustomField.toString() === '0' && subtype === RECETA)
        sectionId = '/recetas';
    if (filterCustomField.toString() === '0' && subtype === NOTICIA)
        excludeSectionId = true;

    const typesOfQuery = { sectionId };
    const articles = getArticlesFromAcumSource(
        typesOfQuery,
        filter,
        'm',
        size,
        'composer',
        excludeSectionId,
        'story',
        _website,
        true
    );

    const articlesFiltered = articles
        .filter(article => article._id !== idArticle)
        .slice(0, Number(size.originalSize));

    return (
        <Static id={featureId}>
            <CajaTema
                title={title}
                notesQuantity={size.originalSize}
                sectionName={
                    filterCustomField.toString() === '1'
                        ? 'OtrasNoticias'
                        : 'UltimasNoticias'
                }
                articles={articlesFiltered}
                position="toi"
                outputType={outputType}
                withVolanta={false}
            />
        </Static>
    );
};

masNotas.label = 'LN-Nota-masNotas';

const filterTypes = {
    0: 'Ultimas Noticias',
    1: 'Por Sección'
};

masNotas.propTypes = {
    id: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' }),
        filter: PropTypes.oneOf(Object.keys(filterTypes)).tag({
            labels: filterTypes,
            label: 'Filtrar por',
            defaultValue: Object.keys(filterTypes)[0]
        })
    }).isRequired,
    globalContent: PropTypes.shape({
        subtype: PropTypes.string,
        _id: PropTypes.string,
        taxonomy: PropTypes.shape({
            primary_section: PropTypes.shape({
                _id: PropTypes.string,
                _website: PropTypes.string,
                name: PropTypes.string,
                path: PropTypes.string
            })
        })
    }).isRequired
};

export default Consumer(masNotas);
