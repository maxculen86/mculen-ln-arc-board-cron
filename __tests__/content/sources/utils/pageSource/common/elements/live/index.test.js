import setLiveByConfig from '../../../../../../../../content/sources/utils/pageSource/common/elements/live/index.js';
import configByLayout from './../../../../../../../../content/sources/utils/pageSource/common/elements/live/config/configLiveByLayout.js';
jest.mock(
    './../../../../../../../../content/sources/utils/pageSource/common/elements/live/config/configLiveByLayout.js'
);
describe('setLiveByConfig', () => {
    it('should return LN10_En_Vivo between apertura and dolar', async () => {
        configByLayout.mockReturnValueOnce({
            element: {
                sectionAliasMobile: 'LN-common/LN10_En_Vivo'
            },
            bottomTo: {
                sectionAliasMobile: 'apertura'
            },
            upperTo: {
                sectionAliasMobile: 'dolar'
            }
        });

        const elementsPage = [
            { sectionAliasMobile: 'ln-common/preheader' },
            { sectionAliasMobile: 'bomba' },
            { sectionAliasMobile: 'ln-common/anexo' },
            { sectionAliasMobile: 'ln-common/ln10_en_vivo' },
            { sectionAliasMobile: 'apertura' },
            { sectionAliasMobile: 'Dolar' }
        ];
        const expectedElementsPage = [
            { sectionAliasMobile: 'ln-common/preheader' },
            { sectionAliasMobile: 'bomba' },
            { sectionAliasMobile: 'ln-common/anexo' },
            { sectionAliasMobile: 'apertura' },
            { sectionAliasMobile: 'ln-common/ln10_en_vivo' },
            { sectionAliasMobile: 'Dolar' }
        ];
        const result = await setLiveByConfig(elementsPage, 'LN10-Home_Main');
        expect(result).toEqual(expectedElementsPage);
    });
    it('should return original elementsPage when config is missing', async () => {
        configByLayout.mockReturnValueOnce(null);
        const elementsPage = [{ sectionAliasMobile: 'test' }];
        const result = await setLiveByConfig(elementsPage, 'someLayout');
        expect(result).toEqual(elementsPage);
    });
    it('should return LN10_En_Vivo down of last apertura if dolar do not exists', async () => {
        configByLayout.mockReturnValueOnce({
            element: {
                sectionAliasMobile: 'LN-common/LN10_En_Vivo'
            },
            bottomTo: {
                sectionAliasMobile: 'apertura'
            },
            upperTo: {
                sectionAliasMobile: 'dolar'
            }
        });

        const elementsPage = [
            { sectionAliasMobile: 'ln-common/preheader' },
            { sectionAliasMobile: 'bomba' },
            { sectionAliasMobile: 'ln-common/anexo' },
            { sectionAliasMobile: 'ln-common/ln10_en_vivo' },
            { sectionAliasMobile: 'apertura' }
        ];
        const expectedElementsPage = [
            { sectionAliasMobile: 'ln-common/preheader' },
            { sectionAliasMobile: 'bomba' },
            { sectionAliasMobile: 'ln-common/anexo' },
            { sectionAliasMobile: 'apertura' },
            { sectionAliasMobile: 'ln-common/ln10_en_vivo' }
        ];
        const result = await setLiveByConfig(elementsPage, 'LN10-Home_Main');
        expect(result).toEqual(expectedElementsPage);
    });
    it('should return LN10_En_Vivo down of apertura if dolar do not exists', async () => {
        configByLayout.mockReturnValueOnce({
            element: {
                sectionAliasMobile: 'LN-common/LN10_En_Vivo'
            },
            bottomTo: {
                sectionAliasMobile: 'apertura'
            },
            upperTo: {
                sectionAliasMobile: 'dolar'
            }
        });

        const elementsPage = [
            { sectionAliasMobile: 'ln-common/preheader' },
            { sectionAliasMobile: 'bomba' },
            { sectionAliasMobile: 'ln-common/anexo' },
            { sectionAliasMobile: 'ln-common/ln10_en_vivo' },
            { sectionAliasMobile: 'apertura' },
            { sectionAliasMobile: 'ln-common/anexo' },
            { sectionAliasMobile: 'apertura' }
        ];
        const expectedElementsPage = [
            { sectionAliasMobile: 'ln-common/preheader' },
            { sectionAliasMobile: 'bomba' },
            { sectionAliasMobile: 'ln-common/anexo' },
            { sectionAliasMobile: 'apertura' },
            { sectionAliasMobile: 'ln-common/anexo' },
            { sectionAliasMobile: 'apertura' },
            { sectionAliasMobile: 'ln-common/ln10_en_vivo' }
        ];
        const result = await setLiveByConfig(elementsPage, 'LN10-Home_Main');
        expect(result).toEqual(expectedElementsPage);
    });
    it('should leave elementsPage unchanged if no enVivoItems', async () => {
        configByLayout.mockReturnValueOnce({
            element: {
                sectionAliasMobile: 'LN-common/LN10_En_Vivo'
            },
            bottomTo: {
                sectionAliasMobile: 'apertura'
            },
            upperTo: {
                sectionAliasMobile: 'dolar'
            }
        });

        const elementsPage = [
            { sectionAliasMobile: 'ln-common/preheader' },
            { sectionAliasMobile: 'bomba' },
            { sectionAliasMobile: 'ln-common/anexo' },
            { sectionAliasMobile: 'apertura' }
        ];
        const expectedElementsPage = [
            { sectionAliasMobile: 'ln-common/preheader' },
            { sectionAliasMobile: 'bomba' },
            { sectionAliasMobile: 'ln-common/anexo' },
            { sectionAliasMobile: 'apertura' }
        ];
        const result = await setLiveByConfig(elementsPage, 'LN10-Home_Main');
        expect(result).toEqual(expectedElementsPage);
    });
    it('should handle exception', async () => {
        configByLayout.mockImplementationOnce(() => {
            throw new Error('Test error');
        });

        const elementsPage = [{ sectionAliasMobile: 'upper' }];
        const result = await setLiveByConfig(elementsPage, 'someLayout');
        expect(result).toEqual(elementsPage);
    });
});
