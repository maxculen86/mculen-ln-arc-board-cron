import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import SeguirLeyendo from '../../private/LN/nota/seguirLeyendo';
import get from '../../private/common/utils/get';
import HeaderSection from '../../private/common/mod-headerSection';

// TODO: Reoptimizar este componente
const seguirLeyendo = ({ globalContent }) => {
    const removeVideo = content => content.filter(x => x && x.type !== 'video');
    const relatedContent = removeVideo(
        get(globalContent, 'related_content.basic', [])
    );

    if (relatedContent.every(con => con && con.type !== 'story')) return null;

    return (
        <Static id="LN-Nota-SeguirLeyendo">
            <div className="row">
                <div className="col-12">
                    <section
                        className="keep-reading"
                        data-is-block="true"
                        data-block-name="n_segui_leyendo"
                        data-diagramacion-id="0"
                    >
                        <HeaderSection title="Seguí leyendo" />
                        <SeguirLeyendo relatedContent={relatedContent} />
                    </section>
                </div>
            </div>
        </Static>
    );
};

seguirLeyendo.propTypes = {
    globalContent: PropTypes.shape({
        related_content: PropTypes.shape({
            basic: PropTypes.shape({
                headlines: PropTypes.shape({
                    basic: PropTypes.string
                })
            })
        })
    }).isRequired
};

seguirLeyendo.label = 'LN-Nota-SeguirLeyendo';

export default Consumer(seguirLeyendo);
