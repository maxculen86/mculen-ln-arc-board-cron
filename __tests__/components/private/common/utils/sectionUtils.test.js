import {
    getFirstParentSection,
    getSectionLogo,
    getRegex,
    generatePath
} from '../../../../../components/private/common/utils/sectionUtils';
import notaBrando from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import notaBBC from '../../../../../__mocks__/data/articles/XCLX5M6MHJAMHIGD6S2BOF3L3Y';
import notaPropiedades from '../../../../../__mocks__/data/articles/C5FCAISVEBE5BH5SLWSAWB2VKI';
import notaStorytelling from '../../../../../__mocks__/data/articles/IGR6WQGQDNHALH6PL4GAYBKYZM';
import siteProps from '../../../../../__mocks__/data/properties/lnSiteProps';

//TODO: hacer tests
describe('Utils - SectionUtils', () => {
    it('getFirstParentSection test', () => {
        const parent = getFirstParentSection({
            _id: '/recetas/platos-principales/carne'
        });
        expect(parent).toBe('/recetas');
    });

    it('getFirstParentSection test with empty object', () => {
        const parent = getFirstParentSection({});
        expect(parent).toBe(null);
    });

    it('getSectionLogo test BBC', () => {
        const sections = notaBBC.taxonomy.sections;
        const layout = 'LN-nota-noticia';
        const distributorName = 'BBC Mundo';
        const LogoComponent = getSectionLogo(sections, layout, distributorName);

        expect(LogoComponent).toMatchObject({
            color: true,
            logoName: 'bbc',
            path: '/distributor/bbc-mundo/'
        });
    });

    it('getSectionLogo test BBC', () => {
        const sections = notaBBC.taxonomy.sections;
        const layout = 'LN-nota-noticia';
        const distributorName = 'BBC Mundo';
        const LogoComponent = getSectionLogo(sections, layout, distributorName);

        expect(LogoComponent).toMatchObject({
            color: true,
            logoName: 'bbc',
            path: '/distributor/bbc-mundo/'
        });
    });

    it('getSectionLogo test Propiedades', () => {
        const sections = notaPropiedades.taxonomy.sections;
        const layout = 'LN-nota-noticia';
        const LogoComponent = getSectionLogo(sections, layout);

        expect(LogoComponent).toMatchObject({
            color: true,
            logoName: 'propiedades',
            path: '/propiedades/'
        });
    });

    it('getSectionLogo test priority', () => {
        const sections = notaBrando.taxonomy.sections;
        const layout = 'LN-nota-noticia';
        const distributorName = 'BBC Mundo';
        const LogoComponent = getSectionLogo(sections, layout, distributorName);

        expect(LogoComponent).toMatchObject({
            color: true,
            logoName: 'bbc',
            path: '/distributor/bbc-mundo/'
        });
    });

    it('getSectionLogo test Logo without Color Storytelling', () => {
        const sections = notaStorytelling.taxonomy.sections;
        const layout = 'LN-nota-storytelling';
        const distributorName = 'BBC Mundo';
        const LogoComponent = getSectionLogo(sections, layout, distributorName);

        expect(LogoComponent).toMatchObject({
            color: false,
            logoName: 'bbc',
            path: '/distributor/bbc-mundo/'
        });
    });

    it('should return correct logoName and path for /deportes/canchallena', () => {
        const sectionId = '/deportes/canchallena';
        const regex = getRegex(sectionId);
        const match = (regex && sectionId.match(regex)) || [];
        const [fullMatch, $1] = match;

        const logoName =
            ($1 === 'lnmas' && 'ln-mas') ||
            ($1 === 'economia/campo' && 'campo') ||
            ($1 === 'deportes/canchallena' && 'canchallena') ||
            $1;

        const path = generatePath(sectionId, regex, fullMatch, $1);

        const expectedResult = {
            logoName: 'canchallena',
            path: 'https://canchallena.lanacion.com.ar/'
        };

        expect(logoName).toBe(expectedResult.logoName);
        expect(path).toBe(expectedResult.path);
    });

    it('generatePath should return correct path with all parameters', () => {
        const sectionId = '/deportes/canchallena';
        const regex = /^\/(deportes\/canchallena)(?:\/.+)?/;
        const fullMatch = 'deportes/canchallena' && 'canchallena';
        const $1 = 'canchallena';

        const path = generatePath(sectionId, regex, fullMatch, $1);

        const expectedResult = 'https://canchallena.lanacion.com.ar/';

        expect(path).toBe(expectedResult);
    });
});
