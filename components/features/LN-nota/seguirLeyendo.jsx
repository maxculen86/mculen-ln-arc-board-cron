import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import SeguirLeyendo from '../../private/LN/nota/seguirLeyendo';
import { articleBoxesTracker } from '../../private/common/utils/noteTracker/articleBoxesTracker';
import useNotaSegment from '../../private/LN/common/hooks/useNotaSegment';
import getRenderState from '../../private/LN/common/utils/segmentation/getRenderState';
import PageBuilderMessage from '../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const SEGMENTATION_GROUP = 'Segmentación A/B';
function seguirLeyendo({ globalContent, outputType, customFields, isAdmin }) {
    const noteId = globalContent?._id;
    const { arcSite } = useAppContext();
    const {
        experimentName,
        segmentAndHide = false,
        testDigits,
        controlDigits
    } = customFields;

    const { segment, ready } = useNotaSegment({
        experimentName,
        testDigits,
        controlDigits,
        storageKey: 'SegmentoSeguirLeyendo'
    });

    const segmentationConfigError =
        !experimentName ||
        (testDigits.length === 0 && controlDigits.length === 0);

    const articles =
        useContent(
            noteId
                ? {
                      source: 'relatedContentSource',
                      query: {
                          'arc-site': arcSite,
                          id: noteId,
                          imageConfig: 'boxArticles',
                          limit: 3
                      }
                  }
                : null
        ) || [];

    const shouldTrackBox = noteId && !segmentAndHide && ready && segment;

    useEffect(() => {
        if (!shouldTrackBox) return;

        articleBoxesTracker({
            boxType: 'seguirLeyendo'
        });
    }, []);

    const { shouldRender, warning } = getRenderState({
        hasSection: Boolean(noteId),
        isAdmin,
        segmentationConfigError,
        segmentAndHide,
        ready,
        activeSegment: segment
    });

    if (warning) {
        return (
            <PageBuilderMessage type={warning.type} message={warning.message} />
        );
    }

    if (!shouldRender || !articles.length) return null;

    return (
        <div className="row">
            <div className="col-12">
                <section
                    className="keep-reading"
                    data-is-block="true"
                    data-block-name="n_segui_leyendo"
                    data-mrf-recirculation="n_segui_leyendo"
                    data-diagramacion-id="0"
                >
                    <SeguirLeyendo
                        relatedContent={articles}
                        outputType={outputType}
                    />
                </section>
            </div>
        </div>
    );
}

seguirLeyendo.label = 'LN-Nota-SeguirLeyendo';
seguirLeyendo.lazy = true;

seguirLeyendo.propTypes = {
    customFields: PropTypes.shape({
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

        controlSeparator: PropTypes.label.tag({
            label: '──────── CONTROL ────────',
            description: 'Configuración de la variante CONTROL.',
            group: SEGMENTATION_GROUP
        }),

        controlDigits: PropTypes.list.tag({
            label: 'Último dígito del Client ID',
            group: SEGMENTATION_GROUP
        })
    })
};

export default Consumer(seguirLeyendo);
