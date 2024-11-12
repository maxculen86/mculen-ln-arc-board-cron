export const isInDatalayerEvent = (event, videoId) =>
    window &&
    window.dataLayer &&
    window.dataLayer.some(
        element => element.event === event && element.videoID === videoId
    );

export const addVideoDisplayEvent = ({ title, idVideo }) => {
    if (isInDatalayerEvent('videoDisplay', `${idVideo}`)) {
        return;
    }
    window &&
        window.dataLayer &&
        window.dataLayer.push({
            event: 'videoDisplay',
            videoName: `${title}`,
            videoID: `${idVideo}`
        });
};
