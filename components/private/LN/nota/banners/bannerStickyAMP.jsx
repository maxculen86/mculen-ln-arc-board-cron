import React from 'react';
import Consumer from 'fusion:consumer';
import Banner from '../../common/banner';

const BannerSticky = ({
    outputType,
    isAdmin,
    siteProperties,
    globalContent: { taxonomy }
}) => {
    return (
        <Banner
            siteProperties={siteProperties}
            slotGroup={outputType === 'amp' ? 'amp' : 'nota'}
            selectedSlots={{
                mobileSlot: 'sticky_amp',
                desktopSlot: 'sticky_amp'
            }}
            isAdmin={isAdmin}
            taxonomy={taxonomy}
        />
    );
};

export default Consumer(BannerSticky);
