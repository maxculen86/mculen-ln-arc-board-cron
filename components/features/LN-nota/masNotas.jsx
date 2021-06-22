import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import getArticlesFromAcumSource from '../../private/LN/common/utils/getArticlesFromAcumSource';
import filter from '../../../content/filters/LN/acumulado/articleMasNotas';
import addForwardSlash from '../../private/LN/common/utils/addForwardSlash';
import CajaTema from '../../private/LN/common/cajaTema';

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
            }
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

    if (filterCustomField.toString() === '0' && subtype === '7')
        sectionId = '/recetas';
    if (filterCustomField.toString() === '0' && subtype === '1')
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

    return (
        <Static id={featureId}>
            <CajaTema
                title={title}
                notesQuantity={cantidadNotas}
                sectionName={
                    filterCustomField.toString() === '1'
                        ? 'OtrasNoticias'
                        : 'UltimasNoticias'
                }
                articles={articles}
                position="toi"
                outputType={outputType}
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
