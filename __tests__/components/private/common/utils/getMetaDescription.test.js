import getMetaDescription from '../../../../../components/private/common/utils/getMetaDescription';

describe('Common - utils - getMetaDescription.js', () => {
    const description = 'Descripción Pruebaaaaa !!!';
    const firstParagraphContentElements =
        'La postulación de la diplomática, elogiada en varias ocasiones públicamente por Felipe Solá, tomó fuerza en las últimas horas y, por ahora, no genera resistencias en el Palacio San Martín.';
    const metaTitleBasic =
        'El Gobierno evalúa postular a una diplomática de carrera para la embajada en el Vaticano';

    test('Test de return getMetaDescription', () => {
        const metaDescription = getMetaDescription(
            description,
            firstParagraphContentElements,
            metaTitleBasic
        );
        expect(metaDescription).toStrictEqual('Descripción Pruebaaaaa !!!');
    });
});
