import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import Banner from '../common/banner';

const CLASS_SCROLL_DOWN = '--showSticky';
class BannerSticky extends Component {
    lastScroll = 0;

    componentDidMount() {
        const sticky1 = document.getElementById('sticky1_mob');
        if (sticky1) {
            const wrap = document.getElementById('wrap');
            const sticky1Position =
                sticky1.offsetTop +
                (sticky1.clientHeight || sticky1.offsetHeight);
            window.addEventListener('scroll', () =>
                this.onScrollHandler(wrap, sticky1Position)
            );
        }
    }

    onScrollHandler = (wrap, sticky1Position) => {
        const sp = window.scrollY;
        if (sp > this.lastScroll && sp > sticky1Position)
            wrap.classList.add(CLASS_SCROLL_DOWN);
        else wrap.classList.remove(CLASS_SCROLL_DOWN);
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
