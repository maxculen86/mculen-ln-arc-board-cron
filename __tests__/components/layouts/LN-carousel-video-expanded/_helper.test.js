import loadJWPlayerScript from '../../../../components/chains/utils/loadJWPlayerScript';

describe('Components - layouts - CarouselVideoExpanded - helper - loadJWPlayerScript', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    const playerId = 'OSRCuuxn';

    it('should append a script element with correct src to the document body', () => {
        loadJWPlayerScript(playerId);

        const script = document.querySelector('script');
        expect(script).not.toBeNull();
        expect(script.src).toBe(
            `https://cdn.jwplayer.com/libraries/${playerId}.js`
        );
        expect(script.async).toBe(true);
    });

    it('should call onLoadCallback when script loads', () => {
        const onLoadCallback = jest.fn();

        loadJWPlayerScript(playerId, onLoadCallback);

        const script = document.querySelector('script');
        expect(script).not.toBeNull();

        script.onload();

        expect(onLoadCallback).toHaveBeenCalled();
    });
});
