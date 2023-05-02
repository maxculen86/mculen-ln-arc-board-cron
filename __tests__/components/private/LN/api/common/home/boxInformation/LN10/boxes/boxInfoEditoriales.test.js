import { boxInfoEditorial } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoEditoriales';
import { boxInfoComplete } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoComplete';

describe('boxInfoEditorial', () => {
    it('should return boxInfoComplete with additional fields if boxInfoComplete is not falsy', () => {
        const information = {};
        const section = '';
        const typeSection = '';
        const box = {
            /* expected box object from boxInfoComplete */
        };
        const result = boxInfoEditorial(information, section, typeSection, box);

        expect(result).toMatchObject({
            ...boxInfoComplete(information, section, typeSection),
            tituloCaja: 'EDITORIALES',
            diagramacion: 'editoriales2',
            url: 'https://www.lanacion.com.ar/editoriales/',
            parameters: {
                title: 'EDITORIALES',
                url: 'https://www.lanacion.com.ar/editoriales/'
            }
        });
    });

    it('should return boxInfoComplete with additional fields and empty parameters if boxInfoComplete parameters is falsy', () => {
        const information = {};
        const section = '';
        const typeSection = '';
        const box = {
            /* expected box object from boxInfoComplete */ parameters: null
        };
        const result = boxInfoEditorial(information, section, typeSection, box);

        expect(result).toMatchObject({
            ...boxInfoComplete(information, section, typeSection),
            tituloCaja: 'EDITORIALES',
            diagramacion: 'editoriales2',
            url: 'https://www.lanacion.com.ar/editoriales/',
            parameters: {
                title: 'EDITORIALES',
                url: 'https://www.lanacion.com.ar/editoriales/'
            }
        });
    });

    it('should return boxInfoComplete with additional fields and merged parameters if boxInfoComplete parameters is not falsy', () => {
        const information = {};
        const section = '';
        const typeSection = '';
        const box = {
            /* expected box object from boxInfoComplete */
        };
        const result = boxInfoEditorial(information, section, typeSection, box);

        expect(result).toMatchObject({
            ...boxInfoComplete(information, section, typeSection),
            tituloCaja: 'EDITORIALES',
            diagramacion: 'editoriales2',
            url: 'https://www.lanacion.com.ar/editoriales/',
            parameters: {
                title: 'EDITORIALES',
                url: 'https://www.lanacion.com.ar/editoriales/'
            }
        });
    });
});
