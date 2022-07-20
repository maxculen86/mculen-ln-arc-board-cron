/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-fragments          */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import StaticValidation from '../../../common/staticValidation';
import Paragraph from './parrafo';
import PullQuote from './pullQuote';
import BlockQuote from './blockQuote';
import Tags from './tags';
import Subtitle from './subtitle';
import Gallery from '../../common/carrousell';
import ListOrderedOrUnordered from './listOrderedOrUnordered';
import Image from './image';
import Video from './video';
import RawHTML from '../../common/rawHTML';
import OembedAMP from './oembedAMP';
import BotonLink from './botonLink';
import Html from './html';
import OptaAMP from './optaAMP';
import powerUpsReceta from './powerUpsReceta';
import Parallax from './powerUpParallax';
import HtmlAMP from './htmlAMP';
import Divider from './divider';
import DivBannerSSR from '../../../common/banners/DivBannerSSR';
import DivBannerAMP from '../../../common/banners/DivBannerAMP';
import { setStorageConfiguration } from '../../../common/utils/storage';
import { FOTOAL100 } from '../../../common/utils/subtypes/subtypeHelper';
import {
    getBannerConfiguration,
    suffixDevice
} from '../../common/utils/bannerHelper';

const Cuerpo = props => {
    const { bannerConfig: banners, outputType, globalContent = {} } = props;

    const {
        _id,
        headlines: { basic: tituloNota },
        content_elements: contentElements,
        subtype,
        website_url: websiteUrl
    } = globalContent;

    const bodyComponents = [
        Paragraph,
        PullQuote,
        BlockQuote,
        Tags,
        Subtitle,
        Gallery,
        ListOrderedOrUnordered,
        Image,
        Video,
        RawHTML,
        OembedAMP,
        BotonLink,
        Html,
        OptaAMP,
        powerUpsReceta,
        Parallax,
        HtmlAMP,
        Divider
    ];

    useEffect(() => {
        try {
            setStorageConfiguration(_id);
        } catch (e) {
            console.error('Error en setear Local Storage, CuerpoDefault', {
                error: e,
                outputType,
                IdNota: _id,
                websiteUrl
            });
        }
    }, [_id, outputType, websiteUrl]);

    const types = ['text', 'image', 'oembed_response', 'video', 'divider'];

    const getElementsCount = supportedTypes =>
        contentElements.filter(el => supportedTypes.includes(el.type)).length;

    const elementsCount = getElementsCount(types);

    const capitalIndex = contentElements.findIndex(v => v.type === 'text');

    let counter = 0;

    return contentElements.map((element, currentIndex) => {
        const {
            type: _type,
            subtype: _subtype,
            content,
            additional_properties: { nodeType = {} } = {}
        } = element || {};
        const Component = bodyComponents.find(bc => {
            if (subtype === FOTOAL100 && _subtype !== 'custom-parallax') {
                return (
                    !(
                        _type === 'oembed_response' ||
                        _type === 'raw_html' ||
                        _type === 'video'
                    ) && bc.arcType === _type
                );
            }
            if (_type === 'quote') return bc.arcType === _subtype;
            if (
                content &&
                content.includes('opta-widget') &&
                _type === 'raw_html' &&
                outputType === 'amp'
            ) {
                return bc.arcType === _type && bc.outputType === 'opta';
            }
            if (
                content &&
                content.includes('iframe') &&
                _type === 'raw_html' &&
                outputType === 'amp'
            ) {
                return bc.arcType === _type && bc.outputType === 'amp';
            }
            if (_type === 'oembed_response' || _type === 'raw_html') {
                return bc.arcType === _type && bc.outputType === outputType;
            }
            if (_type === 'custom_embed') {
                return bc.arcType === _subtype;
            }
            return bc.arcType === _type;
        });

        const { arcType = '' } = Component || {};
        const extraProps = {
            image: { withZoom: '--zoom', insideBody: true },
            gallery: { withZoom: '--zoom' },
            video: {
                tituloNota,
                primerParrafo:
                    (capitalIndex && contentElements[capitalIndex]) || ''
            }
        };
        const _BaseComp = (Component && (
            <Component
                data={element}
                capital={currentIndex === capitalIndex}
                outputType={outputType}
                {...(extraProps[arcType] || {})}
            />
        )) || <></>;

        const _Comp = _BaseComp;

        if (Component) {
            if (types.includes(Component.arcType)) {
                if (nodeType.length) return <></>;
                counter += 1;
                return (
                    <>
                        {_Comp}
                        {banners &&
                            banners.some(
                                banner => banner.position === counter
                            ) &&
                            banners
                                .filter(banner => banner.position === counter)
                                .map(
                                    ({
                                        desktop = '',
                                        mobile = '',
                                        tablet = ''
                                    } = {}) => {
                                        return [desktop, mobile, tablet].map(
                                            slotId => {
                                                const bannerConfiguration =
                                                    slotId &&
                                                    getBannerConfiguration(
                                                        globalContent,
                                                        { group: 'nota' },
                                                        {},
                                                        {
                                                            device: Object.keys(
                                                                suffixDevice
                                                            ).find(key =>
                                                                slotId.includes(
                                                                    suffixDevice[
                                                                        key
                                                                    ]
                                                                )
                                                            ),
                                                            slotId
                                                        }
                                                    );

                                                if (
                                                    !bannerConfiguration ||
                                                    (outputType === 'amp' &&
                                                        !slotId.includes(
                                                            '_amp'
                                                        ))
                                                )
                                                    return <></>;
                                                return (
                                                    elementsCount > counter && (
                                                        <StaticValidation
                                                            id={slotId}
                                                            htmlOnly
                                                            persistent
                                                        >
                                                            {outputType ===
                                                                'amp' &&
                                                            slotId.includes(
                                                                '_amp'
                                                            ) ? (
                                                                <DivBannerAMP
                                                                    bannerConfiguration={
                                                                        bannerConfiguration
                                                                    }
                                                                />
                                                            ) : (
                                                                <DivBannerSSR
                                                                    bannerConfiguration={
                                                                        bannerConfiguration
                                                                    }
                                                                />
                                                            )}
                                                        </StaticValidation>
                                                    )
                                                );
                                            }
                                        );
                                    }
                                )}
                    </>
                );
            }
            return _Comp;
        }

        return <></>;
    });
};

Cuerpo.propTypes = {
    isAdmin: PropTypes.bool,
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    }).isRequired,
    outputType: PropTypes.string,
    globalContent: PropTypes.shape({
        content_elements: PropTypes.arrayOf(PropTypes.shape()).isRequired
    }).isRequired
};

Cuerpo.defaultProps = {
    outputType: 'default'
};

export default Cuerpo;
