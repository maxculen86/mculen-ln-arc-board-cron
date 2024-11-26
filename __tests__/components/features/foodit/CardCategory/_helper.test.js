import {
    validateCardCategory,
    groupsParser,
    itemGroupsParser,
    resolveUrl
} from '../../../../../components/features/foodit/CardCategory/_helper';

describe('Components - features - foodit - CardCategory - Helper', () => {
    describe('validateCardCategory', () => {
        it('should return an error if title is missing', () => {
            const result = validateCardCategory({
                title: '',
                image: 'ABCD',
                url: '/recetas',
                query: '',
                groups: ['seccion'],
                itemGroups: ['arroz'],
                imageUrl:
                    'https://sandbox-resizer.glanacion.com/resizer/v2/VREQPEQX7RERPGAETJDWPQFNSA.jpg?auth=8e7b9e6cb6a4ea66e049ca96d8fd5344726e3185288fb16e4fda492da9109f25&width=174&height=116&quality=70&smart=true'
            });

            expect(result).toEqual({
                type: 'warning',
                message: 'Se requiere un titulo'
            });
        });

        it('should return an error if image ID is missing', () => {
            const result = validateCardCategory({
                title: 'Titulo',
                image: '',
                url: '/recetas',
                query: '',
                groups: ['seccion'],
                itemGroups: ['item1'],
                imageUrl:
                    'https://sandbox-resizer.glanacion.com/resizer/v2/VREQPEQX7RERPGAETJDWPQFNSA.jpg?auth=8e7b9e6cb6a4ea66e049ca96d8fd5344726e3185288fb16e4fda492da9109f25&width=174&height=116&quality=70&smart=true'
            });

            expect(result).toEqual({
                type: 'warning',
                message: 'Se requiere el id de una imagen'
            });
        });

        it('should return an error if groups and itemGroups lengths do not match', () => {
            const result = validateCardCategory({
                title: 'Titulo',
                image: 'image-id',
                url: '/recetas',
                query: '',
                groups: ['seccion'],
                itemGroups: [],
                imageUrl:
                    'https://sandbox-resizer.glanacion.com/resizer/v2/VREQPEQX7RERPGAETJDWPQFNSA.jpg?auth=8e7b9e6cb6a4ea66e049ca96d8fd5344726e3185288fb16e4fda492da9109f25&width=174&height=116&quality=70&smart=true'
            });

            expect(result).toEqual({
                type: 'warning',
                message:
                    'Los grupos y los valores deben tener la misma cantidad ya que estan relacionadas'
            });
        });

        it('should return an error if both url and query are missing', () => {
            const result = validateCardCategory({
                title: 'Titulo',
                image: 'image-id',
                url: '',
                query: '',
                groups: ['seccion'],
                itemGroups: ['item1'],
                imageUrl:
                    'https://sandbox-resizer.glanacion.com/resizer/v2/VREQPEQX7RERPGAETJDWPQFNSA.jpg?auth=8e7b9e6cb6a4ea66e049ca96d8fd5344726e3185288fb16e4fda492da9109f25&width=174&height=116&quality=70&smart=true'
            });

            expect(result).toEqual({
                type: 'warning',
                message: 'Se requiere una url o un termino de busqueda'
            });
        });

        it('should return an error if no image URL is resolved', () => {
            const result = validateCardCategory({
                title: 'Titulo',
                image: 'image-id',
                url: '/recetas',
                query: '',
                groups: ['seccion'],
                itemGroups: ['item1'],
                imageUrl: ''
            });

            expect(result).toEqual({
                type: 'warning',
                message: 'No se encontro imagen'
            });
        });

        it('should return null if all validations pass', () => {
            const result = validateCardCategory({
                title: 'Titulo',
                image: 'image-id',
                url: '/recetas',
                query: '',
                groups: ['seccion'],
                itemGroups: ['item1'],
                imageUrl:
                    'https://sandbox-resizer.glanacion.com/resizer/v2/VREQPEQX7RERPGAETJDWPQFNSA.jpg?auth=8e7b9e6cb6a4ea66e049ca96d8fd5344726e3185288fb16e4fda492da9109f25&width=174&height=116&quality=70&smart=true'
            });

            expect(result).toBeNull();
        });
    });

    describe('groupsParser', () => {
        it('should parse group names to corresponding keys', () => {
            const groups = ['ingrediente principal', 'seccion', 'ocasion'];
            const result = groupsParser(groups);

            expect(result).toEqual([
                'main_ingredients',
                'section',
                'occasions'
            ]);
        });

        it('should return an empty string for unrecognized group names', () => {
            const groups = ['unrecognized'];
            const result = groupsParser(groups);

            expect(result).toEqual(['']);
        });

        it('should handle empty groups array', () => {
            const result = groupsParser([]);
            expect(result).toEqual([]);
        });
    });

    describe('itemGroupsParser', () => {
        it('should parse item groups with special cases for "subtype" and "video_jw"', () => {
            const input = {
                groups: ['subtype', 'video_jw'],
                itemGroups: ['receta', 'si']
            };
            const result = itemGroupsParser(input);

            expect(result).toEqual(['7', 'video_jw']);
        });

        it('should handle unrecognized item groups', () => {
            const input = {
                groups: ['seccion'],
                itemGroups: ['unknown']
            };
            const result = itemGroupsParser(input);

            expect(result).toEqual(['unknown']);
        });

        it('should return an empty array for no item groups', () => {
            const result = itemGroupsParser({ groups: [], itemGroups: [] });
            expect(result).toEqual([]);
        });
    });

    describe('resolveUrl', () => {
        it('should generate a URL with all query parameters', () => {
            const input = {
                query: 'mockQuery',
                titleAcu: 'Titulo',
                groups: 'seccion|tipo de coccion',
                itemGroups: 'item1^item2',
                featureId: '000AAABBBCCC'
            };

            const result = resolveUrl(input);

            expect(result).toEqual(
                '/tema/titulo-000aaabbbccc/?query=mockQuery&title=Titulo&groups=seccion%7Ctipo%20de%20coccion&itemGroups=item1%5Eitem2'
            );
        });
    });
});
