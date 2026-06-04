import { EventsHelper } from '../../../../../src/statics/common/js/eventsHelper';

describe('EventsHelper setEventsRoof', () => {
    let eventsHelper;

    beforeEach(() => {
        eventsHelper = new EventsHelper();
        eventsHelper.addEventToDataLayer = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = '';
    });

    it('should use textContent as fallback when innerText is empty', () => {
        document.body.innerHTML = `
            <div roof-container="roof-container">
                <a roof-group="left" href="#">
                    <span>Some Roof Text</span>
                </a>
            </div>
        `;

        eventsHelper.setEventsRoof();

        const anchor = document.querySelector('a[roof-group="left"]');
        expect(anchor).not.toBeNull();
        anchor.dispatchEvent(new MouseEvent('click'));

        expect(eventsHelper.addEventToDataLayer).toHaveBeenCalled();
        const addEventCall = eventsHelper.addEventToDataLayer.mock.calls[0][0];
        expect(addEventCall.action).not.toMatch(/<[^>]+>/);
        expect(addEventCall.label).not.toMatch(/<[^>]+>/);
    });

    it('should never include HTML tags in tracking description', () => {
        document.body.innerHTML = `
            <div roof-container="roof-container">
                <a roof-group="left" href="#">
                    <img class="image_w-100_flex_--cover" decoding="async" alt="" src="logo.webp">
                </a>
            </div>
        `;

        eventsHelper.setEventsRoof();

        const anchor = document.querySelector('a[roof-group="left"]');
        expect(anchor).not.toBeNull();
        anchor.dispatchEvent(new MouseEvent('click'));

        expect(eventsHelper.addEventToDataLayer).toHaveBeenCalled();
        const addEventCall = eventsHelper.addEventToDataLayer.mock.calls[0][0];
        const action = addEventCall.action;
        const label = addEventCall.label;

        expect(action).not.toMatch(/<[^>]+>/);
        expect(label).not.toMatch(/<[^>]+>/);
    });

    it('should use roofTitle as fallback when description is empty', () => {
        document.body.innerHTML = `
            <div roof-container="roof-container">
                <a roof-group="left" href="#">
                    <h3></h3>
                    <i><img src="logo.webp" alt=""></i>
                </a>
                <div roof-group="right">
                    <img class="image" alt="juegos">
                </div>
            </div>
        `;

        eventsHelper.setEventsRoof();

        const anchor = document.querySelector('a[roof-group="left"]');
        expect(anchor).not.toBeNull();
        anchor.dispatchEvent(new MouseEvent('click'));

        expect(eventsHelper.addEventToDataLayer).toHaveBeenCalled();
        const addEventCall = eventsHelper.addEventToDataLayer.mock.calls[0][0];
        expect(addEventCall.action).not.toMatch(/<[^>]+>/);
        expect(addEventCall.action).toContain('juegos');
    });

    it('should use href section name as fallback when no alt or text', () => {
        document.body.innerHTML = `
            <div roof-container="roof-container">
                <a roof-group="left" href="https://www.lanacion.com.ar/juegos">
                    <h3></h3>
                    <i><img src="logo.webp" alt=""></i>
                </a>
            </div>
        `;

        eventsHelper.setEventsRoof();

        const anchor = document.querySelector('a[roof-group="left"]');
        expect(anchor).not.toBeNull();
        anchor.dispatchEvent(new MouseEvent('click'));

        expect(eventsHelper.addEventToDataLayer).toHaveBeenCalled();
        const addEventCall = eventsHelper.addEventToDataLayer.mock.calls[0][0];
        expect(addEventCall.action).not.toMatch(/<[^>]+>/);
        expect(addEventCall.action).toContain('juegos');
    });

    it('should resolve href from the anchor when the inner logo image is clicked', () => {
        document.body.innerHTML = `
            <div roof-container="roof-container">
                <a roof-group="left" href="https://www.lanacion.com.ar/juegos">
                    <h3></h3>
                    <i><img src="logo.webp" alt=""></i>
                </a>
            </div>
        `;

        eventsHelper.setEventsRoof();

        const img = document.querySelector('img');
        expect(img).not.toBeNull();
        // El usuario clickea la imagen interna, no el ancla: el evento burbujea
        img.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(eventsHelper.addEventToDataLayer).toHaveBeenCalled();
        const addEventCall = eventsHelper.addEventToDataLayer.mock.calls[0][0];
        expect(addEventCall.action).toContain('juegos');
        expect(addEventCall.label).toContain('juegos');
    });

    it('should handle logo image without alt text gracefully', () => {
        document.body.innerHTML = `
            <div roof-container="roof-container">
                <a roof-group="left" href="#">
                    <img src="logo.webp">
                </a>
            </div>
        `;

        eventsHelper.setEventsRoof();

        const anchor = document.querySelector('a[roof-group="left"]');
        expect(anchor).not.toBeNull();
        anchor.dispatchEvent(new MouseEvent('click'));

        expect(eventsHelper.addEventToDataLayer).toHaveBeenCalled();
        const addEventCall = eventsHelper.addEventToDataLayer.mock.calls[0][0];
        expect(addEventCall.action).not.toMatch(/<[^>]+>/);
        expect(addEventCall.label).not.toMatch(/<[^>]+>/);
    });
});
