const isInDatalayerEvent = (event, videoId) => {
    const result =
        window &&
        window.dataLayer &&
        window.dataLayer.find(
            element => element.event === event && element.videoID === videoId
        );

    return result || false;
};

const addToDataLayer = (eventName, titulo, id) => {
    window.dataLayer.push({
        event: eventName,
        videoName: titulo,
        videoID: id
    });
};

const setJwScript = (
    playlist,
    idVideo,
    player,
    hasAutoplay,
    tagsUrl,
    title,
    facadeDiv
) => {
    const scriptElement = document.createElement('script');
    scriptElement.src = `https://cdn.jwplayer.com/libraries/${player}.js`;
    document.head.appendChild(scriptElement);

    scriptElement.addEventListener('load', function() {
        window.jwplayer(idVideo).setup(
            Object.assign(
                {
                    playlist: playlist,
                    autostart: true,
                    mute: hasAutoplay
                },
                player === 'ih0086X3' && tagsUrl
                    ? {
                          advertising: {
                              client: 'googima',
                              autoplayadsmuted: hasAutoplay,
                              schedule: [
                                  {
                                      tag: tagsUrl,
                                      offset: 'pre'
                                  }
                              ]
                          }
                      }
                    : {}
            )
        );

        const events = [
            { jwEvent: 'play', eventName: 'videoPlay' },
            { jwEvent: 'pause', eventName: 'videoPause' }
        ];

        events.forEach(event => {
            window.jwplayer(idVideo).on(event.jwEvent, function(e) {
                addToDataLayer(event.eventName, title, idVideo);
            });
        });

        window.jwplayer(idVideo).on('time', function(e) {
            const percent = Math.floor((e.currentTime / e.duration) * 100);
            const percentagesToCheck = [25, 50, 75];

            percentagesToCheck.forEach(percentage => {
                if (
                    !isInDatalayerEvent(percentage.toString(), idVideo) &&
                    percent === percentage
                ) {
                    addToDataLayer(percentage.toString(), title, idVideo);
                }
            });
        });

        window.jwplayer(idVideo).on('complete', function(e) {
            if (!isInDatalayerEvent('videoComplete', idVideo)) {
                addToDataLayer('videoComplete', title, idVideo);
            }
        });
    });

    if (facadeDiv) facadeDiv.remove();
};

export const getJWScript = ({
    title,
    player,
    playlist,
    hasAutoplay,
    idVideo,
    tagsUrl
}) => `
${addToDataLayer}
${isInDatalayerEvent}
${setJwScript}
window.addEventListener('load', () => {
    const facadeDiv = document.getElementById(\`facade-${idVideo}\`);

    if (facadeDiv) {
        facadeDiv.addEventListener('click', () => setJwScript(${JSON.stringify(
            playlist
        )}, '${idVideo}', '${player}', ${hasAutoplay}, '${tagsUrl}', '${title}', facadeDiv));
    }

    if (${hasAutoplay}) {
        setJwScript(${JSON.stringify(
            playlist
        )}, '${idVideo}', '${player}', ${hasAutoplay}, '${tagsUrl}', '${title}', facadeDiv);
    }

    addToDataLayer('videoDisplay', \`${title}\`, '${idVideo}');
});
`;
