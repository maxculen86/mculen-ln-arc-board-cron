/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-fragments          */

import React from 'react';
import PropTypes from 'fusion:prop-types';

import BlockQuote from './blockQuote';
import Gallery from '../../common/carrousell';
import Image from './image';
import PullQuote from './pullQuote';
import Tags from './tags';
import ListOrderedOrUnordered from './listOrderedOrUnordered';
import Subtitle from './subtitle';
import Paragraph from './parrafo';
import Banner from '../../common/bannerRefactor';
import RawHTML from '../../common/rawHTML';
import OembedAMP from './oembedAMP';
import BotonLink from './botonLink';
import Html from './html';
import Video from './video';

const Cuerpo = props => {
    const {
        isAdmin,
        siteProperties,
        bannerConfig: banners,
        outputType,
        globalContent: { content_elements: contentElements, subtype }
    } = props;

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
        Html
    ];

    const types = ['text', 'image', 'oembed_response', 'video'];

    const getElementsCount = supportedTypes =>
        contentElements.filter(el => supportedTypes.includes(el.type)).length;

    const elementsCount = getElementsCount(types);

    const capitalIndex = contentElements.findIndex(v => v.type === 'text');

    let counter = 0;
    const output = contentElements.map((element, currentIndex) => {
        const Component = bodyComponents.find(bc => {
            if (element.type === 'quote') return bc.arcType === element.subtype;
            if (
                element.type === 'oembed_response' ||
                element.type === 'raw_html'
            ) {
                return (
                    bc.arcType === element.type && bc.outputType === outputType
                );
            }
            return bc.arcType === element.type;
        });

        const { arcType = '' } = Component || {};
        const extraProps =
            ['image', 'gallery'].findIndex(el => el === (arcType || '')) !== -1
                ? { withZoom: '--zoom' }
                : {};
        if (Component) {
            if (types.includes(Component.arcType)) {
                const { additional_properties: additionalProperties = {} } =
                    element || {};
                const { nodeType = {} } = additionalProperties || {};
                if (nodeType.length) return <></>;
                counter += 1;
                return (
                    <React.Fragment>
                        <Component
                            data={element}
                            capital={currentIndex === capitalIndex}
                            outputType={outputType}
                            {...extraProps}
                        />
                        {banners &&
                            banners.some(
                                banner => banner.position === counter
                            ) &&
                            banners
                                .filter(banner => banner.position === counter)
                                .map(value => {
                                    const data = {
                                        siteProperties,
                                        isAdmin,
                                        banner: {
                                            slotGroup: 'nota',
                                            selectedSlots: {
                                                desktopSlot: value.desktop,
                                                mobileSlot: value.mobile,
                                                tabletSlot: value.tablet
                                            },
                                            sticky: value.sticky,
                                            background: value.background
                                        }
                                    };

                                    return (
                                        elementsCount > counter && (
                                            <Banner {...data} />
                                        )
                                    );
                                })}
                    </React.Fragment>
                );
            }
            return (
                <Component
                    data={element}
                    capital={currentIndex === capitalIndex}
                    outputType={outputType}
                    {...extraProps}
                />
            );
        }

        return <></>;
    });
    return output;
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
        content_elements: PropTypes.node.isRequired
    }).isRequired
};

export default Cuerpo;
