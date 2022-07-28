/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import StaticValidation from '../../private/common/staticValidation';
import CajaTema from '../../private/LN/common/cajaTema';
import {
    NOTICIA,
    RECETA,
    VIDEO
} from '../../private/common/utils/subtypes/subtypeHelper';
import {
    validateMasNotas,
    filterType
} from '../../private/common/utils/masNotasHelper';
import PageBuilderMessage from '../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const masNotas = props => {
    const {
        customFields: {
            cantidadNotas = 30,
            filter: filterCustomField = 'byLastNews',
            sectionOrTag = ''
        },
        globalContent: {
            subtype,
            taxonomy: {
                primary_section: { _id, _website, name: sectionName, path },
                tags = []
            },
            _id: idArticle
        },
        outputType,
        id: featureId,
        arcSite,
        isAdmin
    } = props;

    if (!_id) return <></>;

    const searchParameters = {
        sectionOrTag,
        _website,
        sectionName,
        path,
        tags,
        idArticle,
        sectionId: _id,
        subtype,
        isNoticia: subtype === NOTICIA,
        isRecetas: subtype === RECETA,
        isVideo: subtype === VIDEO,
        cantidadNotas,
        arcSite
    };

    const { articles = [], title = '', sectionTitle } = filterType[
        filterCustomField
    ]
        ? filterType[filterCustomField]({ ...searchParameters })
        : filterType.byLastNews({ ...searchParameters });

    const error = validateMasNotas(articles, cantidadNotas);

    if (isAdmin && error) {
        return <PageBuilderMessage type={error.type} message={error.message} />;
    }

    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            {!error ? (
                <CajaTema
                    title={title}
                    notesQuantity={cantidadNotas}
                    sectionName={sectionTitle}
                    articles={articles}
                    position="toi"
                    outputType={outputType}
                    withVolanta
                />
            ) : (
                <></>
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
        filter: PropTypes.oneOf(['byLastNews', 'byTags', 'bySectionOrTag']).tag(
            {
                labels: {
                    byLastNews: 'Ultimas Noticias',
                    byTags: 'Por Tags',
                    bySectionOrTag: 'Seccion o tag'
                },
                label: 'Filtrar por',
                defaultValue: 'byLastNews'
            }
        ),
        sectionOrTag: PropTypes.string.tag({
            label: 'Sección o tag',
            description: 'Seccion o tag para obtener notas.',
            defaultValue: ''
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
    arcSite: PropTypes.string,
    isAdmin: PropTypes.bool
};

export default Consumer(masNotas);
