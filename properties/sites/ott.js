const site = {
    title: 'LN+ Mirá todos los programas y videos online',
    className: {
        body: 'ott'
    },
    videoBaseUrl: '/program/video/',
    getVideoUrl: id => `/program/video/${id}/`,
    tagManagerId: 'GTM-GHV6'
};

export default { ...site };
