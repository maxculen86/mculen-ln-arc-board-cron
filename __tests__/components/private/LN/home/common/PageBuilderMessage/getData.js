import {
    getClass,
    getTitle
} from './../../../../../../../../components/private/LN/home/common/components/pageBuilderMessage/getData.jsx';

describe('Test de funcionalidad getData del componente - <PageBuilderMessage />', () => {
    const type = 'Custom';

    it('Función getClass con atributo danger', () => {
        expect(getClass('danger')).toBe('danger');
    });
    it('Función getClass con atributo warning', () => {
        expect(getClass('warning')).toBe('warning');
    });
    it('Función getClass con atributo info', () => {
        expect(getClass('info')).toBe('info');
    });
    it('Función getClass con atributo success', () => {
        expect(getClass('success')).toBe('success');
    });
    it('Función getTitle con atributo danger', () => {
        expect(getTitle('danger')).toBe('Error');
    });
    it('Función getTitle con atributo warning', () => {
        expect(getTitle('warning')).toBe('Advertencia');
    });
    it('Función getTitle con atributo info', () => {
        expect(getTitle('info')).toBe('Información');
    });
    it('Función getTitle con atributo success', () => {
        expect(getTitle('success')).toBe('Proceso exitoso');
    });
    it('Función getTitle con atributo cualquiera', () => {
        expect(getTitle(type)).toBe(type);
    });
});
