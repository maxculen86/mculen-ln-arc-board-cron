import React from 'react';
import { useAppContext } from 'fusion:context';
import AdsManager from '../default';
import LoadBannersSSR from '../../../../../private/common/banners/LoadBannersSSR';
import isAllowedSection from '../../../../../private/LN/common/utils/isAllowedSection';

const listOfAllowedSection = [{ section: '/salud' }];
// TODO: Una vez que se migren todas las secciones, eliminar el isAllowedSection y mostrar siempre AdsManager
function AdsStrategySelector() {
    const { globalContent } = useAppContext() || {};

    if (isAllowedSection({ globalContent, listOfAllowedSection })) {
        return <AdsManager />;
    }
    return <LoadBannersSSR />;
}

export default AdsStrategySelector;
