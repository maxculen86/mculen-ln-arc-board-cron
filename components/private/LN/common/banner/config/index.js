import notaConfig from './nota';
import homeConfig from './home';
import acuConfig from './acumulado';

export const getSlotsOptions = () => {
    let opt = [];
    Object.keys(slotsConfig).forEach(v => {
        opt = opt.concat(Object.keys(slotsConfig[v]));
    });
    opt = opt.filter((v, i) => {
        return opt.indexOf(v) === i;
    });
    opt.push('NINGUNO');
    return opt;
};

export const slotsConfig = {
    nota: notaConfig,
    home: homeConfig,
    acumulado: acuConfig
};

export const baseConfig = {
    bidding: {
        prebid: {
            enabled: true,
            timeout: 2000
        }
    }
};
