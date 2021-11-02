import * as AccumulatedStoryByIds from '../../../../../components/features/LN-Api/AccumulatedStoryByIds/json';
import resultsArticle from '../../../../../__mocks__/data/acuArticlesbyIds/3ab7551887d97961726b9a8a9fb665c78a64fa5aa1d46bfd370886e44febc56b.json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return class extends component {
            constructor(props) {
                super(props);
                this.props = props;
            }
            fetchContent(param) {}
        };
    };
});
describe('components - features - LN-Api - AccumulatedStoryByIds - json.js', () => {
    const props = {
        arcSite: 'la-nacion-ar',
        children: [],
        collection: 'features',
        id: 'f0fbqPGS59PM2x',
        outputType: 'json',
        globalContent: resultsArticle,
        requestUri:
            '/api/global/v1/notas/byIds/236DDMMNYVFNFC4PZQPP4AK6XI,2375VFXVGZBNZDLXL5CTHUVTMQ,23CPLUXGMFF2RBADC62EYLXH4M/params=size:12;page:1/?_website=la-nacion-ar&outputType=json'
    };
    describe('Check props', () => {
        it('When article load props Ok', () => {
            const objArticle = new AccumulatedStoryByIds.default(props);
            expect(objArticle.props).toMatchObject(props);
        });
        it('When article load props null', () => {
            try {
                const objArticle = new AccumulatedStoryByIds.default(null);
                expect(objArticle).toBe(null);
            } catch (err) {
                expect(err.message).toBe(
                    `Cannot read property 'globalContent' of null`
                );
            }
        });
    });

    describe('Check render', () => {
        it('When result is Ok', () => {
            const objArticle = new AccumulatedStoryByIds.default(props);

            const result = objArticle.render();
            expect(Object.keys(result).sort()).toEqual(
                [
                    'acumuladoTotal',
                    'notas',
                    'paginar',
                    'tipoAcumulado',
                    'titulo'
                ].sort()
            );

            expect(result.paginar).toEqual(false);
            expect(result.acumuladoTotal).toEqual(3);
            expect(result.notas[0].id).toEqual('236DDMMNYVFNFC4PZQPP4AK6XI');
            expect(result.notas[1].id).toEqual('2375VFXVGZBNZDLXL5CTHUVTMQ');
            expect(result.notas[2].id).toEqual('23CPLUXGMFF2RBADC62EYLXH4M');
        });
        it('when the result is in order', () => {
            const objArticle = new AccumulatedStoryByIds.default(props);
            const result = objArticle.render();
            expect(result.notas[0].id).toEqual('236DDMMNYVFNFC4PZQPP4AK6XI');
            expect(result.notas[1].id).toEqual('2375VFXVGZBNZDLXL5CTHUVTMQ');
            expect(result.notas[2].id).toEqual('23CPLUXGMFF2RBADC62EYLXH4M');
        });

        it('When fetch acuArticlesSource is null', () => {
            const objArticle = new AccumulatedStoryByIds.default(props);
            objArticle.state.acuArticlesSource = null;
            const result = objArticle.render();
            expect(result).toBe(null);
        });

        it('When fetch requestUri is null', () => {
            const objArticle = new AccumulatedStoryByIds.default(props);
            objArticle.props.requestUri = null;
            const result = objArticle.render();
            expect(result.Message).toBe(`Cannot read property '1' of null`);
        });
    });
});
