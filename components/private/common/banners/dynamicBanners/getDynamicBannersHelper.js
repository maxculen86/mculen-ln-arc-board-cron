import { isTodayEnabled } from '../../../../chains/LN10_Caja_Segmentada/_helpers';
import { getViewport } from '../../../LN/common/utils/homeHelper';
import get from '../../utils/get';
import bannersHome from '../bannersDivHome';

export const hasBomba = renderables =>
    Boolean(
        renderables
            .filter(ren => ren.collection === 'sections')
            .find(section =>
                section.children.find(
                    child =>
                        child.type === 'LN10_Caja_Bomba' &&
                        child.props.customFields.hideCaja !== true
                )
            )
    );

export const getSectionId = (renderables, featureId) => {
    const layoutSection = renderables
        .filter(ren => ren.collection === 'sections')
        .find(section =>
            section.children.find(child => child.props.id === featureId)
        );

    return get(layoutSection, 'props.id');
};

export const filterChildrenWithNoRoof = sectionChildren => {
    const { device } = getViewport();
    return device === 'mobile'
        ? sectionChildren
        : sectionChildren.filter(
              children => children.props.customFields.hideTitle !== true
          );
};

export const validateInterval = (interval, index) =>
    (index + 1) % interval === 0;

export const validateBanner = (
    index,
    renderables,
    sectionName,
    sectionValues,
    currentBanner,
    isMobile
) =>
    isMobile
        ? validateInterval(sectionValues.intervalMob, index) &&
          !(sectionName === 'Apertura' && hasBomba(renderables)) &&
          bannersHome[sectionValues.bannersMob[currentBanner]]
        : sectionValues.intervalDsk === index + 1 && bannersHome.billboard;

export const matchesEnabledDay = child => {
    const shouldSchedule = get(
        child,
        'props.customFields.shouldSchedule',
        false
    );
    if (!shouldSchedule) return true;

    const enabledDays = get(child, 'props.customFields.enabledDays', []);
    if (!Array.isArray(enabledDays) || enabledDays.length === 0) return false;

    return isTodayEnabled(enabledDays);
};
