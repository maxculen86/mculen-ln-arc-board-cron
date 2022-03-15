/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import StaticValidation from '../../private/common/staticValidation';
import getArticlesFromAcumSource from '../../private/LN/common/utils/getArticlesFromAcumSource';
import filter from '../../../content/filters/LN/acumulado/articleMasNotas';
import addForwardSlash from '../../private/LN/common/utils/addForwardSlash';
import CajaTema from '../../private/LN/common/cajaTema';
import {
    NOTICIA,
    RECETA,
    VIDEO
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
        customFields: { cantidadNotas, filter: filterCustomField = 0 },
        globalContent: {
            subtype,
            taxonomy: {
                primary_section: { _id, _website, name: sectionName, path }
            },
            _id: idArticle
        },
        outputType,
        id: featureId,
        arcSite
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

    const { notRecommendedSections = [] } = getProperties(arcSite);

    const SectionIdElements = sectionId.split('/');

    const findCommonElements = (arr1, arr2) => {
        return arr1.some(item => arr2.includes(item));
    };
    const shouldNotFilter = findCommonElements(
        SectionIdElements,
        notRecommendedSections
    );

    const customQuerys = {
        [VIDEO]: { sectionId, subtype },
        default: { sectionId }
    };
    const typesOfQuery = customQuerys[subtype] || customQuerys.default;

    const articles = getArticlesFromAcumSource(
        typesOfQuery,
        filter,
        'boxArticles',
        size,
        'composer',
        excludeSectionId,
        'story',
        shouldNotFilter,
        _website,
        true
    );

    const articlesFiltered = articles
        .filter(article => article._id !== idArticle)
        .slice(0, Number(size.originalSize));

    return (
        <StaticValidation id={featureId} htmlOnly persistent>
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
                withVolanta
            />
        </StaticValidation>
    );
};

masNotas.label = 'LN-Nota-masNotas';
masNotas.lazy = true;

masNotas.propTypes = {
    id: PropTypes.string,
    outputType: PropTypes.string,
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' }),
        filter: PropTypes.oneOf(['0', '1']).tag({
            labels: {
                0: 'Ultimas Noticias',
                1: 'Por Sección'
            },
            label: 'Filtrar por',
            defaultValue: 0
        })
    }),
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
    }),
    arcSite: PropTypes.string
};

export default Consumer(masNotas);
