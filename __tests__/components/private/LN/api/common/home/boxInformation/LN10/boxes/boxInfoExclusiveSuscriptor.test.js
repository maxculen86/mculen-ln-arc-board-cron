import * as boxInfoComplete from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoComplete';
import boxInfoExclusiveSuscriptor from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoExclusiveSuscriptor';

describe('boxInfoExclusiveSuscriptor', () => {
    it('should assign default title to box if no title is provided', () => {
        const information = {
            subtitle: 'A subtitle'
        };
        const section = 'someSection';
        const typeSection = 'someTypeSection';
        const box = boxInfoExclusiveSuscriptor(
            information,
            section,
            typeSection
        );
        expect(box).toBeDefined();
        expect(box.parameters.title).toBe('EXCLUSIVO SUSCRIPTORES');
    });

    it('should assign default title to box parameters if no title is provided', () => {
        const information = {
            tituloCaja: 'A box title'
        };
        const section = 'someSection';
        const typeSection = 'someTypeSection';
        const box = boxInfoExclusiveSuscriptor(
            information,
            section,
            typeSection
        );
        expect(box).toBeDefined();
        expect(box.tituloCaja).toBe('EXCLUSIVO SUSCRIPTORES');
    });

    it('should set buttonText and linkButton of information to null', () => {
        const information = {
            title: 'titulo',
            buttonText: 'Botón',
            linkButton: 'https://www.example.com',
            image: {
                promo_items: {
                    basic: {
                        additional_properties: {
                            originalUrl: 'https://www.example.com/image.jpg'
                        }
                    }
                }
            }
        };

        const expectedBox = {
            parameters: {}
        };
        const box = boxInfoExclusiveSuscriptor(
            information,
            'section',
            'typeSection'
        );
        expect(information.buttonText).toBeNull();
        expect(information.linkButton).toBeNull();
        expect(box).toMatchObject(expectedBox);
    });
    it('should call boxInfoComplete with modified information', () => {
        const information = {
            title: 'titulo',
            buttonText: 'Botón',
            linkButton: 'https://www.example.com',
            image: {
                promo_items: {
                    basic: {
                        additional_properties: {
                            originalUrl: 'https://www.example.com/image.jpg'
                        }
                    }
                }
            }
        };

        const expectedBox = {
            tituloCaja: 'TITULO',
            imageUrl: 'https://www.example.com/image.jpg',
            parameters: {
                title: 'TITULO',
                url: undefined,
                badge: undefined,
                badgeStyle: undefined
            }
        };

        const boxInfoCompleteSpy = jest.spyOn(
            boxInfoComplete,
            'boxInfoComplete'
        );
        const box = boxInfoExclusiveSuscriptor(
            information,
            'section',
            'typeSection'
        );

        expect(boxInfoCompleteSpy).toHaveBeenCalledWith(
            { ...information, buttonText: null, linkButton: null },
            'section',
            'typeSection'
        );

        expect(box).toMatchObject(expectedBox);

        boxInfoCompleteSpy.mockRestore();
    });
});
