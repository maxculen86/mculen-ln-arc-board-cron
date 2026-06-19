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

describe('EventsHelper setEventsGames', () => {
    let eventsHelper;

    beforeEach(() => {
        eventsHelper = new EventsHelper();
        eventsHelper.addEventToDataLayer = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = '';
    });

    it('should fire the jugar event when a data-game-link anchor is clicked', () => {
        document.body.innerHTML = `
            <a data-game-link="true" title="Juego Uno" href="#">Jugar</a>
        `;

        eventsHelper.setEventsGames();

        document
            .querySelector('[data-game-link="true"]')
            .dispatchEvent(new MouseEvent('click'));

        expect(eventsHelper.addEventToDataLayer).toHaveBeenCalledTimes(1);
        const payload = eventsHelper.addEventToDataLayer.mock.calls[0][0];
        expect(payload.action).toBe('jugar');
        expect(payload.category).toBe('juegos_ln10');
        expect(payload.label).toBe('jugar_juego_uno');
    });

    it('should not fire on podcast anchors when they share the .ln-card-games container', () => {
        document.body.innerHTML = `
            <div class="ln-card-games">
                <a data-videopodcast-link="true" title="Podcast Uno" href="#">Escuchar</a>
            </div>
        `;

        eventsHelper.setEventsGames();

        document.querySelector('a').dispatchEvent(new MouseEvent('click'));

        expect(eventsHelper.addEventToDataLayer).not.toHaveBeenCalled();
    });

    it('should bind the listener only once when setEventsGames runs multiple times', () => {
        document.body.innerHTML = `
            <a data-game-link="true" title="Juego Uno" href="#">Jugar</a>
        `;

        eventsHelper.setEventsGames();
        eventsHelper.setEventsGames();

        document
            .querySelector('[data-game-link="true"]')
            .dispatchEvent(new MouseEvent('click'));

        expect(eventsHelper.addEventToDataLayer).toHaveBeenCalledTimes(1);
    });
});

describe('EventsHelper setEventsVideoPodcast', () => {
    let eventsHelper;

    beforeEach(() => {
        eventsHelper = new EventsHelper();
        eventsHelper.addEventToDataLayer = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = '';
    });

    it('should fire the escuchar event when a data-videopodcast-link anchor is clicked', () => {
        document.body.innerHTML = `
            <a data-videopodcast-link="true" title="Podcast Con Tema" href="#">Escuchar</a>
        `;

        eventsHelper.setEventsVideoPodcast();

        document
            .querySelector('[data-videopodcast-link="true"]')
            .dispatchEvent(new MouseEvent('click'));

        expect(eventsHelper.addEventToDataLayer).toHaveBeenCalledTimes(1);
        const payload = eventsHelper.addEventToDataLayer.mock.calls[0][0];
        expect(payload.action).toBe('escuchar');
        expect(payload.category).toBe('podcast_ln10');
        expect(payload.label).toBe('escuchar_podcast_con_tema');
    });

    it('should bind the listener only once when setEventsVideoPodcast runs multiple times', () => {
        document.body.innerHTML = `
            <a data-videopodcast-link="true" title="Podcast Con Tema" href="#">Escuchar</a>
        `;

        eventsHelper.setEventsVideoPodcast();
        eventsHelper.setEventsVideoPodcast();

        document
            .querySelector('[data-videopodcast-link="true"]')
            .dispatchEvent(new MouseEvent('click'));

        expect(eventsHelper.addEventToDataLayer).toHaveBeenCalledTimes(1);
    });
});

describe('EventsHelper games/podcast coexistence', () => {
    let eventsHelper;

    beforeEach(() => {
        eventsHelper = new EventsHelper();
        eventsHelper.addEventToDataLayer = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = '';
    });

    it('should fire only escuchar and not jugar when a podcast lives under .ln-card-games', () => {
        document.body.innerHTML = `
            <div class="ln-card-games">
                <a data-videopodcast-link="true" title="Podcast Con Tema" href="#">Escuchar</a>
            </div>
        `;

        eventsHelper.setEventsGames();
        eventsHelper.setEventsVideoPodcast();

        document.querySelector('a').dispatchEvent(new MouseEvent('click'));

        expect(eventsHelper.addEventToDataLayer).toHaveBeenCalledTimes(1);
        expect(eventsHelper.addEventToDataLayer.mock.calls[0][0].action).toBe(
            'escuchar'
        );
    });
});
