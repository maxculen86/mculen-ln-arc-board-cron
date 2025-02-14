import { createScriptBanners } from '../../../../../components/features/foodit-global/Banners/_helpers/bannersScript';

describe('createScriptBanners', () => {
    it('should add the script if it does not exist', () => {
        document.body.innerHTML = '';
        createScriptBanners();

        const scriptElement = document.querySelector(
            'script[src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"]'
        );
        expect(scriptElement).not.toBeNull();
        expect(scriptElement.async).toBe(true);
    });

    it('should not add the script if it already exists', () => {
        document.body.innerHTML = '';
        const existingScript = document.createElement('script');
        existingScript.src =
            'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
        document.body.appendChild(existingScript);

        createScriptBanners();

        const scriptElements = document.querySelectorAll(
            'script[src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"]'
        );
        expect(scriptElements.length).toBe(1);
    });
});
