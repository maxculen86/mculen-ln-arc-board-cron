import global from '../global.json';
const site = {
    title: 'LN+ Mirá todos los programas y videos online',
    className: {
        body: 'ott'
    },
    videoBaseUrl: '/program/video/',
    programBaseUrl: '/program/',
    getVideoUrl: id => `/program/video/${id}/`,
    organizationId: 'lanacionar',
    videoPlayer: {
        apiEnv: 'sandbox'
    }
};

export default { ...global, ...site };
