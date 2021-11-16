/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-fragments          */

import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import BlockQuote from './blockQuote';
import Gallery from '../../common/carrousell';
import Image from './image';
import PullQuote from './pullQuote';
import Tags from './tags';
import ListOrderedOrUnordered from './listOrderedOrUnordered';
import Subtitle from './subtitle';
import Paragraph from './parrafo';
import RawHTML from '../../common/rawHTML';
import OembedAMP from './oembedAMP';
import BotonLink from './botonLink';
import Html from './html';
import OptaAMP from './optaAMP';
import Video from './video';
import { setStorageConfiguration } from '../../../common/utils/storage';
import { FOTOAL100 } from '../../../common/utils/subtypes/subtypeHelper';
import powerUpsReceta from './powerUpsReceta';
import {
    getBannerConfiguration,
    suffixDevice
} from '../../common/utils/bannerHelper';
import DivBannerSSR from '../../../common/banners/DivBannerSSR';
import DivBannerAMP from '../../../common/banners/DivBannerAMP';

const Cuerpo = props => {
    const { bannerConfig: banners, outputType, globalContent } = props;

    const {
        _id,
        headlines: { basic: tituloNota },
        content_elements: contentElements,
        subtype
    } = globalContent || {};

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
        powerUpsReceta
    ];

    // TODO: Ver si este es el mejor lugar donde poner este script.
    // Setea valores en el Local Storage solo del lado del cliente
    useEffect(() => {
        try {
            setStorageConfiguration(_id);
        } catch (e) {
            console.error('Error en setear Local Storage');
        }
    }, [_id]);

    const types = ['text', 'image', 'oembed_response', 'video'];

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
            if (subtype === FOTOAL100) {
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
            image: { withZoom: '--zoom' },
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
                                .map(value => {
                                    // TODO: logica para nuevo banner
                                    const slotId =
                                        value.desktop ||
                                        value.mobile ||
                                        value.tablet ||
                                        '';

                                    const bannerConfiguration = getBannerConfiguration(
                                        globalContent,
                                        { group: 'nota' },
                                        {},
                                        {
                                            device: Object.keys(
                                                suffixDevice
                                            ).find(key =>
                                                slotId.includes(
                                                    suffixDevice[key]
                                                )
                                            ),
                                            slotId
                                        }
                                    );

                                    if (
                                        !bannerConfiguration ||
                                        (outputType === 'amp' &&
                                            !slotId.includes('_amp'))
                                    )
                                        return <></>;

                                    return (
                                        elementsCount > counter && (
                                            <Static id={slotId}>
                                                {outputType === 'amp' &&
                                                slotId.includes('_amp') ? (
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
                                            </Static>
                                        )
                                    );
                                })}
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
    outputType: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        content_elements: PropTypes.arrayOf(PropTypes.shape()).isRequired
    }).isRequired
};

export default Cuerpo;
