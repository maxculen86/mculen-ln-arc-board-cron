import getCustomTargeting from '../../../../../private/common/banners/helpers/getCustomTargeting';

const extractBannersMetadata = (device, subscription) => {
    const bannerNodes = document.querySelectorAll(
        `div[data-device="${device}"]`
    );

    const bannersVisible = [];
    const bannersHidden = [];

    bannerNodes.forEach(node => {
        const bannerData = {
            adUnitPath: node.dataset.adUnitPath,
            size: JSON.parse(node.dataset.size || '[]'),
            opt_div: node.id,
            sizemap: JSON.parse(node.dataset.sizemap || '[]'),
            prebidEnabled: node.dataset.prebidEnabled === 'true',
            targeting: JSON.parse(node.dataset.targeting || '{}'),
            slotGroup: node.dataset.slotGroup,
            hideForSubscriptor: node.dataset.subscription === 'true',
            withoutHide: node.dataset.withoutHide === 'true',
            customTargeting: getCustomTargeting({ bannerId: node.id }),
            ref: node
        };

        if (!(subscription && bannerData.hideForSubscriptor)) {
            if (bannerData.withoutHide) {
                bannersVisible.push(bannerData);
            } else {
                bannersHidden.push(bannerData);
            }
        }
    });

    return { bannersVisible, bannersHidden };
};

export default extractBannersMetadata;
