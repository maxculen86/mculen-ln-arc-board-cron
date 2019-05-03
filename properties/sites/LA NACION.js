import global from '../global.json';
const site = {
    title: 'LA NACION',
    className: {
        body: 'ln'
    },
    organizationId: 'lanacionar',
    videoPlayer: {
        apiEnv: 'sandbox'
    }
};

export default { ...global, ...site };
