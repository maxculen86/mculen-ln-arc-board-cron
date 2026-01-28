import index from '../../../../../../../../components/private/LN/api/v2/mobile/homeAccumulated/index';
import pageDataPropiedades from '../../../../../../../../__mocks__/data/apiPageAcumuladosSource/propiedades.json';
const paramsPageLN10 = { information: { layoutPage: 'LN10-Home_Main' } };
const paramsPageLN = { information: { layoutPage: 'LN-Home_Main' } };

describe('components - private - LN - api - mobile - v2 - homeAccumulated - index.js', () => {
    it('Should return null and warn when missing layoutPage/typeSection', () => {
        const warnSpy = jest
            .spyOn(console, 'warn')
            .mockImplementation(() => void 0);

        const res = index([], { rootPath: 'x' });

        expect(res).toBeNull();
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining('Missing layoutPage')
        );

        warnSpy.mockRestore();
    });

    it('Should nullify url/link when it is suscriptores', () => {
        const children = [
            {
                type: 0,
                sectionAliasMobile: 'caja-x',
                information: {
                    url: 'https://www.lanacion.com.ar/suscriptores/'
                },
                articles: [{ _id: 'a1' }]
            }
        ];

        index(children, paramsPageLN10);
        expect(children[0].information.url).toBeNull();
    });

    it('Should execute handler only for supported types (0,2,10) page propiedades', () => {
        const children = pageDataPropiedades;

        const res = index(children, paramsPageLN10);

        expect(res).not.toBeNull();
        expect(Array.isArray(res)).toBe(true);
        expect(Array.isArray(res[0])).toBe(true);
        expect(res[0].length).toBeGreaterThan(0);
        expect(res[0].filter(x => x.tipoSeccion === 'tema').length).toBe(5);
        expect(res[0].filter(x => x.tipoSeccion === 'anexoMobile').length).toBe(
            2
        );
    });

    it('Should work with different layoutPages (LN-Home_Main vs LN10-Home_Main)', () => {
        const children = [
            {
                type: 0,
                sectionAliasMobile: 'caja-x',
                information: { url: 'https://www.lanacion.com.ar/nota-x/' },
                articles: [{ _id: 'a1' }]
            }
        ];

        const resLN10 = index(
            JSON.parse(JSON.stringify(children)),
            paramsPageLN10
        );
        const resLN = index(JSON.parse(JSON.stringify(children)), paramsPageLN);

        expect(resLN10).not.toBeNull();
        expect(resLN).not.toBeNull();
    });

    it('Should throw if children is null (same behavior as reduce on null)', () => {
        try {
            index(null, paramsPageLN10);
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toContain(
                "Cannot read properties of null (reading 'reduce')"
            );
        }
    });

    it('Should return an array with one element when children is empty array', () => {
        const res = index([], paramsPageLN10);

        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBe(1);
        expect(Array.isArray(res[0])).toBe(true);
    });
});
