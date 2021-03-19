import notaConfig from './nota';
import homeConfig from './home';
import acuConfig from './acumulado';
// import acuHomeConfig from './acumuladoHome';

export const getSlotsOptions = resolution =>
    Object.keys(slotsConfig)
        .map(v => Object.keys(slotsConfig[v]))
        .reduce((accumulator, value) => [
            ...new Set([...accumulator, ...value])
        ])
        .filter(c => c.endsWith(resolution) || c.endsWith('amp'))
        .sort();

export const slotsConfig = {
    nota: notaConfig,
    home: homeConfig,
    acumulado: acuConfig
    // acumuladoHome: acuHomeConfig
};

export const baseConfig = {
    bidding: {
        prebid: {
            enabled: true,
            timeout: 2000
        }
    }
};
