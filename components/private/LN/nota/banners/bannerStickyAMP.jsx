import React, { useEffect } from 'react';
import Consumer from 'fusion:consumer';
import Banner from '../../common/banner';

const CLASS_ACTIVE = '--active';

const BannerSticky = ({ outputType, isAdmin, siteProperties }) => {
    var lastScroll = 0;

    useEffect(() => {
        const contentMain = document.getElementByClassName('amp');
        const stickyAMP = document.getElementById('sticky_amp');
        if (stickyAMP && contentMain) {
            window.addEventListener('scroll', () =>
                onScrollHandler(stickyAMP, contentMain)
            );
        }
    });

    const onScrollHandler = (stickyAMP, contentMain) => {
        const sp = window.scrollY;
        const layPosition = contentMain.offsetTop;
        if (sp > lastScroll && sp > layPosition)
            stickyAMP.classList.add(CLASS_ACTIVE);
        else stickyAMP.classList.remove(CLASS_ACTIVE);
        lastScroll = sp;
    };

    return (
        <Banner
            siteProperties={siteProperties}
            slotGroup={outputType === 'amp' ? 'amp' : 'nota'}
            selectedSlots={{
                mobileSlot: 'sticky_amp'
            }}
            isAdmin={isAdmin}
            sticky
        />
    );
};

export default Consumer(BannerSticky);
