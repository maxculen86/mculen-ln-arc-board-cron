export const addCloseListenerToDivBanners = () => {
    const bannerElements = document.querySelectorAll('.ln-banner, .com-banner');

    if (bannerElements) {
        bannerElements.forEach(banner => {
            const slotId = banner.getAttribute('id');
            const closeButton = document.getElementById(`${slotId}_btnCloseAd`);

            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    const parentNode = this.parentNode;
                    parentNode && parentNode.classList.add('none');
                });
            }
        });
    }
};

addCloseListenerToDivBanners();
