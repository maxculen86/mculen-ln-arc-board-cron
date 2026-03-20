import React, { useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import get from '../../../../private/common/utils/get';
import useViewportSize from '../../../../private/common/hooks/useViewportSize';
import dispatchAdsRequest from './_helpers/dispatchAdsRequest';
import useAdsTestAndSuffix from '../../../../private/common/hooks/useAdsTestAndSuffix';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../private/common/auth/helper/loginHelper';
import extractBannersMetadata from './_helpers/extracBannersData';
import createAdsObserver from './_helpers/createAdsObserver';

let isCalledBannersHidden = false;

function AdsManager() {
    const {
        outputType,
        isAdmin,
        globalContentConfig,
        globalContent = {}
    } = useAppContext();
    const device = useViewportSize();
    const subscription = isSubscribed(SUBSCRIBED_HELPER.LN);

    const bannersDisabled =
        get(globalContentConfig, 'query.banners_disabled', 'false') === 'true';

    const suffix = useAdsTestAndSuffix(device, outputType);
    const subtype = get(globalContent, 'subtype', '');

    useEffect(() => {
        try {
            if (suffix && device && !isAdmin && !bannersDisabled) {
                const { bannersVisible, bannersHidden } =
                    extractBannersMetadata(device, subscription);

                if (bannersVisible.length !== 0 && !isCalledBannersHidden) {
                    dispatchAdsRequest(bannersHidden);
                    isCalledBannersHidden = true;
                }

                createAdsObserver(bannersVisible);
            }
        } catch (error) {
            console.error('🚀 ~ file: AdsManager.jsx  ~ error', error);
        }
    }, [
        device,
        isAdmin,
        suffix,
        outputType,
        subscription,
        bannersDisabled,
        subtype
    ]);

    return <div className="hlp-none hidden">Cargando banners ...</div>;
}

export default AdsManager;
