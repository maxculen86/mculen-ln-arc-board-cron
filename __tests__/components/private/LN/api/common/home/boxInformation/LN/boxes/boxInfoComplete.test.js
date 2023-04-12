import { boxInfoComplete } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN/boxes/boxInfoComplete';
import * as information from '../../../../../../../../../../__mocks__/data/LN10_BoxInformation/information.json';
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
                    '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KXKPEAFIRZGT7PHAQ7RK2ZOGDE.JPG',
                absoluteUrl:
                    'https://resizer.glanacion.com/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/KXKPEAFIRZGT7PHAQ7RK2ZOGDE.JPG',
                parametros: [
                    {
                        media: 1280,
                        ancho: 560,
                        alto: 373,
                        firma:
                            'St345WHZ7M-ivyh4DePogW29w-k=/560x373/smart/filters:format(webp):quality(80)'
                    },
                    {
                        media: 1024,
                        ancho: 637,
                        alto: 424,
                        firma:
                            'Rx3JFxSgMONWXophvajfVYYPIQA=/637x424/smart/filters:format(webp):quality(80)'
                    },
                    {
                        media: 768,
                        ancho: 465,
                        alto: 310,
                        firma:
                            'TpAWRk_uqohJlLdbSYgbJlWVFDo=/465x310/smart/filters:format(webp):quality(80)'
                    },
                    {
                        media: 375,
                        ancho: 375,
                        alto: 250,
                        firma:
                            'P3s3-YCliwZt5e3Q-RDDQPWcVgM=/375x250/smart/filters:format(webp):quality(80)'
                    },
                    {
                        media: 320,
                        ancho: 320,
                        alto: 213,
                        firma:
                            'NO6XCiHmu6x51IbIMNSnNJd1AZQ=/320x213/smart/filters:format(webp):quality(80)'
                    }
                ]
            },
            imagenUrl:
                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/HFIF34USKFA4NFO3QFLQHPBEZI.png',
            actionButton: {
                title: 'Button text',
                url: 'https://example.com/button',
                style: 'Button style'
            },
            tituloCaja: 'Title',
            url: 'https://example.com'
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
