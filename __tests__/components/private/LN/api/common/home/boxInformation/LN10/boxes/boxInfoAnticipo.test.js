import getEmbedHref from '../../../../../../../../../../components/private/common/utils/getEmbedHref';
import boxInfoAnticipo from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoAnticipo';
import { boxInfoAnticipoComplete } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoAnticipoComplete';

jest.mock(
    '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoAnticipoComplete',
    () => ({
        boxInfoAnticipoComplete: jest.fn()
    })
);

describe('boxInfoAnticipo', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return boxInfoComplete if box is falsy', () => {
        const information = {};
        const section = 'section';
        const typeSection = 'typeSection';

        const box = null;
        boxInfoAnticipoComplete.mockReturnValue(box);

        const result = boxInfoAnticipoComplete(
            information,
            section,
            typeSection
        );

        expect(result).toBe(box);
        expect(boxInfoAnticipoComplete).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
    });

    it('should return boxInfoComplete if box.parameters is falsy', () => {
        const information = {};
        const section = 'section';
        const typeSection = 'typeSection';

        const box = { parameters: null };
        boxInfoAnticipoComplete.mockReturnValue(box);

        const result = boxInfoAnticipo(information, section, typeSection);

        expect(result).toBe(box);
        expect(boxInfoAnticipoComplete).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
    });

    it('should return boxInfoComplete with all parameters and default badge', () => {
        const information = {
            textBadge: '',
            lead: 'Lead',
            url: 'https://www.example.com',
            video: 'https://www.youtube.com/embed/12345',
            title: 'Title'
        };
        const section = 'section';
        const typeSection = 'typeSection';

        const box = { parameters: {} };
        boxInfoAnticipoComplete.mockReturnValue(box);

        const expectedBox = {
            parameters: {
                badge: 'ANTICIPO',
                lead: information.lead,
                url: information.url,
                video: getEmbedHref('src', information.video)
            }
        };

        const result = boxInfoAnticipo(information, section, typeSection);

        expect(result).toEqual(expectedBox);
        expect(boxInfoAnticipoComplete).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
    });

    it('should return boxInfoComplete with all parameters and custom badge', () => {
        const information = {
            textBadge: 'Custom Badge',
            lead: 'Lead',
            url: 'https://www.example.com',
            video: 'https://www.youtube.com/embed/12345',
            title: 'Title'
        };
        const section = 'section';
        const typeSection = 'typeSection';

        const box = { parameters: {} };
        boxInfoAnticipoComplete.mockReturnValue(box);

        const expectedBox = {
            parameters: {
                badge: information.textBadge.toUpperCase(),
                lead: information.lead,
                url: information.url,
                video: getEmbedHref('src', information.video)
            }
        };

        const result = boxInfoAnticipo(information, section, typeSection);

        expect(result).toEqual(expectedBox);
        expect(boxInfoAnticipoComplete).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
    });

    it('should return boxInfoComplete with text parameter if video is empty', () => {
        const information = {
            textBadge: 'Custom Badge',
            lead: 'Lead',
            url: 'https://www.example.com',
            video: '',
            title: 'Title'
        };
        const section = 'section';
        const typeSection = 'typeSection';

        const box = { parameters: {} };
        boxInfoAnticipoComplete.mockReturnValue(box);

        const expectedBox = {
            parameters: {
                badge: 'CUSTOM BADGE',
                lead: 'Lead',
                url: 'https://www.example.com',
                video: null
            }
        };
        const result = boxInfoAnticipo(information, section, typeSection);
        expect(result).toEqual(expectedBox);
        expect(boxInfoAnticipoComplete).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
    });

    it('should return empty titles when information.title is empty', () => {
        const information = { title: '' };
        const section = 'section';
        const typeSection = 'typeSection';

        const box = {
            tituloCaja: '',
            parameters: { title: '' }
        };

        boxInfoAnticipoComplete.mockReturnValue(box);

        const result = boxInfoAnticipo(information, section, typeSection);

        expect(result.tituloCaja).toBe('');
        expect(result.parameters.title).toBe('');
        expect(boxInfoAnticipoComplete).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
    });

    it('should return empty titles when information.title is undefined', () => {
        const information = {};
        const section = 'section';
        const typeSection = 'typeSection';

        const box = {
            tituloCaja: '',
            parameters: { title: '' }
        };

        boxInfoAnticipoComplete.mockReturnValue(box);

        const result = boxInfoAnticipo(information, section, typeSection);

        expect(result.tituloCaja).toBe('');
        expect(result.parameters.title).toBe('');
        expect(boxInfoAnticipoComplete).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
    });
});
