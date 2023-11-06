import {
    transformImages,
    formatJwPlayerDate,
    getJWScript,
    handleVideoEventsScript
} from '../../../../../../components/private/common/videoPlayerJw/utils/helperJw';

describe('Components - Private - Common - videoPlayerJw - Utils', () => {
    it('transforms images correctly', () => {
        const inputData = [
            { src: 'image1.jpg', width: 480 },
            { src: 'image2.jpg', width: 720 },
            { src: 'image3.jpg', width: 1280 },
            { src: 'image4.jpg', width: 1920 }
        ];

        const expectedOutput = [
            { srcSet: 'image1.jpg', maxWidth: 767 },
            { srcSet: 'image2.jpg', minWidth: 768 },
            { srcSet: 'image3.jpg', minWidth: 1280 }
        ];

        const transformedImages = transformImages(inputData);

        expect(transformedImages).toEqual(expectedOutput);
    });

    it('handles empty input data', () => {
        const inputData = [];
        const transformedImages = transformImages(inputData);
        expect(transformedImages).toEqual([]);
    });

    it('handles input data with non-matching widths', () => {
        const inputData = [
            { src: 'image1.jpg', width: 320 },
            { src: 'image2.jpg', width: 960 }
        ];

        const transformedImages = transformImages(inputData);
        expect(transformedImages).toEqual([]);
    });

    it('formats timestamp correctly', () => {
        const timestamp = 1630186800;

        const formattedDate = formatJwPlayerDate(timestamp);

        expect(formattedDate).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });

    it('generates the expected JWScript', () => {
        const title = 'videoPlayer';
        const player = 'jwplayer';
        const playlist = [{ file: 'video.mp4' }];
        const hasAutoplay = true;
        const idVideo = 'yPJ53Pzg';
        const tagsUrl = 'te_testjw';

        const expectedScript = `
        window.addEventListener('load', () => {
            const facadeDiv = document.getElementById(\`facade-${idVideo}\`);
        
            const setJwScript = () => {    
                const scriptElement = document.createElement('script');
                scriptElement.src = 'https://cdn.jwplayer.com/libraries/${player}.js';
                document.head.appendChild(scriptElement);
        
                scriptElement.addEventListener('load', function() {
                    window.jwplayer(\`${idVideo}\`).setup({
                        playlist: ${JSON.stringify(playlist)},
                        autostart: true,
                        mute: ${hasAutoplay},
                        ...('${player}' === 'ih0086X3'
                        ? {
                            advertising: {
                              client: "googima",
                              autoplayadsmuted: ${hasAutoplay},
                              schedule: [
                                {
                                  tag: "${tagsUrl}",
                                  offset: "pre"
                                }
                              ]
                            }
                          }
                        : {})
                    });
        
                    ${handleVideoEventsScript(title, idVideo)}
                });
        
                if (facadeDiv) facadeDiv.remove();
            };    
        
            facadeDiv.addEventListener('click', setJwScript);
        
            if (${hasAutoplay}) {
                setJwScript();
            }
        
            addToDataLayer('videoDisplay', \`${title}\`, '${idVideo}');
        });
        `;

        const generatedScript = getJWScript(
            title,
            player,
            playlist,
            hasAutoplay,
            idVideo,
            tagsUrl
        );
        expect(generatedScript.replace(/\s+/g, '')).toContain(
            expectedScript.replace(/\s+/g, '')
        );
    });

    it('tests handleVideoEventsScript function', () => {
        const title = 'videoPlayer';
        const idVideo = 'abc123';

        const expectedScript = `
        window.jwplayer(\`${idVideo}\`).on('ready', function (e) {
            const element = document.querySelector('.video-player');
            element.classList.remove('--background');
        });
    
        const events = [{jwEvent: 'play', eventName: 'videoPlay'}, {jwEvent: 'pause', eventName: 'videoPause'}];

        events.forEach((event) => {
        window.jwplayer(\`${idVideo}\`).on(event.jwEvent, function (e) {
          addToDataLayer(event.eventName, \`${title}\`, '${idVideo}');
        });
        });
    
        window.jwplayer(\`${idVideo}\`).on('time', function (e) {
            const percent = Math.floor((e.currentTime / e.duration) * 100);
            const percentagesToCheck = [25, 50, 75];
    
            percentagesToCheck.forEach((percentage) => {
            if (!isInDatalayerEvent(percentage.toString(), '${idVideo}') && percent === percentage) {
                addToDataLayer(percentage.toString(), \`${title}\`, '${idVideo}');
            }
            });
        });
    
        window.jwplayer(\`${idVideo}\`).on('complete', function (e) {
            if (!isInDatalayerEvent('videoComplete', '${idVideo}')) {
                addToDataLayer('videoComplete', \`${title}\`, '${idVideo}');
            }
        });
    `;

        expect(
            handleVideoEventsScript(title, idVideo).replace(/\s+/g, '')
        ).toContain(expectedScript.replace(/\s+/g, ''));
    });
});
