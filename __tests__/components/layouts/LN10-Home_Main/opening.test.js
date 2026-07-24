import LN10HomeLayoutOpening from '../../../../components/layouts/LN10-Home_Main/opening';
import LN10HomeSections from '../../../../components/layouts/config/LN10-PageBuilder.config.json';
import getPageElements from '../../../../components/private/LN/api/global/page';

jest.mock('fusion:consumer', () => {
    return Component => Component;
});

jest.mock('../../../../components/private/LN/api/global/page', () =>
    jest.fn(() => ({
        information: { layoutPage: 'LN10-Home_Main' },
        content_elements: []
    }))
);

jest.mock(
    '../../../../content/sources/utils/pageSource/pageHome/v1/mobile/transform',
    () => jest.fn(async pageElements => pageElements)
);

jest.mock('../../../../components/private/LN/api/v2/mobile/home', () =>
    jest.fn(() => [
        {
            items: [
                { id: 'a1', tipoSeccion: 'bombita' },
                { id: 'b1', tipoSeccion: 'apertura' },
                { id: 'x1', tipoSeccion: 'breaking_1' },
                { id: 'y1' }
            ]
        }
    ])
);

describe('LN10Home layout opening test', () => {
    const arcSite = 'la-nacion-ar';

    it('requests only Pre_Apertura and Apertura sections', async () => {
        const children = LN10HomeSections.map(() => []);

        await LN10HomeLayoutOpening({
            arcSite,
            children,
            renderables: []
        });

        expect(getPageElements).toHaveBeenCalledWith(
            expect.objectContaining({
                sectionNames: ['apertura', 'pre_apertura']
            })
        );
    });

    it('returns only items with tipoSeccion apertura or bombita', async () => {
        const children = LN10HomeSections.map(() => []);
        const result = await LN10HomeLayoutOpening({
            arcSite,
            children,
            renderables: []
        });

        expect(result).toEqual({
            items: [
                { id: 'a1', tipoSeccion: 'bombita' },
                { id: 'b1', tipoSeccion: 'apertura' }
            ]
        });
    });
});
