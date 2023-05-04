import boxInfoAFondo from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoAFondo';
import * as boxInfoComplete from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoComplete';

describe('boxInfoAFondo', () => {
    const section = 'test-section';
    const typeSection = 'test-type';

    it('should return null when information is not provided', () => {
        const information = null;
        const box = boxInfoAFondo(information, section, typeSection);
        expect(box).toBeNull();
    });

    it('should return the result of boxInfoComplete when boxInfoComplete returns falsy', () => {
        const information = {};
        const boxInfoCompleteSpy = jest
            .spyOn(boxInfoComplete, 'boxInfoComplete')
            .mockReturnValue(null);
        const box = boxInfoAFondo(information, section, typeSection);
        expect(box).toBeNull();
        expect(boxInfoCompleteSpy).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
        boxInfoCompleteSpy.mockRestore();
    });

    it('should return the result of boxInfoComplete when boxInfoComplete does not have parameters', () => {
        const information = {};
        const boxInfoCompleteResult = {
            title: 'Test Box',
            content: 'Test Content'
        };
        const boxInfoCompleteSpy = jest
            .spyOn(boxInfoComplete, 'boxInfoComplete')
            .mockReturnValue(boxInfoCompleteResult);
        const box = boxInfoAFondo(information, section, typeSection);
        expect(box).toEqual(boxInfoCompleteResult);
        expect(boxInfoCompleteSpy).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
        boxInfoCompleteSpy.mockRestore();
    });

    it('should return the result of boxInfoComplete when information.chainStyle is falsy', () => {
        const information = { parameters: { color: 'blue' } };
        const boxInfoCompleteResult = {
            title: 'Test Box',
            content: 'Test Content',
            parameters: { color: 'blue' }
        };
        const boxInfoCompleteSpy = jest
            .spyOn(boxInfoComplete, 'boxInfoComplete')
            .mockReturnValue(boxInfoCompleteResult);
        const box = boxInfoAFondo(information, section, typeSection);
        expect(box).toEqual(boxInfoCompleteResult);
        expect(boxInfoCompleteSpy).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
        boxInfoCompleteSpy.mockRestore();
    });

    it('should set box.parameters.chainStyle to information.chainStyle and return box', () => {
        const information = { chainStyle: 'test-chain-style' };
        const boxInfoCompleteResult = {
            title: 'Test Box',
            content: 'Test Content',
            parameters: { color: 'blue' }
        };
        const expectedBox = {
            title: 'Test Box',
            content: 'Test Content',
            parameters: { color: 'blue', chainStyle: 'test-chain-style' }
        };
        const boxInfoCompleteSpy = jest
            .spyOn(boxInfoComplete, 'boxInfoComplete')
            .mockReturnValue(boxInfoCompleteResult);
        const box = boxInfoAFondo(information, section, typeSection);
        expect(box).toEqual(expectedBox);
        expect(boxInfoCompleteSpy).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
        boxInfoCompleteSpy.mockRestore();
    });

    it('should return titles in uppercase', () => {
        debugger;
        const information = {title:'TEST TITLE'};
        const expectedBox = {
            tituloCaja: 'TEST TITLE',
            parameters: { title: 'TEST TITLE'}
        };

        const boxInfoCompleteSpy = jest
            .spyOn(boxInfoComplete, 'boxInfoComplete')
            .mockReturnValue(expectedBox);

        const box = boxInfoAFondo(information, section, typeSection);

        expect(box.tituloCaja).toBe('TEST TITLE');
        expect(box.parameters.title).toBe('TEST TITLE');
        expect(boxInfoCompleteSpy).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
        boxInfoCompleteSpy.mockRestore();
      
    });
    it('should return empty titles when information.title is empty', () => {
        const information = {title:''};
        const expectedBox = {
            tituloCaja: '',
            parameters: { title: ''}
        };

        const boxInfoCompleteSpy = jest
            .spyOn(boxInfoComplete, 'boxInfoComplete')
            .mockReturnValue(expectedBox);

        const box = boxInfoAFondo(information, section, typeSection);

        expect(box.tituloCaja).toBe('');
        expect(box.parameters.title).toBe('');
        expect(boxInfoCompleteSpy).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
        boxInfoCompleteSpy.mockRestore();
    });
    it('should return empty titles when information.title is undefined', () => {
        debugger;
        const information = {};
        const expectedBox = {
            tituloCaja: '',
            parameters: { title: ''}
        };

        const boxInfoCompleteSpy = jest
            .spyOn(boxInfoComplete, 'boxInfoComplete')
            .mockReturnValue(expectedBox);

        const box = boxInfoAFondo(information, section, typeSection);

        expect(box.tituloCaja).toBe('');
        expect(box.parameters.title).toBe('');
        expect(boxInfoCompleteSpy).toHaveBeenCalledWith(
            information,
            section,
            typeSection
        );
        boxInfoCompleteSpy.mockRestore();
    });
});
