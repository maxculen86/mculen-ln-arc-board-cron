// TODO: unificar aperturas decidiendo cual agarrar segun subtype
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import StaticValidation from '../../private/common/staticValidation';
import Media from '../../private/LN/common/media';
import { INFOGRAFIA } from '../../private/common/utils/subtypes/subtypeHelper';
import {
    // buildScriptResizeSSRInfography,
    buildScriptForZoom,
    getEpigrafe
} from '../../private/LN/common/utils/mediaHelper';
import replaceUrlResizerToWWW from '../../../content/sources/utils/replaceUrlResizerToWWW';
import get from '../../private/common/utils/get';

const AperturaNoticia = props => {
    const { globalContent, outputType, id: idFeature } = props;
    const { promo_items: promoItems = {}, subtype } = globalContent || {};
    const { apertura_multimedia: aperturaMultimedia } = promoItems;
    const basic = replaceUrlResizerToWWW(get(promoItems, 'basic', {}));
    const { _id: idMedia, content } = aperturaMultimedia || basic || {};

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

                const scriptForZoom =
                    outputType !== 'amp' &&
                    buildScriptForZoom(aperturaMultimedia || basic, subtype);
                const { caption, credit } = getEpigrafe(
                    aperturaMultimedia || basic
                );

                return (
                    <Media
                        mediaData={aperturaMultimedia || basic}
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

    return (
        (subtype === INFOGRAFIA && Component) || (
            <StaticValidation id={idFeature} persistent>
                {Component}
            </StaticValidation>
        )
    );
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
