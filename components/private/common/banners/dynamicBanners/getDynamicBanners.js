/* eslint-disable operator-assignment */
import { getChildrenFromSectionHome } from '../../../LN/common/utils/cajaTemasHelperLN10';
import homeConfig from '../../../../layouts/config/LN10-Home.config.json';
import {
    getSectionId,
    validateBanner,
    validateInterval
} from './getDynamicBannersHelper';
import get from '../../utils/get';

const getDynamicBanners = ({ renderables = [], featureId = '' }) => {
    const sectionConfig = Object.entries(homeConfig)[
        getSectionId(renderables, featureId)
    ];
    const [sectionName, sectionValues] = sectionConfig || {};

    const sectionChildren = getChildrenFromSectionHome(
        renderables,
        sectionName,
        sectionValues.position
    );

    let currentBanner = 0;

    const banners = sectionChildren.reduce((acu, curr, index) => {
        const banner = {
            ...acu,
            [curr.props.id]: {
                bannerMob: validateBanner(
                    index,
                    renderables,
                    sectionName,
                    sectionValues,
                    currentBanner,
                    true
                ),
                bannerDsk: validateBanner(
                    index,
                    renderables,
                    sectionName,
                    sectionValues
                )
            }
        };
        if (validateInterval(sectionValues.intervalMob, index))
            currentBanner = currentBanner + 1;
        return banner;
    }, {});

    return get(banners, featureId, {});
};

export default getDynamicBanners;
