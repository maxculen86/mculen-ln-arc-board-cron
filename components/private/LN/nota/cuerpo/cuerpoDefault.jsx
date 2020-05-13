/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-fragments          */

import React from 'react';
import PropTypes from 'fusion:prop-types';

import BlockQuote from './blockQuote';
import Gallery from '../../common/carrousell';
import Image from './image';
import Video from './video';
import Html from './html';
import PullQuote from './pullQuote';
import MasNotas from './masNotas';
import Tags from './tags';
import Ordered from './ordered';
import ListOrderedOrUnordered from './listOrderedOrUnordered';
import Subtitle from './subtitle';
import Paragraph from './parrafo';
import Banner from '../../common/bannerRefactor';

const Cuerpo = props => {
    const {
        isAdmin,
        siteProperties,
        bannerConfig: banners,
        outputType,
        globalContent: { taxonomy, content_elements: contentElements }
    } = props;

    const bodyComponents = [
        Paragraph,
        PullQuote,
        BlockQuote,
        Tags,
        Subtitle,
        Gallery,
        ListOrderedOrUnordered,
        Image
    ];

    const types = ['text', 'image', 'oembed_response', 'video'];

    const getElementsCount = supportedTypes =>
        contentElements.filter(el => supportedTypes.includes(el.type)).length -
        1;

    const elementsCount = getElementsCount(types);

    const capitalIndex = contentElements.findIndex(v => v.type === 'text');

    const output = contentElements.map((element, currentIndex) => {
        const Component = bodyComponents.find(bc => {
            if (element.type === 'quote') return bc.arcType === element.subtype;
            return bc.arcType === element.type;
        });

        const { arcType = '' } = Component || {};
        const extraProps =
            ['image', 'gallery'].findIndex(el => el === (arcType || '')) !== -1
                ? { withZoom: '--zoom' }
                : {};

        if (Component) {
            if (types.includes(Component.arcType)) {
                if (element.additional_properties.nodeType) return <></>;
                return (
                    <React.Fragment>
                        <Component
                            data={element}
                            capital={currentIndex === capitalIndex}
                        />
                        {banners &&
                            banners
                                .filter(
                                    banner => banner.position === currentIndex
                                )
                                .reduce((accumulator, value) => {
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
                                    return elementsCount > currentIndex ? (
                                        <Banner {...data} />
                                    ) : null;
                                }, [])}
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
