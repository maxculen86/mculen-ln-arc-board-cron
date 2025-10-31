/* eslint-disable operator-assignment */
import { getChildrenFromSectionHome } from '../../../LN/common/utils/cajaTemasHelperLN10-WebApi';
import homeConfig from '../../../../layouts/config/LN10-Home.config.json';
import {
    filterChildrenWithNoRoof,
    getSectionId,
    validateBanner,
    validateInterval,
    matchesEnabledDay
} from './getDynamicBannersHelper';
import get from '../../utils/get';

const getDynamicBanners = ({ renderables = [], featureId = '' }) => {
    const sectionId = getSectionId(renderables, featureId);
    const sectionConfig = sectionId && Object.entries(homeConfig)[sectionId];

    const [sectionName, sectionValues = {}] = sectionConfig || [];

    const sectionChildrenBase = filterChildrenWithNoRoof(
        getChildrenFromSectionHome(
            renderables,
            sectionName,
            sectionValues.position
        )
    );

    const sectionChildren = sectionChildrenBase.filter(matchesEnabledDay);

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

        if (validateInterval(sectionValues.intervalMob, index)) {
            currentBanner = currentBanner + 1;
        }

        return banner;
    }, {});

    return get(banners, featureId, {});
};

export default getDynamicBanners;
