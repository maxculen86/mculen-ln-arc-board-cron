import {
    setArraySection,
    formatSectionName
} from '../../../../../../components/features/foodit-global/common/breadcrumb/_helpers';

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar'
    };
});

describe('Tests - helpers- breadcrumb - foodit ', () => {
    describe('Function formatSectionName', () => {
        test('Returns an empty string when no string is supplied', () => {
            expect(formatSectionName()).toBe('');
        });

        test('returns capitalized string when there are no special characters', () => {
            expect(formatSectionName('recetas')).toBe('Recetas');
        });

        test('reemplaza las barras inclinadas por espacios y capitaliza la cadena', () => {
            expect(formatSectionName('/recetas/sin-gluten')).toBe(
                'Recetas sin gluten'
            );
        });

        test('replace hyphens with spaces and capitalize the string', () => {
            expect(formatSectionName('/sin-gluten')).toBe('Sin gluten');
        });
    });

    describe('Function setArraySection', () => {
        const site = 'https://foodit.lanacion.com.ar';
        test('returns an array with a default object when no string is supplied', () => {
            expect(setArraySection()).toEqual([
                {
                    name: 'Foodit',
                    url: site,
                    disabled: false
                }
            ]);
        });

        test('returns an array with a default object when an empty string is supplied', () => {
            expect(setArraySection('')).toEqual([
                {
                    name: 'Foodit',
                    url: site,
                    disabled: false
                }
            ]);
        });

        test('returns an array with an object for the given section', () => {
            expect(setArraySection('/miSeccion')).toEqual([
                {
                    name: 'Foodit',
                    url: 'https://foodit.lanacion.com.ar',
                    disabled: false
                },
                {
                    name: 'MiSeccion',
                    url: `${site}/miSeccion/`,
                    disabled: false
                }
            ]);
        });

        test('returns an array with objects for each provided section', () => {
            expect(setArraySection('/seccion1/seccion2')).toEqual([
                {
                    name: 'Foodit',
                    url: 'https://foodit.lanacion.com.ar',
                    disabled: false
                },
                {
                    name: 'Seccion1',
                    url: `${site}/seccion1/`,
                    disabled: false
                },
                {
                    name: 'Seccion2',
                    url: `${site}/seccion1/seccion2/`,
                    disabled: false
                }
            ]);
        });

        test('marks the last section as disabled when it is accumulated', () => {
            expect(setArraySection('/seccion1/seccion2', true)).toEqual([
                {
                    name: 'Foodit',
                    url: 'https://foodit.lanacion.com.ar',
                    disabled: false
                },
                {
                    name: 'Seccion1',
                    url: `${site}/seccion1/`,
                    disabled: false
                },
                {
                    name: 'Seccion2',
                    url: `${site}/seccion1/seccion2/`,
                    disabled: true
                }
            ]);
        });

        test('returns correct array when parentInfo is provided (using splitSections logic)', () => {
            const parentInfo = {
                parentName: 'Parent Category',
                parentId: '/parent'
            };
            expect(
                setArraySection('/recetas/stews', false, parentInfo)
            ).toEqual([
                {
                    name: 'Foodit',
                    url: site,
                    disabled: false
                },
                {
                    name: parentInfo.parentName,
                    url: `${site}${parentInfo.parentId}/`,
                    disabled: false
                },
                {
                    name: 'Stews',
                    url: `${site}/recetas/stews/`,
                    disabled: false
                }
            ]);
        });
    });
});
