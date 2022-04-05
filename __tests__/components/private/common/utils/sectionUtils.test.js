import {
    getFirstParentSection,
    getSectionLogo
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

    it('getSectionLogo test BBC', () => {
        const sections = notaBBC.taxonomy.sections;
        const layout = 'LN-nota-noticia';
        const distributorName = 'BBC Mundo';
        const LogoComponent = getSectionLogo(sections, layout, distributorName);

        expect(LogoComponent).toMatchObject({
            color: true,
            logoName: 'bbc',
            path: '/distributor/bbc-mundo'
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
            path: '/distributor/bbc-mundo'
        });
    });

    it('getSectionLogo test Propiedades', () => {
        const sections = notaPropiedades.taxonomy.sections;
        const layout = 'LN-nota-noticia';
        const distributorName = 'BBC Mundo';
        const LogoComponent = getSectionLogo(sections, layout, distributorName);

        expect(LogoComponent).toMatchObject({
            color: true,
            logoName: 'propiedades',
            path: '/propiedades'
        });
    });

    it('getSectionLogo test priority', () => {
        const sections = notaBrando.taxonomy.sections;
        const layout = 'LN-nota-noticia';
        const distributorName = 'BBC Mundo';
        const LogoComponent = getSectionLogo(sections, layout, distributorName);

        expect(LogoComponent).toMatchObject({
            color: true,
            logoName: 'brando',
            path: '/revista-brando'
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
            path: '/distributor/bbc-mundo'
        });
    });
});
