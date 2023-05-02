import * as boxInfoBasicModule from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/common/boxBasic';
import boxInfoBasic from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/common/boxBasic';
import boxInfoHashTag from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoHashTag';

describe('boxInfoHashTag', () => {
    it('should return the correct title when information is provided', () => {
        const information = {
            title: 'Test Hashtag',
            hideTitle: false
        };
        const section = 'test-section';
        const typeSection = 'test-type';
        const expectedTitle = 'TEST HASHTAG';

        const box = boxInfoHashTag(information, section, typeSection);

        expect(box.tituloCaja).toBe(expectedTitle);
        expect(box.parameters.title).toBe(expectedTitle);
    });

    it('should return the default title when information hideTitle is true', () => {
        const section = 'test-section';
        const typeSection = 'test-type';
        const expectedTitle = 'HASHTAG';
        const information = {
            title: 'Test Hashtag',
            hideTitle: true
        };

        const box = boxInfoHashTag(information, section, typeSection);

        expect(box.tituloCaja).toBe(expectedTitle);
        expect(box.parameters.title).toBe(expectedTitle);
    });

    it('should return the default title when information title is not provided', () => {
        const section = 'test-section';
        const typeSection = 'test-type';
        const expectedTitle = 'HASHTAG';
        const information = {
            title: null
        };

        const box = boxInfoHashTag(information, section, typeSection);

        expect(box.tituloCaja).toBe(expectedTitle);
        expect(box.parameters.title).toBe(expectedTitle);
    });

    it('should call boxInfoBasic with the correct parameters', () => {
        const information = {
            title: 'Test Hashtag',
            hideTitle: false
        };
        const section = 'test-section';
        const typeSection = 'test-type';

        const boxInfoBasicSpy = jest.spyOn(boxInfoBasicModule, 'boxInfoBasic');
        const box = boxInfoHashTag(information, section, typeSection);

        expect(boxInfoBasicSpy).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
        expect(box).toBeDefined();
    });

    it('should return the basic box info when information or box are falsy', () => {
        const section = 'test-section';
        const typeSection = 'test-type';

        const box1 = boxInfoHashTag(null, section, typeSection);
        expect(box1).toEqual(boxInfoBasic(null, section, typeSection));

        const box2 = boxInfoHashTag(undefined, section, typeSection);
        expect(box2).toEqual(boxInfoBasic(undefined, section, typeSection));

        const box3 = boxInfoHashTag(null, null, null);
        expect(box3).toEqual(boxInfoBasic(null, null, null));
    });
});
