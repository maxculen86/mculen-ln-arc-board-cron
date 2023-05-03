import { dolarBox } from '../../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/boxes/dolarBox';
import { CardAnexo as cardAnexo } from '../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/cardAnexo/index';
describe('dolarBox LN10', () => {
    it('should return COTIZACIÓN HOY in uppercase', () => {
        const information = {
            title: 'test Title'
        };

        const box = dolarBox(information, 'section', 'typeSection');

        expect(box.tituloCaja).toBe('COTIZACIÓN HOY');
        expect(box.parameters.title).toBe('COTIZACIÓN HOY');
    });
    it('should return COTIZACIÓN HOY when information.title is empty', () => {
        const information = {
            title: ''
        };

        const box = dolarBox(information, 'section', 'typeSection');

        expect(box.tituloCaja).toBe('COTIZACIÓN HOY');
        expect(box.parameters.title).toBe('COTIZACIÓN HOY');
    });
    it('should return COTIZACIÓN HOY when information.title is undefined', () => {
        const information = {
            title: undefined
        };

        const box = dolarBox(information, 'section', 'typeSection');

        expect(box.tituloCaja).toBe('COTIZACIÓN HOY');
        expect(box.parameters.title).toBe('COTIZACIÓN HOY');
    });
});
