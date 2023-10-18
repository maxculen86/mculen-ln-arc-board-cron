import { titleBox } from '../../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10v2/boxes/titleBox';

describe('titleBox LN10v2', () => {
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

        expect(box.parameters.title).toBe('OPINIÓN');
    });
});
