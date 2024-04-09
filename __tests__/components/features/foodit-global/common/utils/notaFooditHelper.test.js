import {
    getHighestPriorityTag,
    validateArticleFoodit,
    getRenderablesData,
    getFooditAuthor
} from '../../../../../../components/features/foodit-global/common/utils/notaFooditHelper';

import renderables from '../../../../../../__mocks__/data/renderables/foodit/fooditRenderables2';
import noTypeAuthorMock from '../../../../../../__mocks__/data/articlesFoodit/SubtypeReceta/withVideoOpening.json';

const authorTypeUserMock = {
    credits: {
        by: [
            {
                _id: 'elisabetta-pique',
                additional_properties: {
                    original: {
                        author_type: 'Estándar',
                        byline: 'Elisabetta Piqué',
                        image:
                            'https://sandbox.lanacion.com.ar/resizer/v2/https%3A%2F%2Fbucket.glanacion.com%2Fanexos%2Ffotos%2F31%2F2089231.png?auth=1bc7c4692c820c7eee35fdaf9862e02133269f4a864bf1599d07a037bb09ee20&width=80&quality=70&smart=false',
                        role: 'LA NACION'
                    }
                },
                name: 'Elisabetta Piqué',
                slug: 'elisabetta-pique',
                type: 'author'
            }
        ]
    },
    label: {
        autor: {
            text: 'Usuario'
        }
    }
};

describe('Foodit - notaFooditHelper', () => {
    describe('getHighestPriorityTag function', () => {
        it('should return the highest priority tag', () => {
            const tags = [
                { name: 'Sin Gluten' },
                { name: 'Rápida' },
                { name: 'Clasica' },
                { name: 'Fácil' },
                { name: 'Vegana' },
                { name: 'Vegetariana' }
            ];
            expect(getHighestPriorityTag(tags)).toBe('Fácil');
        });

        it('should return the highest priority tag', () => {
            const tags = [
                { name: 'Keto' },
                { name: 'Maridaje' },
                { name: 'Vegana' },
                { name: 'Vegetariana' }
            ];
            expect(getHighestPriorityTag(tags)).toBe('Vegana');
        });

        it('should empty string if tag doesnt match', () => {
            const tags = ['pepe'];
            expect(getHighestPriorityTag(tags)).toBe('');
        });

        it('should empty string with no tags', () => {
            expect(getHighestPriorityTag([])).toBe('');
        });

        it('should empty string with no tags', () => {
            expect(getHighestPriorityTag(undefined)).toBe('');
        });

        it('should empty string with no tags', () => {
            expect(getHighestPriorityTag(null)).toBe('');
        });
    });

    describe('validateArticleFoodit', () => {
        it('Should return no id warning message', () => {
            expect(
                validateArticleFoodit({
                    id: undefined,
                    content: true
                })
            ).toMatchSnapshot();
        });

        it('Should return bad article ID warning message', () => {
            expect(
                validateArticleFoodit({
                    id: 'HLVF6HRMYNB2TI7L7G724OAPIU',
                    content: undefined
                })
            ).toMatchSnapshot();
        });
    });

    describe('getRenderablesData', () => {
        it('should return isOpening true if featureId is present in children', () => {
            const featureId = 'f0f5gjwJmp3u2hM';
            const result = getRenderablesData(renderables, featureId);
            expect(result.isOpening).toBe(true);
        });

        it('should return isOpening false if featureId is not present in children', () => {
            const featureId = 'fakeFeatureId';
            const result = getRenderablesData(renderables, featureId);
            expect(result.isOpening).toBe(false);
        });

        it('should return the correct layout value if featureId is present in children', () => {
            const featureId = 'f0feV8KtsvPmtxw';
            const result = getRenderablesData(renderables, featureId);
            expect(result.layout).toEqual('bn_2_grid');
        });

        it('should return an empty layout value if featureId is not present in children', () => {
            const featureId = 'fakeFeatureId';
            const result = getRenderablesData(renderables, featureId);
            expect(result.layout).toEqual('');
        });
    });

    describe('getFooditAuthor', () => {
        it('should return an empty string if author type is Usuario', () => {
            expect(getFooditAuthor(authorTypeUserMock, true)).toEqual('');
        });

        it('should return author name', () => {
            expect(getFooditAuthor(noTypeAuthorMock, true)).toEqual(
                'Vinciane Smeets'
            );
        });

        it('should return "Por" + author name', () => {
            expect(getFooditAuthor(noTypeAuthorMock, false)).toEqual(
                'Por Vinciane Smeets'
            );
        });
    });
});
