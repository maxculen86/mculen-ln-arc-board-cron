// TODO: unificar aperturas decidiendo cual agarrar segun subtype
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import Media from '../../private/LN/common/media';
import {
    buildScriptForZoom,
    getEpigrafe
} from '../../private/LN/common/utils/mediaHelper';
import { VIDEO } from '../../private/common/utils/subtypes/subtypeHelper';
import { getViewport } from '../../private/LN/common/utils/homeHelper';

const aperturaNoticia = props => {
    const { globalContent, outputType, id: idFeature } = props;

    return (
        <Static id={idFeature} persistent>
            <section className="mod-opening">
                {(() => {
                    const {
                        promo_items: promoItems = {},
                        headlines: { basic: tituloNota },
                        content_elements: contentElements = [],
                        subtype
                    } = globalContent || {};
                    const {
                        basic,
                        apertura_multimedia: aperturaMultimedia
                    } = promoItems;

                    const { _id: idMedia, content, type } =
                        aperturaMultimedia || basic || {};
                    const firstText = contentElements.find(
                        element => element.type === 'text'
                    );
                    const scriptForZoom =
                        outputType !== 'amp' &&
                        buildScriptForZoom(
                            aperturaMultimedia || basic,
                            subtype
                        );
                    const { caption, credit } = getEpigrafe(
                        aperturaMultimedia || basic
                    );
                    const { isDesktop } = getViewport();
                    // const isDesktop = 'true';
                    const autoplay =
                        subtype === VIDEO && type === 'video' && isDesktop;
                    return (
                        <Media
                            mediaData={aperturaMultimedia || basic}
                            withZoom="--zoom"
                            idMedia={idMedia}
                            scriptForZoom={scriptForZoom}
                            isApertura
                            outputType={outputType}
                            parrafo={firstText || 'LA NACION'}
                            tituloNota={tituloNota}
                            subtype={subtype}
                            html={content}
                            autoplay={autoplay}
                        >
                            <figcaption className="mod-figcaption">
                                {caption}
                                {credit}
                            </figcaption>
                        </Media>
                    );
                })()}
            </section>
        </Static>
    );
};

aperturaNoticia.label = 'LN-Nota-AperturaNoticia';

aperturaNoticia.propTypes = {
    id: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        promo_items: PropTypes.shape({
            basic: PropTypes.object
        }),
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        subtype: PropTypes.string,
        content_elements: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object))
    }).isRequired
};

export default Consumer(aperturaNoticia);
