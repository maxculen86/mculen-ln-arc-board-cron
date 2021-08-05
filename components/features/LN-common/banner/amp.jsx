/* eslint-disable react/require-default-props */

import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Placeholder from '../../../private/LN/common/bannerRefactor/placeholder';
import { slotsConfig } from '../../../private/LN/common/bannerRefactor/config';
import { getBannerConfiguration } from '../../../private/LN/common/utils/bannerHelper';
import { getTargetingFormat } from '../../../private/LN/common/bannerRefactor/decorators/utils';

const BannerSSR = props => {
    const { isAdmin, customFields, globalContent, globalContentConfig } = props;

    const { sticky, amp } = customFields;

    if (!amp) return <></>;

    const { taxonomy } = globalContent;

    const { sections, tags } = taxonomy || {
        sections: [],
        tags: []
    };

    const targeting = getTargetingFormat(sections)(tags);

    // TODO: validar banners para nota, acu

    const bannerConfiguration = getBannerConfiguration(
        globalContent,
        customFields,
        globalContentConfig
    );
    console.log(
        '🚀 ~ file: banner.jsx ~ AMP line 66 ~ bannerConfiguration',
        bannerConfiguration
    );

    if (!bannerConfiguration) return <></>;

    if (isAdmin && bannerConfiguration) {
        return (
            <Placeholder
                slotName={bannerConfiguration.slotName}
                dimensions={bannerConfiguration.dimensions}
                targeting={bannerConfiguration.targeting}
            />
        );
    }

    if (
        Object.values(bannerConfiguration.show).some(
            element => element === false
        )
    )
        return <></>;

    const { slotId, slotName, dimensions } = bannerConfiguration;

    const comp = (
        <amp-ad
            id={`${slotId}`}
            type="doubleclick"
            class="banner"
            width={dimensions.width}
            height={dimensions.height}
            data-slot={slotName}
            json={`${targeting}`}
        />
    );

    return (
        <div className={`row ${sticky ? 'sticky-amp' : ''}`}>
            <div className="col-12">
                <div
                    className={`--bg-banner ${sticky ? 'hlp-desksm-none' : ''}`}
                >
                    {sticky ? (
                        <amp-sticky-ad layout="nodisplay">{comp}</amp-sticky-ad>
                    ) : (
                        comp
                    )}
                </div>
            </div>
        </div>
    );
};

BannerSSR.label = 'LN-Common-Banner';

BannerSSR.propTypes = {
    customFields: PropTypes.shape({
        group: PropTypes.oneOf(Object.keys(slotsConfig)).tag({
            label: 'Ubicacion'
        }).isRequired,
        device: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
        slot: PropTypes.oneOf([
            'comercial',
            'adhesion',
            'megatop',
            '1x1',
            'cabezal',
            'caja1',
            'caja2',
            'caja3',
            'caja4',
            'caja5',
            'inread',
            'middle_1',
            'middle_2',
            'middle_3',
            'middle_teads',
            'sticky1',
            'sticky2'
        ]),
        // desktop: PropTypes.oneOf(getSlotsOptions('dsk')),
        // mobile: PropTypes.oneOf(getSlotsOptions('mob')),
        // tablet: PropTypes.oneOf(getSlotsOptions('tab')),
        sticky: PropTypes.bool,
        background: PropTypes.bool,
        fixed: PropTypes.bool,
        amp: PropTypes.bool
    }),
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    }),
    isAdmin: PropTypes.bool,
    globalContent: PropTypes.shape({
        label: PropTypes.shape({
            mostrar_banners: PropTypes.shape({
                text: PropTypes.string
            })
        }),
        termicas: PropTypes.shape({
            banners: PropTypes.string
        }),
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(PropTypes.node),
            tags: PropTypes.arrayOf(PropTypes.node)
        })
    }),
    globalContentConfig: PropTypes.shape({
        query: PropTypes.shape({
            id: PropTypes.string
        })
    })
};

export default Consumer(BannerSSR);
