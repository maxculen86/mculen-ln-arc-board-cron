import { boxInfoComplete } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoComplete';
import { boxInfoBasic } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/common/boxBasic';
import Image from '../../../../../../../../../../components/private/LN/api/common/elements/image/index';

jest.mock(
    '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/common/boxBasic',
    () => ({
        boxInfoBasic: jest.fn()
    })
);
jest.mock(
    '../../../../../../../../../../components/private/LN/api/common/elements/image/index',
    () => jest.fn()
);

describe('boxInfoComplete', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns boxInfoBasic when box is falsy', () => {
        const information = {
            textBadge: 'Custom Badge',
            lead: 'Lead',
            url: 'https://www.example.com',
            video: '',
            title: 'Title'
        };
        const section = 'section';
        const typeSection = 'typeSection';

        const box = null;
        boxInfoBasic.mockReturnValue(box);

        const result = boxInfoComplete(information, section, typeSection);

        expect(result).toEqual(box);
    });

    it('returns boxInfoBasic when information is falsy', () => {
        const information = null;
        const section = 'section';
        const typeSection = 'typeSection';

        const box = {};
        boxInfoBasic.mockReturnValue(box);

        const result = boxInfoComplete(information, section, typeSection);

        expect(result).toEqual(box);
    });
    it('returns boxInfoBasic when information.hideTitle is true', () => {
        const information = {
            hideTitle: true
        };
        const section = 'section';
        const typeSection = 'typeSection';

        const box = {};
        boxInfoBasic.mockReturnValue(box);

        const result = boxInfoComplete(information, section, typeSection);

        expect(result).toEqual(box);
    });
    it('returns complete box when box, information and information.hideTitle are all true', () => {
        const image = {
            promo_items: {
                basic: {
                    type: 'image',
                    additional_properties: {
                        originalUrl: 'https://www.example.com/image.jpg'
                    }
                }
            }
        };
        const information = {
            textBadge: 'Custom Badge',
            lead: 'Lead',
            link: 'https://www.example.com',
            video: '',
            title: 'Title',
            image,
            chapita: 'Custom Badge',
            chapitaStyle: 'Custom Style',
            buttonText: 'Custom Button Text',
            linkButton: 'https://www.example.com/button',
            buttonStyle: 'Custom Button Style',
            hideTitle: false
        };
        const section = 'section';
        const typeSection = 'typeSection';

        const box = { parameters: {} };
        boxInfoBasic.mockReturnValue(box);
        Image.mockReturnValue('Image');

        const result = boxInfoComplete(information, section, typeSection);

        expect(result).toEqual({
            ...box,
            tituloCaja: information.title,
            url: information.link,
            parameters: {
                title: information.title,
                url: information.link,
                badge: information.chapita,
                badgeStyle: information.chapitaStyle,
                actionButton: {
                    title: information.buttonText,
                    url: information.linkButton,
                    style: information.buttonStyle
                }
            },
            imagen: 'Image',
            imageUrl: 'https://www.example.com/image.jpg'
        });
        expect(boxInfoBasic).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
        expect(Image).toHaveBeenCalledWith({
            type: 'image',
            additional_properties: {
                originalUrl: 'https://www.example.com/image.jpg'
            }
        });
    });

    it('should return boxInfoComplete without imagen parameter if image is not a valid object', () => {
        const information = {
            chapita: 'Custom Badge',
            chapitaStyle: 'example-chapita-style',
            lead: 'Lead',
            link: 'https://www.example.com',
            image: null,
            title: 'Title',
            hideTitle: false
        };
        const section = 'section';
        const typeSection = 'typeSection';

        boxInfoBasic.mockReturnValue({});

        const expectedBox = {
            tituloCaja: information.title,
            url: information.link,
            parameters: {
                title: information.title,
                url: information.link,
                badge: information.chapita,
                badgeStyle: information.chapitaStyle,
                actionButton: null
            }
        };
        const result = boxInfoComplete(information, section, typeSection);
        expect(result).toEqual(expectedBox);
        expect(boxInfoBasic).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
        expect(Image).not.toHaveBeenCalled();
    });

    it('when information.url is truthy should return the correct url value in root and parameters', () => {
        const information = {
            title: 'Test title',
            link: 'https://test-url.com',
            image: {},
            hideTitle: false
        };
        boxInfoBasic.mockReturnValue({});
        const result = boxInfoComplete(information, 'section', 'typeSection');

        expect(result).toMatchObject({
            url: 'https://test-url.com',
            parameters: {
                url: 'https://test-url.com'
            }
        });
    });

    it('when information.link is truthy should return the correct link value in root and parameters', () => {
        const information = {
            title: 'Test title',
            url: null,
            link: 'https://test-link.com',
            image: {},
            hideTitle: false
        };
        boxInfoBasic.mockReturnValue({});
        const result = boxInfoComplete(information, 'section', 'typeSection');

        expect(result).toMatchObject({
            url: 'https://test-link.com',
            parameters: {
                url: 'https://test-link.com'
            }
        });
    });

    it('when information.buttonText is falsy should return null for actionButton', () => {
        const information = {
            buttonText: null,
            linkButton: 'https://test-link.com',
            hideTitle: false
        };
        boxInfoBasic.mockReturnValue({});

        const result = boxInfoComplete(information, 'section', 'typeSection');

        expect(result.parameters.actionButton).toBeNull();
    });

    it('when information.linkButton is falsy should return null for actionButton', () => {
        const information = {
            buttonText: 'Test button text',
            linkButton: null,
            hideTitle: false
        };
        boxInfoBasic.mockReturnValue({});

        const result = boxInfoComplete(information, 'section', 'typeSection');

        expect(result.parameters.actionButton).toBeNull();
    });

    it('when information.buttonText and information.linkButton are truthy should return the correct actionButton object', () => {
        const information = {
            buttonText: 'Test button text',
            linkButton: 'https://test-link.com',
            buttonStyle: 'style-button',
            hideTitle: false
        };

        boxInfoBasic.mockReturnValue({});
        const result = boxInfoComplete(information, 'section', 'typeSection');

        expect(result.parameters.actionButton).toEqual({
            title: 'Test button text',
            url: 'https://test-link.com',
            style: 'style-button'
        });
    });
});
