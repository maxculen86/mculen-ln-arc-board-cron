import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import CajaTema from '../../../private/LN/common/cajaTema';
import {
    NOTICIA,
    RECETA,
    VIDEO
} from '../../../private/common/utils/subtypes/subtypeHelper';
import {
    validateMasNotas,
    filterType,
    setSearchParamsByFilterType,
    sourceByFilterType,
    getFilteredContentElements
} from '../../../private/common/utils/masNotasHelper';
import filter from '../../../../content/filters/LN/acumulado/articleMasNotas';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import { articleBoxesTracker } from '../../../private/common/utils/noteTracker/articleBoxesTracker';
import useNotaSegment from '../../../private/LN/common/hooks/useNotaSegment';
import getRenderState from '../../../private/LN/common/utils/segmentation/getRenderState';
import {
    FILTER_LABELS,
    FILTERS,
    SEGMENTATION_GROUP,
    getAdminPreviewSegment
} from './helper';

function masNotasSegmentado(props) {
    const {
        customFields: {
            cantidadNotas = 30,
            filterTest = '',
            filterControl = '',
            experimentName = '',
            testDigits = [],
            controlDigits = [],
            segmentAndHide = false,
            sectionOrTagTest = '',
            sectionOrTagControl = ''
        },
        globalContent,
        outputType,
        arcSite,
        isAdmin
    } = props;

    const { segment, ready } = useNotaSegment({
        experimentName,
        testDigits,
        controlDigits
    });

    const { subtype, taxonomy, _id: idArticle } = globalContent || {};
    const { primary_section: primarySection, tags = [] } = taxonomy || {};
    const { _id, _website, name: sectionName, path } = primarySection || {};

    const segmentationConfigError =
        !experimentName ||
        (testDigits.length === 0 && controlDigits.length === 0) ||
        (!filterTest && !filterControl);

    const variantConfigBySegment = {
        test: { filter: filterTest, sectionOrTag: sectionOrTagTest },
        control: { filter: filterControl, sectionOrTag: sectionOrTagControl }
    };
    const adminPreviewSegment = getAdminPreviewSegment({
        isAdmin,
        segment,
        segmentationConfigError,
        filterTest
    });
    const activeSegment = segment || adminPreviewSegment;
    const shouldResolveVariant = !segmentAndHide && ready && activeSegment;
    const { filter: activeFilter = '', sectionOrTag: activeSectionOrTag = '' } =
        shouldResolveVariant ? variantConfigBySegment[activeSegment] || {} : {};

    const isAperturaHome = activeFilter === 'aperturaHome';

    const searchParameters = {
        _website,
        sectionOrTag: activeSectionOrTag,
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

    const buildSearchParams = setSearchParamsByFilterType[activeFilter];
    const refinedSearchParams = buildSearchParams
        ? buildSearchParams(searchParameters)
        : {};

    const selectedSource = sourceByFilterType[activeFilter] || null;

    const articlesList = useContent({
        source: selectedSource,
        query: refinedSearchParams,
        filter: isAperturaHome ? undefined : filter,
        staticMode: false
    });

    const filteredContentElements = getFilteredContentElements(
        articlesList,
        idArticle,
        cantidadNotas
    );

    const content =
        activeFilter && filterType[activeFilter]
            ? filterType[activeFilter]({
                  ...searchParameters,
                  filteredContentElements
              })
            : { articles: [], title: '', sectionTitle: '' };

    const { articles = [], title = '', sectionTitle } = content;
    const renderError = validateMasNotas(articles, cantidadNotas);
    const shouldTrackBox =
        _id &&
        !segmentAndHide &&
        ready &&
        activeSegment &&
        activeFilter &&
        !renderError;

    useEffect(() => {
        if (!shouldTrackBox) return;

        articleBoxesTracker({
            boxType: 'masNotas',
            diagramation: cantidadNotas,
            sectionTitle
        });
    }, [cantidadNotas, sectionTitle, shouldTrackBox]);

    const { shouldRender, warning } = getRenderState({
        hasSection: Boolean(_id),
        isAdmin,
        segmentationConfigError,
        segmentAndHide,
        ready,
        activeSegment,
        activeFilter,
        renderError
    });

    if (warning) {
        return (
            <PageBuilderMessage type={warning.type} message={warning.message} />
        );
    }

    return shouldRender ? (
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

masNotasSegmentado.label = 'LN-Nota-masNotasSegmentado';
masNotasSegmentado.lazy = true;

masNotasSegmentado.propTypes = {
    outputType: PropTypes.string,
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({
            label: 'Cantidad de Notas'
        }),

        experimentName: PropTypes.string.tag({
            label: 'Nombre del experimento',
            description: 'Identificador único (ej. "Exp01").',
            defaultValue: '',
            group: SEGMENTATION_GROUP
        }),

        segmentAndHide: PropTypes.boolean.tag({
            label: 'Segmentar y ocultar',
            description:
                'Calcula y persiste el segmento sin renderizar la caja.',
            defaultValue: false,
            group: SEGMENTATION_GROUP
        }),

        testSeparator: PropTypes.label.tag({
            label: '──────── TEST ────────',
            description: 'Configuración de la variante TEST.',
            group: SEGMENTATION_GROUP
        }),

        testDigits: PropTypes.list.tag({
            label: 'Último dígito del Client ID',
            group: SEGMENTATION_GROUP
        }),

        filterTest: PropTypes.oneOf(FILTERS).tag({
            labels: FILTER_LABELS,
            label: 'Filtrar por',
            defaultValue: '',
            group: SEGMENTATION_GROUP
        }),

        sectionOrTagTest: PropTypes.string.tag({
            label: 'Sección o tag',
            description: 'Seccion o tag para obtener notas.',
            defaultValue: '',
            group: SEGMENTATION_GROUP
        }),

        controlSeparator: PropTypes.label.tag({
            label: '──────── CONTROL ────────',
            description: 'Configuración de la variante CONTROL.',
            group: SEGMENTATION_GROUP
        }),

        controlDigits: PropTypes.list.tag({
            label: 'Último dígito del Client ID',
            group: SEGMENTATION_GROUP
        }),

        filterControl: PropTypes.oneOf(FILTERS).tag({
            labels: FILTER_LABELS,
            label: 'Filtrar por',
            defaultValue: '',
            group: SEGMENTATION_GROUP
        }),

        sectionOrTagControl: PropTypes.string.tag({
            label: 'Sección o tag',
            description: 'Seccion o tag para obtener notas.',
            defaultValue: '',
            group: SEGMENTATION_GROUP
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
export default Consumer(masNotasSegmentado);
