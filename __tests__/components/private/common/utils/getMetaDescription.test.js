import getMetaDescription from '../../../../../components/private/common/utils/getMetaDescription';

describe('Common - utils - getMetaDescription.js', () => {
    const description = 'Descripción Pruebaaaaa !!!';
    const subHeadLines = 'Subheadline hasta el primer punto.';
    ('La postulación de la diplomática, elogiada en varias ocasiones públicamente por Felipe Solá, tomó fuerza en las últimas horas y, por ahora, no genera resistencias en el Palacio San Martín.');
    const metaTitleBasic =
        'El Gobierno evalúa postular a una diplomática de carrera para la embajada en el Vaticano';

    test('Test de return getMetaDescription', () => {
        const metaDescription = getMetaDescription(
            description,
            subHeadLines,
            metaTitleBasic,
            '1'
        );
        expect(metaDescription).toStrictEqual(
            'Descripción Pruebaaaaa !!! - LA NACION'
        );
    });
});

describe('Common - utils - getMetaDescription.js para receta', () => {
    const description = '';
    const subHeadLines = 'Subheadline hasta el primer punto. Mas subheadline';
    const metaTitleBasic = 'Pastel de papa con canela';

    test('Test de return getMetaDescription', () => {
        const metaDescription = getMetaDescription(
            description,
            subHeadLines,
            metaTitleBasic,
            '7'
        );
        expect(metaDescription).toStrictEqual(
            'Subheadline hasta el primer punto. Encontrá acá la receta de Pastel de papa con canela - LA NACION'
        );
    });
});
