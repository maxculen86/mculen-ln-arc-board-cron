import React, { useEffect } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import SeguirLeyendo from '../../private/LN/nota/seguirLeyendo';
import { articleBoxesTracker } from '../../private/common/utils/noteTracker/articleBoxesTracker';
// TODO hacer unit test, fix hooks y default props

function seguirLeyendo({ globalContent, outputType }) {
    const noteId = globalContent?._id;
    const { arcSite } = useAppContext();

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

    useEffect(() => {
        articleBoxesTracker({
            boxType: 'seguirLeyendo'
        });
    }, []);

    if (!articles.length) return null;

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
    globalContent: PropTypes.shape({ _id: PropTypes.string }).isRequired,
    outputType: PropTypes.string.isRequired
};

export default Consumer(seguirLeyendo);
