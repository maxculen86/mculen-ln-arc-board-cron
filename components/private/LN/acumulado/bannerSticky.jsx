import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import Banner from '../common/banner';

const CLASS_ACTIVE = '--active';
class BannerSticky extends Component {
    lastScroll = 0;

    componentDidMount() {
        const contentMain = document.getElementById('content-main');
        const sticky2 = document.getElementById('sticky2_mob');
        if (sticky2 && contentMain) {
            window.addEventListener('scroll', () =>
                this.onScrollHandler(sticky2, contentMain)
            );
        }
    }

    onScrollHandler = (sticky2, contentMain) => {
        const sp = window.scrollY;
        const layPosition = contentMain.offsetTop;
        if (sp > this.lastScroll && sp > layPosition)
            sticky2.classList.add(CLASS_ACTIVE);
        else sticky2.classList.remove(CLASS_ACTIVE);
        this.lastScroll = sp;
    };

    render() {
        const { isAdmin, siteProperties } = this.props;
        return (
            <Banner
                siteProperties={siteProperties}
                slotGroup="acumulado"
                selectedSlots={{
                    mobileSlot: 'sticky2_mob'
                }}
                isAdmin={isAdmin}
                sticky
            />
        );
    }
}

export default Consumer(BannerSticky);
