// TODO: unificar aperturas decidiendo cual agarrar segun subtype
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import StaticValidation from '../../private/common/staticValidation';
import Media from '../../private/LN/common/media';
import {
    INFOGRAFIA,
    VIDEO
} from '../../private/common/utils/subtypes/subtypeHelper';
import {
    buildScriptResizeSSRInfography,
    buildScriptForZoom,
    getEpigrafe
} from '../../private/LN/common/utils/mediaHelper';
import { getViewport } from '../../private/LN/common/utils/homeHelper';

const aperturaNoticia = props => {
    const { globalContent, outputType, id: idFeature } = props;
    const { promo_items: promoItems = {}, subtype } = globalContent || {};
    const { basic, apertura_multimedia: aperturaMultimedia } = promoItems;
    const { _id: idMedia, content, type: _type } =
        aperturaMultimedia || basic || {};
    const { isDesktop } = getViewport();
    const isVideo = subtype === VIDEO && _type === 'video';

    const scriptForResizeSSRInfography = buildScriptResizeSSRInfography(
        promoItems,
        subtype
    );

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
                        autoplay={isVideo && isDesktop}
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
        (isVideo && Component) || (
            <StaticValidation id={idFeature} persistent>
                <>
                    {Component}
                    {scriptForResizeSSRInfography}
                </>
            </StaticValidation>
        )
    );
};

aperturaNoticia.label = 'LN-Nota-AperturaNoticia';

aperturaNoticia.propTypes = {
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

aperturaNoticia.defaultProps = {
    isApertura: true
};

export default Consumer(aperturaNoticia);
