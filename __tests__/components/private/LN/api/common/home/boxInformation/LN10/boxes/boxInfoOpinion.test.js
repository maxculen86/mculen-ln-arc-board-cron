import { boxInfoOpinion } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoOpinion';
import * as boxInfoCompleteModule from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoComplete';

describe('boxInfoOpinion', () => {
    describe('when boxInfoComplete is truthy', () => {
        it('should return boxInfoComplete with additional tituloCaja field', () => {
            const information = {};
            const section = '';
            const typeSection = '';
            const box = { tituloCaja: 'some value' };
            const expectedBox = { ...box, tituloCaja: 'SOME VALUE' };
            const boxInfoCompleteSpy = jest.spyOn(
                boxInfoCompleteModule,
                'boxInfoComplete'
            );
            boxInfoCompleteSpy.mockReturnValue(box);

            const result = boxInfoOpinion(information, section, typeSection);

            expect(result).toMatchObject(expectedBox);
        });

        it('should return boxInfoComplete with default tituloCaja field when it is falsy', () => {
            const information = {};
            const section = '';
            const typeSection = '';
            const box = { tituloCaja: null };
            const expectedBox = { ...box, tituloCaja: 'OPINIÓN' };
            const boxInfoCompleteSpy = jest.spyOn(
                boxInfoCompleteModule,
                'boxInfoComplete'
            );
            boxInfoCompleteSpy.mockReturnValue(box);

            const result = boxInfoOpinion(information, section, typeSection);

            expect(result).toMatchObject(expectedBox);
        });

        it('should update parameters title field with default value when it is falsy', () => {
            const information = {};
            const section = '';
            const typeSection = '';
            const box = { parameters: {} };
            const expectedBox = {
                ...box,
                parameters: { title: 'OPINIÓN' }
            };
            const boxInfoCompleteSpy = jest.spyOn(
                boxInfoCompleteModule,
                'boxInfoComplete'
            );
            boxInfoCompleteSpy.mockReturnValue(box);

            const result = boxInfoOpinion(information, section, typeSection);

            expect(result).toMatchObject(expectedBox);
        });

        it('should update box url and parameters url fields when parameters url field is truthy', () => {
            const information = { url: 'some url' };
            const section = '';
            const typeSection = '';
            const box = { url: 'old url', parameters: { url: 'some url' } };
            const expectedBox = {
                ...box,
                url: 'https://www.lanacion.com.ar/opinion/',
                parameters: { url: 'https://www.lanacion.com.ar/opinion/' }
            };
            const boxInfoCompleteSpy = jest.spyOn(
                boxInfoCompleteModule,
                'boxInfoComplete'
            );
            boxInfoCompleteSpy.mockReturnValue(box);
            const result = boxInfoOpinion(information, section, typeSection);

            expect(result).toMatchObject(expectedBox);
        });

        it('should not update box url and parameters url fields when parameters url field is falsy', () => {
            const information = { url: 'some url' };
            const section = '';
            const typeSection = '';
            const expectedBox = {
                tituloCaja: 'OPINIÓN',
                url: 'https://www.lanacion.com.ar/opinion/',
                parameters: {
                    url: 'https://www.lanacion.com.ar/opinion/',
                    title: 'OPINIÓN'
                }
            };
            const boxInfoCompleteSpy = jest.spyOn(
                boxInfoCompleteModule,
                'boxInfoComplete'
            );
            boxInfoCompleteSpy.mockReturnValue({
                parameters: { url: 'some url' }
            });
            const result = boxInfoOpinion(information, section, typeSection);
            expect(result).toMatchObject(expectedBox);
        });
    });
});
