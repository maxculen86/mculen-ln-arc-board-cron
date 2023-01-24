import * as AccumulatedAuthor from '../../../../../components/features/LN-Api/AccumulatedAuthor/json';
import resultsAuthor from '../../../../../__mocks__/data/acuArticleByAuthor/results.json';
import resultsArticle from '../../../../../__mocks__/data/acuArticleByAuthor/articleSourceAuthor.json';
import resultsArticleOnePage from '../../../../../__mocks__/data/acuArticleByAuthor/articleSourceAuthor1.json';
jest.mock('fusion:consumer', component => {
    return function(component) {
        return class extends component {
            constructor(props) {
                super(props);
                this.props = props;
                this.state = {};
            }
            fetchContent(param) {}
        };
    };
});
describe('components - features - LN-Api - AccumulatedAuthor - json.js', () => {
    const props = {
        arcSite: 'la-nacion-ar',
        children: [],
        collection: 'features',
        id: 'f0fbqPGS59PM2x',
        outputType: 'json',
        globalContent: resultsAuthor,
        customFields: { size: 12, page: 2, paramUrlId: '' },
        requestUri:
            '/api/v1/notas/byAuthor/carlos-pagni-81/params=size:12;page:2/?_website=la-nacion-ar&outputType=json'
    };
    describe('check author data page', () => {
        it('Si no es la primera pagina no muesto el author', () => {
            const objArticle = new AccumulatedAuthor.default(props);
            objArticle.state.acuArticlesSourceAuthor = resultsArticle;
            const result = objArticle.render();
            expect(result.autor).toBeUndefined();
        });

        it('Si es la primera pagina muesto el author', () => {
            const objArticle = new AccumulatedAuthor.default(props);
            objArticle.state.acuArticlesSourceAuthor = resultsArticleOnePage;
            const result = objArticle.render();
            expect(result.autor).toBeDefined();
        });
    });
});
