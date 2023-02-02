import fusionConsumer from 'fusion:consumer';
import CajaApertura from '../../../../components/chains/LN10_Caja_Apertura/default';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

describe('components - chains - LN10_Caja_Apertura - helper', () => {
    describe('helper - setFeaturedChildren', () => {
        it('Check Props', () => {});
    });
});
