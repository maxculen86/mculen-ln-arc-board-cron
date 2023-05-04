import { titleBox } from '../../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/boxes/titleBox';
import { CardAnexo as cardAnexo } from '../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/cardAnexo/index';
describe('titleBox LN10', () => {
    it('should return titles in uppercase', () => {
        const typeSection = {
            alias1: 'valor1',
            alias2: 'valor2',
            alias3: 'valor3'
        };

        const sectionAliasMobile = 'alias1';

        const information = {
            title: 'test title'
        };
        const element = {
            information: information,
            sectionAliasMobile: sectionAliasMobile
        };

        const box = titleBox(element, typeSection);

        expect(box.tituloCaja).toBe('TEST TITLE');
        expect(box.parameters.title).toBe('TEST TITLE');
    });
    it('should return OPINIÓN when information.title is empty', () => {
        const typeSection = {
            alias1: 'valor1',
            alias2: 'valor2',
            alias3: 'valor3'
        };

        const sectionAliasMobile = 'alias1';

        const information = {
            title: ''
        };
        const element = {
            information: information,
            sectionAliasMobile: sectionAliasMobile
        };

        const box = titleBox(element, typeSection);

        expect(box.tituloCaja).toBe('OPINIÓN');
        expect(box.parameters.title).toBe('OPINIÓN');
    });
    it('should return OPINIÓN when information.title is undefined', () => {
        const typeSection = {
            alias1: 'valor1',
            alias2: 'valor2',
            alias3: 'valor3'
        };

        const sectionAliasMobile = 'alias1';

        const information = {
            title: undefined
        };
        const element = {
            information: information,
            sectionAliasMobile: sectionAliasMobile
        };

        const box = titleBox(element, typeSection);

        expect(box.tituloCaja).toBe('OPINIÓN');
        expect(box.parameters.title).toBe('OPINIÓN');
    });
});
