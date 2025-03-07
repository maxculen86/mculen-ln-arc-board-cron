import React, { useEffect } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import get from '../../private/common/utils/get';
import SeguirLeyendo from '../../private/LN/nota/seguirLeyendo';
import { articleBoxesTracker } from '../../private/common/utils/noteTracker/articleBoxesTracker';

function seguirLeyendo({ globalContent, outputType }) {
    const relatedContent = get(globalContent, 'related_content.basic', []);

    useEffect(() => {
        articleBoxesTracker({
            boxType: 'seguirLeyendo'
        });
    }, []);

    if (!relatedContent || !relatedContent.length) return null;

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
                        relatedContent={relatedContent}
                        outputType={outputType}
                    />
                </section>
            </div>
        </div>
    );
}

seguirLeyendo.label = 'LN-Nota-SeguirLeyendo';

seguirLeyendo.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string
    }).isRequired,
    outputType: PropTypes.string.isRequired
};

export default Consumer(seguirLeyendo);
