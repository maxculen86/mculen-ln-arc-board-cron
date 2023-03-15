import bannersHome from '../bannersDivHome';

export const hasBomba = renderables =>
    renderables
        .filter(ren => ren.collection === 'sections')
        .find(section =>
            section.children.find(
                child =>
                    child.type === 'LN10_Caja_Bomba' &&
                    child.props.customFields.hideCaja !== true
            )
        ) && true;

export const getSectionId = (renderables, featureId) =>
    renderables
        .filter(ren => ren.collection === 'sections')
        .find(section =>
            section.children.find(child => child.props.id === featureId)
        ).props.id;

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
