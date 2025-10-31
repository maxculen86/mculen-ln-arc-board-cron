import { boxInfoComplete } from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/common/boxInfoComplete';
import * as information from '../../../../../../../../../__mocks__/data/LN10_BoxInformation/information.json';
describe('boxInfoComplete', () => {
    it('returns null if information is not provided', () => {
        expect(boxInfoComplete(null)).toBeNull();
    });

    it('returns a complete box object', () => {
        const section = 'Section';
        const typeSection = { default: { type: 'default' } };

        const expectedResult = {
            type: 'default',
            diagramacion: 'Layout',
            imagen: {
                id: 'KXKPEAFIRZGT7PHAQ7RK2ZOGDE',
                _t: 'img',
                baseUrl:
                    'https://resizer.glanacion.com/resizer/St345WHZ7M-ivyh4DePogW29w-k=/560x373/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KXKPEAFIRZGT7PHAQ7RK2ZOGDE.JPG',
                absoluteUrl:
                    'https://resizer.glanacion.com/resizer/St345WHZ7M-ivyh4DePogW29w-k=/560x373/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KXKPEAFIRZGT7PHAQ7RK2ZOGDE.JPG'
            },
            imagenUrl:
                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/HFIF34USKFA4NFO3QFLQHPBEZI.png',
            tituloCaja: 'Title',
            url: 'https://example.com',
            chapita: 'Chapita',
            chapitaStyle: 'ChapitaStyle'
        };

        expect(boxInfoComplete(information, section, typeSection)).toEqual(
            expectedResult
        );
    });

    it('returns a box object without image or actionButton if information.hideTitle is true', () => {
        const information = {
            hideTitle: true
        };

        const section = 'Section';
        const typeSection = { default: { type: 'default' } };

        const expectedResult = {
            type: 'default',
            diagramacion: null
        };

        expect(boxInfoComplete(information, section, typeSection)).toEqual(
            expectedResult
        );
    });
});
