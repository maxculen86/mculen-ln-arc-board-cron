import React from 'react';
import Static from 'fusion:static';
import {
    getBannerConfiguration,
    suffixDevice
} from '../../common/utils/bannerHelper';
import DivBannerAMP from '../../../common/banners/DivBannerAMP';
import DivBannerSSR from '../../../common/banners/DivBannerSSR';

const Banner = props => {
    const {
        bannerConfig = [],
        globalContentConfig,
        outputType,
        globalContent
    } = props;

    const getBanner = index => {
        const position = index + 1;

        return bannerConfig
            .filter(banner => banner.position === position)
            .map(value => {
                const slotId =
                    value.desktop || value.mobile || value.tablet || '';

                const bannerConfiguration = getBannerConfiguration(
                    globalContent,
                    { group: 'acumulado' },
                    globalContentConfig,
                    {
                        device: Object.keys(suffixDevice).find(key =>
                            slotId.includes(suffixDevice[key])
                        ),
                        slotId
                    }
                );

                if (
                    !bannerConfiguration ||
                    (outputType === 'amp' && !slotId.includes('_amp')) ||
                    (outputType === 'default' && slotId.includes('_amp'))
                )
                    return <></>;

                return (
                    <Static id={slotId}>
                        {outputType === 'amp' && slotId.includes('_amp') ? (
                            <DivBannerAMP
                                bannerConfiguration={bannerConfiguration}
                            />
                        ) : (
                            <DivBannerSSR
                                bannerConfiguration={bannerConfiguration}
                            />
                        )}
                    </Static>
                );
            });
    };

    return getBanner;
};

export default Banner;
