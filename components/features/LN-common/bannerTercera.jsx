import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Banner from '../../private/LN/common/banner';
import {
    getSlotsOptions,
    slotsConfig
} from '../../private/LN/common/banner/config';

const bannerTercera = ({
    siteProperties,
    isAdmin,
    customFields: { group, desktop, mobile, tablet, sticky, background },
    globalContent: { content_elements: contentElements },
    termicas
}) => {
    const { banners } = termicas || {};

    const paragraphsCount = contentElements.filter(el => el.type === 'text')
        .length;

    return (
        <>
            {paragraphsCount > 4 ? (
                <Banner
                    siteProperties={siteProperties}
                    isAdmin={isAdmin}
                    slotGroup={group}
                    devices={group}
                    selectedSlots={{
                        desktopSlot: desktop,
                        mobileSlot: mobile,
                        tabletSlot: tablet
                    }}
                    sticky={sticky}
                    background={background}
                    bannerTercera={paragraphsCount > 4}
                    banners={banners}
                />
            ) : (
                <></>
            )}
        </>
    );
};

bannerTercera.label = 'LN-Nota-Banner-Tercera';

bannerTercera.propTypes = {
    customFields: PropTypes.shape({
        group: PropTypes.oneOf(Object.keys(slotsConfig)).tag({
            label: 'Ubicacion'
        }).isRequired,
        desktop: PropTypes.oneOf(getSlotsOptions()),
        mobile: PropTypes.oneOf(getSlotsOptions()),
        tablet: PropTypes.oneOf(getSlotsOptions()),
        sticky: PropTypes.bool,
        background: PropTypes.bool
    }).isRequired
};

export default Consumer(bannerTercera);
