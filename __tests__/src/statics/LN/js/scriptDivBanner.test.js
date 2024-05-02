import { addCloseListenerToDivBanners } from '../../../../../src/statics/LN/js/scriptCloseBanners';

xdescribe('src - statics - LN - js - scriptCloseBanners', () => {
    test('addCloseListenerToDivBanners adds click event listener to close buttons', () => {
        document.body.innerHTML = `
            <div class="ln-banner" id="banner1">
                <button id="banner1_btnCloseAd">Close</button>
            </div>
            <div class="com-banner" id="banner2">
                <button id="banner2_btnCloseAd">Close</button>
            </div>
        `;
        addCloseListenerToDivBanners();

        const closeButton = document.getElementById('banner1_btnCloseAd');
        closeButton.click();

        const banner1 = document.querySelector('.ln-banner');
        expect(banner1.classList.contains('none')).toBe(true);
    });
});
