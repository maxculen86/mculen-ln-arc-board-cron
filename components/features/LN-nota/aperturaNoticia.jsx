import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Media from '../../private/LN/common/media';
import BuildScriptForZoom from '../../private/LN/common/utils/BuildScriptForZoom';
import { INFOGRAFIA } from '../../private/common/utils/subtypes/subtypeHelper';
import {
    getEpigrafe,
    getMediaData
} from '../../private/LN/common/utils/mediaHelper';

const AperturaNoticia = props => {
    const { globalContent, outputType, layout } = props;
    const { promo_items: promoItems = {}, subtype } = globalContent || {};
    const mediaData = getMediaData(promoItems, subtype);
    const { _id: idMedia, content } = mediaData || {};

    const Component = (
        <section className="mod-opening">
            {(() => {
                const {
                    headlines: { basic: tituloNota },
                    content_elements: contentElements = []
                } = globalContent || {};

                const firstText = contentElements.find(
                    element => element.type === 'text'
                );

                const scriptForZoom = outputType !== 'amp' && (
                    <BuildScriptForZoom
                        mediaData={mediaData}
                        subtype={subtype}
                    />
                );
                const { caption, credit } = getEpigrafe(mediaData);

                return (
                    <Media
                        mediaData={mediaData}
                        withZoom="--zoom"
                        idMedia={idMedia}
                        scriptForZoom={scriptForZoom}
                        autoplay={false}
                        isApertura
                        outputType={outputType}
                        parrafo={firstText || 'LA NACION'}
                        tituloNota={tituloNota}
                        subtype={subtype}
                        html={content}
                        layoutPageBuilder={layout}
                    >
                        <figcaption className="mod-figcaption">
                            {caption}
                            {credit}
                        </figcaption>
                    </Media>
                );
            })()}
        </section>
    );

    return (subtype === INFOGRAFIA && Component) || <div>{Component}</div>;
};

AperturaNoticia.label = 'LN-Nota-AperturaNoticia';

AperturaNoticia.propTypes = {
    id: PropTypes.string,
    outputType: PropTypes.string,
    globalContent: PropTypes.shape({
        promo_items: PropTypes.shape({
            basic: PropTypes.object
        }),
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        subtype: PropTypes.string,
        content_elements: PropTypes.arrayOf(PropTypes.shape())
    }),
    isApertura: PropTypes.bool
};

AperturaNoticia.defaultProps = {
    isApertura: true
};

export default Consumer(AperturaNoticia);
