import global from '../global.json';
const site = {
    title: 'LN+ Mirá todos los programas y videos online',
    className: {
        body: 'ott'
    },
    organizationId: 'lanacionar',
    videoPlayer: {
        apiEnv: 'sandbox'
    }
};

export default { ...global, ...site };
