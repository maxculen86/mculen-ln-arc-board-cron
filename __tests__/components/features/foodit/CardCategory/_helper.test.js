import {
    validateCardCategory,
    transformCategoryData
} from '../../../../../components/features/foodit/CardCategory/_helper';

jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit.lanacion.com.ar'
}));

describe('Components - features - foodit - CardCategory - Helper', () => {
    describe('validateCardCategory', () => {
        it('should return an error if title is missing', () => {
            const result = validateCardCategory({
                title: '',
                image: 'ABCD',
                url: '/recetas',
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
                imageUrl:
                    'https://sandbox-resizer.glanacion.com/resizer/v2/VREQPEQX7RERPGAETJDWPQFNSA.jpg?auth=8e7b9e6cb6a4ea66e049ca96d8fd5344726e3185288fb16e4fda492da9109f25&width=174&height=116&quality=70&smart=true'
            });

            expect(result).toEqual({
                type: 'warning',
                message: 'Se requiere el id de una imagen'
            });
        });

        it('should return an error if url are missing', () => {
            const result = validateCardCategory({
                title: 'Titulo',
                image: 'image-id',
                url: '',
                imageUrl:
                    'https://sandbox-resizer.glanacion.com/resizer/v2/VREQPEQX7RERPGAETJDWPQFNSA.jpg?auth=8e7b9e6cb6a4ea66e049ca96d8fd5344726e3185288fb16e4fda492da9109f25&width=174&height=116&quality=70&smart=true'
            });

            expect(result).toEqual({
                type: 'warning',
                message: 'Se requiere una url'
            });
        });

        it('should return an error if no image URL is resolved', () => {
            const result = validateCardCategory({
                title: 'Titulo',
                image: 'image-id',
                url: '/tema/recetas',
                imageUrl: ''
            });

            expect(result).toEqual({
                type: 'warning',
                message: 'No se encontro imagen'
            });
        });

        it('should return an error if both rapida and facil are true', () => {
            const result = validateCardCategory({
                title: 'Titulo',
                image: 'image-id',
                url: '/tema/recetas',
                imageUrl:
                    'https://sandbox-resizer.glanacion.com/resizer/v2/VREQPEQX7RERPGAETJDWPQFNSA.jpg?auth=8e7b9e6cb6a4ea66e049ca96d8fd5344726e3185288fb16e4fda492da9109f25&width=174&height=116&quality=70&smart=true',
                rapida: true,
                facil: true
            });

            expect(result).toEqual({
                type: 'warning',
                message: 'No se pueden aplicar ambos filtros'
            });
        });

        it('should return null if all validations pass', () => {
            const result = validateCardCategory({
                title: 'Titulo',
                image: 'image-id',
                url: '/tema/recetas',
                imageUrl:
                    'https://sandbox-resizer.glanacion.com/resizer/v2/VREQPEQX7RERPGAETJDWPQFNSA.jpg?auth=8e7b9e6cb6a4ea66e049ca96d8fd5344726e3185288fb16e4fda492da9109f25&width=174&height=116&quality=70&smart=true'
            });

            expect(result).toBeNull();
        });
    });

    describe('transformCategoryData', () => {
        const baseUrl =
            'https://foodit.lanacion.com.ar/tema/vianda/?query=recetas&title=Vianda&groups=occasions&itemGroups=Vianda';
        const title = 'Vianda';

        it('should return original data if no filters are applied', () => {
            const result = transformCategoryData({
                title,
                url: baseUrl,
                rapida: false,
                facil: false
            });
            expect(result).toEqual({
                modifiedTitle: title,
                modifiedUrl: baseUrl
            });
        });

        it('should transform data correctly when facil is true', () => {
            const result = transformCategoryData({
                title,
                url: baseUrl,
                rapida: false,
                facil: true
            });
            expect(result.modifiedTitle).toBe('Vianda fácil');

            const url = new URL(result.modifiedUrl);
            expect(url.pathname).toBe('/tema/vianda-facil/');
            expect(url.searchParams.get('groups')).toBe('occasions|section');
            expect(url.searchParams.get('itemGroups')).toBe('Vianda|facil');
            expect(url.searchParams.get('title')).toBe('Vianda fácil');
        });

        it('should not duplicate labels if already present in title', () => {
            const titleWithFilter = 'Vianda fácil';
            const result = transformCategoryData({
                title: titleWithFilter,
                url: baseUrl,
                rapida: false,
                facil: true
            });
            expect(result.modifiedTitle).toBe('Vianda fácil');
        });

        it('should not duplicate slug if already present in pathname', () => {
            const urlWithSlug =
                'https://foodit.lanacion.com.ar/tema/vianda-facil/';
            const result = transformCategoryData({
                title,
                url: urlWithSlug,
                rapida: false,
                facil: true
            });
            expect(result.modifiedUrl).toBe(
                'https://foodit.lanacion.com.ar/tema/vianda-facil/?groups=section&itemGroups=facil&title=f%C3%A1cil'
            );
            expect(result.modifiedUrl).toBe(
                'https://foodit.lanacion.com.ar/tema/vianda-facil/?groups=section&itemGroups=facil&title=f%C3%A1cil'
            );
        });

        it('should transform data correctly when rapida is true', () => {
            const result = transformCategoryData({
                title,
                url: baseUrl,
                rapida: true,
                facil: false
            });
            expect(result.modifiedTitle).toBe('Vianda rápida');

            const url = new URL(result.modifiedUrl);
            expect(url.pathname).toBe('/tema/vianda-rapida/');
            expect(url.searchParams.get('groups')).toBe('occasions|section');
            expect(url.searchParams.get('itemGroups')).toBe('Vianda|rapida');
            expect(url.searchParams.get('title')).toBe('Vianda rápida');
        });

        it('should handle relative URLs correctly', () => {
            const relativeUrl =
                '/tema/vianda/?query=recetas&title=Vianda&groups=occasions&itemGroups=Vianda';
            const result = transformCategoryData({
                title,
                url: relativeUrl,
                rapida: false,
                facil: true
            });

            expect(result.modifiedUrl).toContain('/tema/vianda-facil/');
            expect(result.modifiedUrl).toContain('itemGroups=Vianda%7Cfacil');
            expect(result.modifiedUrl).toContain('title=Vianda+f%C3%A1cil');
        });
        it('should not modify URLs or title that do not contain "/tema/"', () => {
            const nonTemaUrl =
                'https://foodit.lanacion.com.ar/seccion/recetas/?query=test';
            const result = transformCategoryData({
                title,
                url: nonTemaUrl,
                rapida: false,
                facil: true
            });

            expect(result.modifiedUrl).toBe(nonTemaUrl);
            expect(result.modifiedTitle).toBe('Vianda fácil');
        });
    });
});
