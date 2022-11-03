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
        customFields,
        globalContentConfig,
        outputType,
        globalContent
    } = props;

    const getBannerConfig = () => {
        const optionsSet = Object.keys(customFields);
        const NOT_NUMBERS = /\d+/g;

        const numberGroups = optionsSet
            .filter(option => option.startsWith('position'))
            .map(option => option.match(NOT_NUMBERS)[0]);

        return numberGroups.map(number => {
            const configKeys = optionsSet.filter(
                option =>
                    option.match(NOT_NUMBERS) &&
                    option.match(NOT_NUMBERS)[0].length === number.length &&
                    option.endsWith(number)
            );

            const configOpt = {};

            configKeys.forEach(configKey => {
                configOpt[configKey.replace(NOT_NUMBERS, '')] =
                    customFields[configKey];
            });

            return configOpt;
        });
    };

    const bannerConfig = getBannerConfig() || [];

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
