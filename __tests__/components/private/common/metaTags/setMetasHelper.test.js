import setMetasOtt from '../../../../../components/private/common/metaTags/setMetasHelper';

describe('Test return function setMetasOtt', () => {
    test('setMetasOtt for video', () => {
        const props = {
            date: '2022-04-08T18:18:20.872Z',
            title: 'Somos Nosotros',
            section: 'video'
        };

        expect(setMetasOtt(props)).toStrictEqual({
            title: `${props.title} programa emitido el 08 de Abril de 2022 - LN+`,
            description: `Ingresá en LN+ para ver ${props.title} programa emitido el 08 de Abril de 2022. Los mejores programas están en LN+`
        });
    });

    test('setMetasOtt for acumulado', () => {
        const props = {
            acumulado: 'El noticiero',
            section: 'acumulado',
            siteProperties: {
                acumuladoTitle:
                    'Mirá todos los programas y videos online en LN+'
            }
        };

        expect(setMetasOtt(props)).toStrictEqual({
            title: `${props.acumulado} - ${props.siteProperties.acumuladoTitle}`,
            description: `Ingresá a LN+ para ver ${props.acumulado} en vivo y emisiones pasadas.`
        });
    });

    test('setMetasOtt for home', () => {
        const props = {
            section: 'home',
            siteProperties: {
                title: 'LN+ Mirá todos los programas y videos online',
                description:
                    'Ingresá a LN+ para ver todos los programas y videos online: La Cornisa, Odisea Argentina, El diario de Leuco, Mesa chica y mucho más!'
            }
        };

        expect(setMetasOtt(props)).toStrictEqual(props.siteProperties);
    });
});
