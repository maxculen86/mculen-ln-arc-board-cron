import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import CajaTema from '../../private/LN/common/cajaTema';
import {
    NOTICIA,
    RECETA,
    VIDEO
} from '../../private/common/utils/subtypes/subtypeHelper';
import {
    validateMasNotas,
    filterType,
    setSearchParamsByFilterType,
    getFilteredContentElements
} from '../../private/common/utils/masNotasHelper';
import filter from '../../../content/filters/LN/acumulado/articleMasNotas';
import PageBuilderMessage from '../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import { articleBoxesTracker } from '../../private/common/utils/noteTracker/articleBoxesTracker';

function masNotas(props) {
    const {
        customFields: {
            cantidadNotas = 30,
            filter: filterCustomField = 'byLastNews',
            sectionOrTag = ''
        },
        globalContent,
        outputType,
        arcSite,
        isAdmin
    } = props;

    const { subtype, taxonomy, _id: idArticle } = globalContent || {};
    const { primary_section: primarySection, tags = [] } = taxonomy || {};
    const { _id, _website, name: sectionName, path } = primarySection || {};

    if (!_id) return null;

    const isFilteringByTags = filterCustomField === 'byTags';

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

    let content = {};

    const refinedSearchParams = setSearchParamsByFilterType[filterCustomField]
        ? setSearchParamsByFilterType[filterCustomField](searchParameters)
        : setSearchParamsByFilterType.byLastNews(searchParameters);

    const articlesList = useContent({
        source: isFilteringByTags ? null : 'lnAcuSource',
        query: refinedSearchParams,
        filter,
        staticMode: false
    });

    const filteredContentElements = getFilteredContentElements(
        articlesList,
        idArticle,
        cantidadNotas
    );

    content = filterType[filterCustomField]
        ? filterType[filterCustomField]({
              ...searchParameters,
              filteredContentElements
          })
        : filterType.byLastNews({
              ...searchParameters,
              filteredContentElements
          });

    const { articles = [], title = '', sectionTitle } = content;
    const error = validateMasNotas(articles, cantidadNotas);

    useEffect(() => {
        articleBoxesTracker({
            boxType: 'masNotas',
            diagramation: cantidadNotas,
            sectionTitle
        });
    }, [cantidadNotas]);

    if (isAdmin && error) {
        return <PageBuilderMessage type={error.type} message={error.message} />;
    }

    return !error ? (
        <CajaTema
            title={title}
            sectionName={sectionTitle}
            articles={articles}
            position="toi"
            outputType={outputType}
            withVolanta
        />
    ) : null;
}

masNotas.label = 'LN-Nota-masNotas';
masNotas.lazy = true;

masNotas.propTypes = {
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
