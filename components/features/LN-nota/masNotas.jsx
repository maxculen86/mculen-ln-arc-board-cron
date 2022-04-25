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
import capitalizeFirstLetter from '../../private/common/utils/capitalizeFirstLetter';
import get from '../../private/common/utils/get';

const getSectionTitle = noteType => {
    if (Number(noteType) === 1) return 'Otras noticias de&nbsp;';
    if (Number(noteType) === 7) return 'Más recetas de&nbsp;';
    return 'Más notas de&nbsp;';
};

const getTitle = (customFilter, subtype, link = {}) => {
    const { text, path } = link;
    if (customFilter === '1') {
        return `${getSectionTitle(subtype)}<a href='/tema/${addForwardSlash(
            path
        )}' class='com-link'>${capitalizeFirstLetter(text)}</a>`;
    }

    if (customFilter === '0') {
        return subtype === '7' ? 'Últimas Recetas' : 'Últimas Noticias';
    }

    return `Últimas notas de <a href='${addForwardSlash(
        path
    )}' class='com-link'> ${capitalizeFirstLetter(text)}</a>`;
};

const FILTER_TYPES = {
    0: 'Ultimas Noticias',
    1: 'Por Tags'
};

const getQuery = (filterType, subtype, customQuerys, tagId) =>
    filterType === '1'
        ? { tagId }
        : customQuerys[subtype] || customQuerys.default;

const masNotas = props => {
    const {
        customFields: { cantidadNotas = 30, filter: filterCustomField = 0 },
        globalContent: {
            subtype,
            taxonomy: {
                primary_section: { _id, _website, name: sectionName, path },
                tags
            },
            _id: idArticle
        },
        outputType,
        id: featureId,
        arcSite
    } = props;

    const filterType = filterCustomField.toString();

    if (!_id) return <></>;

    const size = {
        tripleSize: Math.ceil(cantidadNotas * 1.5),
        originalSize: cantidadNotas
    };
    let sectionId = _id;
    let excludeSectionId = false;

    if (filterType === '0' && subtype === RECETA) sectionId = '/recetas';
    if (filterType === '0' && subtype === NOTICIA) excludeSectionId = true;

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

    const { articles = [], link = {} } = (filterType === '1'
        ? tags
        : [{}]
    ).reduce((acc, tag) => {
        if (acc.articles) return acc;
        const { slug, text } = tag;
        const isSection = Object.keys(tag).length === 0;
        const res = getArticlesFromAcumSource(
            getQuery(filterType, subtype, customQuerys, slug),
            filter,
            'boxArticles',
            size,
            'composer',
            excludeSectionId,
            'story',
            shouldNotFilter,
            _website,
            true,
            isSection
        )
            .filter(
                article =>
                    article._id !== idArticle &&
                    get(article, 'promo_items.basic.type') === 'image'
            )
            .slice(0, Number(size.originalSize));
        if (res.length >= 3) {
            acc.articles = res;
            acc.link = {
                text: text || sectionName,
                path: slug || path
            };
        }

        return acc;
    }, {});

    const title = getTitle(filterType, subtype, link);

    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            {articles.length >= 3 && (
                <CajaTema
                    title={title}
                    notesQuantity={size.originalSize}
                    sectionName={
                        filterType === '1' ? 'OtrasNoticias' : 'UltimasNoticias'
                    }
                    articles={articles}
                    position="toi"
                    outputType={outputType}
                    withVolanta
                />
            )}
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
                0: FILTER_TYPES[0],
                1: FILTER_TYPES[1]
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
            }),
            tags: PropTypes.arrayOf(PropTypes.shape())
        })
    }),
    arcSite: PropTypes.string
};

export default Consumer(masNotas);
