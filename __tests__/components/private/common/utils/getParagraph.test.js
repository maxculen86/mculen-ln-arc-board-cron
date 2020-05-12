import getParagraph from '../../../../../components/private/common/utils/getParagraph';

describe('Common - utils - getParagraph.js', () => {
    const contentElements = [
        {
            _id: 'TQEIH4634FB77AAR32FNTSDIMU',
            content:
                'La postulación de la diplomática, elogiada en varias ocasiones públicamente por Felipe Solá, tomó fuerza en las últimas horas y, por ahora, no genera resistencias en el Palacio San Martín.',
            type: 'text'
        },
        {
            _id: 'N6ME6MZXINHEJK7GS5Z3L7HC6E',
            content:
                'El nombre de Squeff, muy cercana al kirchnerismo, comenzó a sonar en los pasillos de la Cancillería luego del traspié del Gobierno tras <a href="https://www.lanacion.com.ar/politica/antes-del-viaje-alberto-fernandez-se-cayo-nid2324570">la caída sorpresiva de la postulación de Luis Bellando</a>, otro diplomático de carrera, para representar al país en la Santa Sede.',
            type: 'text'
        },
        {
            _id: 'AVNPEW5Z25CAZKZOPUA37J6374',
            content:
                'Aunque se especuló con que Fernández podría consultar con el Sumo Pontífice la designación del futuro embajador, en la Cancillería no descartan que el nombre se confirme incluso antes del viaje presidencial.',
            type: 'text'
        }
    ];

    test('Test de getParagraph ver si el primer elemento es un string', () => {
        const contentElement = getParagraph(contentElements);
        expect(contentElement).toStrictEqual(
            'La postulación de la diplomática, elogiada en varias ocasiones públicamente por Felipe Solá, tomó fuerza en las últimas horas y, por ahora, no genera resistencias en el Palacio San Martín.'
        );
    });
});
