import React from 'react';
import PropTypes from 'fusion:prop-types';

// Importo componente HARCODEADOS
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
import Banner from '../../common/banner';

// TODO: tests
const Cuerpo = props => {
    const {
        isAdmin,
        siteProperties,
        bannerConfig,
        outputType,
        globalContent: { content_elements: contentElements }
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

    const paragraphsCount = contentElements.filter(el => el.type === 'text')
        .length;

    let paragraphPosition = 0;

    const capitalIndex = contentElements.findIndex(v => v.type === 'text');

    const resp = contentElements.map((element, i) => {
        const Component = bodyComponents.find(bc => {
            if (element.type === 'quote') return bc.arcType === element.subtype;
            return bc.arcType === element.type;
        });
        if (Component) {
            if (Component.arcType === 'text') {
                paragraphPosition += 1;
                return (
                    <>
                        <Component
                            data={element}
                            capital={capitalIndex === i}
                        />
                        {bannerConfig &&
                            paragraphsCount > 1 &&
                            bannerConfig.map(banner => {
                                if (banner.position === paragraphPosition) {
                                    return (
                                        <>
                                            <Banner
                                                siteProperties={siteProperties}
                                                isAdmin={isAdmin}
                                                slotGroup="nota"
                                                devices="nota"
                                                selectedSlots={{
                                                    desktopSlot: banner.desktop,
                                                    mobileSlot: banner.mobile,
                                                    tabletSlot: banner.tablet
                                                }}
                                                sticky={banner.sticky}
                                                background={banner.background}
                                            />
                                        </>
                                    );
                                }
                                return null;
                            })}
                    </>
                );
            }
            return (
                <Component
                    data={element}
                    capital={capitalIndex === i}
                    outputType={outputType}
                />
            );
        }

        return <></>;
    });
    return resp;
};

Cuerpo.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.node.isRequired
    }).isRequired
};

export default Cuerpo;
