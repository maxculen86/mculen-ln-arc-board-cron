import {
    addToDataLayer,
    isInDatalayerEvent
} from '../../utils/videoPlayerHelper';

export function transformImages(data) {
    const transformedImages = data
        .filter(item => [480, 720, 1280].includes(item.width))
        .map(item => ({
            srcSet: item.src,
            ...(item.width === 480 && { maxWidth: 767 }),
            ...(item.width === 720 && { minWidth: 768 }),
            ...(item.width === 1280 && { minWidth: 1280 })
        }));

    return transformedImages;
}

export function formatJwPlayerDate(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);

    const formattedDate = date
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19);

    return formattedDate;
}

export const getJWScript = (title, player, playlist, hasAutoplay, idVideo) => `
${addToDataLayer}
${isInDatalayerEvent}
window.addEventListener('load', () => {
    const facadeDiv = document.getElementById('facade-${title}');

    const setJwScript = () => {    
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://cdn.jwplayer.com/libraries/${player}.js';
        document.head.appendChild(scriptElement);

        scriptElement.addEventListener('load', function() {
            window.jwplayer('${title}').setup({
                playlist: ${JSON.stringify(playlist)},
                autostart: true
            });

            ${handleVideoEventsScript(title, idVideo)}
        });

        if (facadeDiv) facadeDiv.remove();
    };    

    facadeDiv.addEventListener('click', setJwScript);

    if (${hasAutoplay}) {
        setJwScript();
    }

    addToDataLayer('videoDisplay', '${title}', '${idVideo}');
});
`;

export const handleVideoEventsScript = (title, idVideo) => `
    window.jwplayer('${title}').on('ready', function (e) {
        const element = document.querySelector('.video-player');
        element.classList.remove('--background');
    });

    const events = ['play', 'pause'];

    events.forEach((event) => {
        window.jwplayer('${title}').on(event, function (e) {
          addToDataLayer(event, '${title}', '${idVideo}');
        });
    });

    window.jwplayer('${title}').on('time', function (e) {
        const percent = Math.floor((e.currentTime / e.duration) * 100);
        const percentagesToCheck = [25, 50, 75];

        percentagesToCheck.forEach((percentage) => {
        if (!isInDatalayerEvent(percentage.toString(), '${idVideo}') && percent === percentage) {
            addToDataLayer(percentage.toString(), '${title}', '${idVideo}');
        }
        });
    });

    window.jwplayer('${title}').on('complete', function (e) {
        if (!isInDatalayerEvent('complete', '${idVideo}')) {
            addToDataLayer('complete', '${title}', '${idVideo}');
        }
    });
`;
