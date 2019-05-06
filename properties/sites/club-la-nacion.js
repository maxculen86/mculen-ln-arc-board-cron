import global from '../global.json';
const site = {
    title: 'Club la Nacion',
    className: {
        body: 'cln'
    },
    organizationId: 'lanacionar',
    videoPlayer: {
        apiEnv: 'sandbox'
    }
};

export default { ...global, ...site };
