export const hideBannerComercial = slotId => {
    setTimeout(() => {
        const bannerComercial = document.getElementById(slotId);
        bannerComercial && bannerComercial.parentNode.classList.add('none');
    }, 12000);
};

hideBannerComercial('comercial_mob');
hideBannerComercial('comercial_dsk');
