import {
    getHighestPriorityTag,
    validateArticleFoodit,
    getRenderablesData,
    getFooditAuthor,
    getOpeningProps
} from '../../../../../../components/features/foodit-global/common/utils/notaFooditHelper';

import renderables from '../../../../../../__mocks__/data/renderables/foodit/focal1Plus4HomeRenderables.json';
import focal1HomeRenderables from '../../../../../../__mocks__/data/renderables/foodit/focal1HomeRenderables.json';
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
                        image: 'https://sandbox.lanacion.com.ar/resizer/v2/https%3A%2F%2Fbucket.glanacion.com%2Fanexos%2Ffotos%2F31%2F2089231.png?auth=1bc7c4692c820c7eee35fdaf9862e02133269f4a864bf1599d07a037bb09ee20&width=80&quality=70&smart=false',
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

        it('should match tag without accent (facil → Fácil)', () => {
            const tags = [{ name: 'facil' }];
            expect(getHighestPriorityTag(tags)).toBe('Fácil');
        });

        it('should match tag with leading/trailing whitespace', () => {
            const tags = [{ name: ' Vegana ' }];
            expect(getHighestPriorityTag(tags)).toBe('Vegana');
        });

        it('should return canonical form when section comes from Queryly (no accent)', () => {
            const tags = [{ name: 'facil' }, { name: 'Vegana' }];
            expect(getHighestPriorityTag(tags)).toBe('Fácil');
        });

        it('should resolve "Recetas fáciles" to "Fácil"', () => {
            const tags = [{ name: 'Recetas fáciles' }];
            expect(getHighestPriorityTag(tags)).toBe('Fácil');
        });

        it('should resolve unaccented "Recetas faciles" to "Fácil"', () => {
            const tags = [{ name: 'Recetas faciles' }];
            expect(getHighestPriorityTag(tags)).toBe('Fácil');
        });

        it('should resolve "Recetas rápidas" to "Rápida"', () => {
            const tags = [{ name: 'Recetas rápidas' }];
            expect(getHighestPriorityTag(tags)).toBe('Rápida');
        });

        it('should resolve unaccented "Recetas rapidas" to "Rápida"', () => {
            const tags = [{ name: 'Recetas rapidas' }];
            expect(getHighestPriorityTag(tags)).toBe('Rápida');
        });

        it('should prefer "Fácil" over "Vegana" when article has both mapped names', () => {
            const tags = [{ name: 'Recetas fáciles' }, { name: 'Vegana' }];
            expect(getHighestPriorityTag(tags)).toBe('Fácil');
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
            const featureId = 'f0fujPmnOyutm2Tj';
            const result = getRenderablesData(renderables, featureId);
            expect(result.isOpening).toBe(true);
        });

        it('should return isOpening false if featureId is not present in children', () => {
            const featureId = 'fakeFeatureId';
            const result = getRenderablesData(renderables, featureId);
            expect(result.isOpening).toBe(false);
        });

        it('should return the correct layout value if featureId is present in children', () => {
            const featureId = 'f0fujPmnOyutm2Tj';
            const result = getRenderablesData(renderables, featureId);
            expect(result.layout).toEqual('bn_1_4_grid');
        });

        it('should return an empty layout value if featureId is not present in children', () => {
            const featureId = 'fakeFeatureId';
            const result = getRenderablesData(renderables, featureId);
            expect(result.layout).toEqual('');
        });
    });

    describe('getOpeningProps', () => {
        it('should return opening props for focal 1 plus 4 opening', () => {
            expect(getOpeningProps()).toEqual({
                id: '',
                noteId: '',
                openingLayout: ''
            });
        });
        it('should return opening props for focal 1 plus 4 opening', () => {
            expect(getOpeningProps(renderables)).toEqual({
                id: 'f0fujPmnOyutm2Tj',
                noteId: 'D3SATI3N45FQTB5PYSC7TRFTTU',
                openingLayout: 'bn_1_4_grid'
            });
        });

        it('should return opening props for focal 1 opening', () => {
            expect(getOpeningProps(focal1HomeRenderables)).toEqual({
                id: 'f0fujPmnOyutm2Tj',
                noteId: 'D3SATI3N45FQTB5PYSC7TRFTTU',
                openingLayout: 'bn_1_grid'
            });
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
