export function createScript() {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src =
        'https://proxy.beyondwords.io/npm/@beyondwords/player@latest/dist/umd.js';
    return script;
}
export function createPlayer({
    idArticle,
    projectId,
    setSegmentIndex,
    setContentAvailable,
    setIsAudioPlaying
}) {
    // eslint-disable-next-line no-undef
    const player = new BeyondWords.Player({
        target: '.audio-player',
        projectId,
        sourceId: idArticle,
        playbackRates: [1, 1.25, 1.5, 1.7, 2],
        playbackState: 'playing',
        skipButtonStyle: 'auto',
        widgetStyle: 'none',
        playlistToggle: 'hide',
        logoIconEnabled: false,
        textColor: '#323232',
        backgroundColor: '#fefefe',
        iconColor: '#323232',
        highlightColor: 'none'
    });
    player.addEventListener('CurrentSegmentUpdated', e => {
        setSegmentIndex(e?.segmentIndex);
        const { segmentIndex: index } = e;
        const segmentsLength = player?.content[0]?.segments?.length;

        if (index > 1 && index < segmentsLength - 1) {
            player.playbackState = 'paused';
        }
    });

    player.addEventListener('PressedSegment', () => {
        player.playbackState = 'paused';
    });

    player.addEventListener('ContentAvailable', () =>
        setContentAvailable(true)
    );

    player.addEventListener('PlaybackPaused', () => setIsAudioPlaying(false));

    player.addEventListener('PlaybackPlaying', () => setIsAudioPlaying(true));

    player.addEventListener('NoContentAvailable', () => {
        console.error('Error no se encontro audio');
    });
    return player;
}

export function getSteps(contentElement) {
    const createStepList = (accumulator, currentValue) => {
        if (currentValue?.subtype === 'custom-preparacion') {
            const { titleList = '', items = [] } =
                currentValue?.embed?.config || {};
            const objectPreparacion = items.map((step, index) => ({
                indexList: index,
                showTitle: index === 0,
                titleList,
                step
            }));
            return [...accumulator, ...objectPreparacion];
        }
        return accumulator;
    };

    return contentElement.reduce(createStepList, []);
}
