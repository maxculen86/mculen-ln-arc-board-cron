/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import getQueryParamValue from '../utils/getQueryParamValue';
import { suffixDevice } from '../../LN/common/utils/bannerHelper';

const useAdsTestAndSuffix = (device, outputType) => {
    const [suffix, setSuffix] = useState();
    useEffect(() => {
        if (getQueryParamValue('adstest', window.location) === 'true') {
            googletag.cmd.push(() => {
                googletag.pubads().setTargeting('adstest', ['true']);
            });
        }
    }, []);
    useEffect(() => {
        if (outputType && device) setSuffix(suffixDevice[device]);
    }, [device, outputType]);

    return suffix;
};
export default useAdsTestAndSuffix;
