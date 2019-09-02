import React from 'react';
import Consumer from 'fusion:consumer';
import Banner from '../common/banner';
import WithScreenUtils from '../../common/hocs/withScreenUtils';

function BannerCaja1(props) {
    const { siteProperties, isAdmin, screenUtils } = props;
    const deviceClass = `--${screenUtils.device}`;
    return (
        <div className={`banner --large ${deviceClass}`}>
            <Banner
                siteProperties={siteProperties}
                slotGroup="acumulado"
                selectedSlots={{
                    desktopSlot: 'caja1_dsk',
                    mobileSlot: 'caja1_mob',
                    tabletSlot: 'caja1_tab'
                }}
                isAdmin={isAdmin}
                sticky={false}
                background
            />
        </div>
    );
}

export default Consumer(WithScreenUtils(BannerCaja1));
