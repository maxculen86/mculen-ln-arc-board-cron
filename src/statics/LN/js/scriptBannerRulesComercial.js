export const hideBannerComercial = () => {
    const scriptElement = document.getElementById('getScriptForComercial');

    if (scriptElement) {
        const slotId = scriptElement.getAttribute('data-slotId');

        setTimeout(() => {
            const bannerComercial = document.getElementById(`${slotId}`);
            bannerComercial && bannerComercial.parentNode.classList.add('none');
        }, 12000);
    }
};

hideBannerComercial();
