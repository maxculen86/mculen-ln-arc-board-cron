import acuTransformV2Format from '../../../../../../../../../content/sources/utils/pageSource/acumulados/v2/mobile/bySection/acuTransformV2Format';

describe('Test acumulados transformation with V2 Format', () => {
    test('transform returns metadata and items from array of acumulados', () => {
        const acumulado = [
            {
                tipoAcumulado: 1,
                paginar: false,
                titulo: 'Economy',
                notas: [
                    {
                        id: 'YJCIXGCMLZENDBXZRELU6ECBKE',
                        templateId: '1',
                        titulo: 'Bajó la tasa de interés de la deuda argentina',
                        tituloMobile:
                            'Bajó la tasa de interés de la deuda argentina',
                        fecha: '2000-01-6 00:00:00',
                        url:
                            '/economia/bajo-la-tasa-de-interes-de-la-deuda-argentina-nid505/',
                        bajada:
                            'El Gobierno colocó en el mercado internacional un bono en euros por US$ 778 millones a 7 años de plazo; el costo fue del 10,25% anual, 0,37 punto menos que la última emisión',
                        enviarApps: true,
                        autores: [
                            {
                                id: 170,
                                slug: 'javier-blanco-170',
                                valor: 'Javier Blanco',
                                tipo: 1
                            }
                        ],
                        categoria: {
                            slug: '/economia',
                            valor: 'Economía'
                        },
                        tags: [
                            {
                                id: 54327,
                                slug: 'comunidad-de-negocios-tid54327',
                                valor: 'Comunidad de Negocios',
                                tipoId: 1,
                                formatoId: 1,
                                tipoDescripcion: 'Topico'
                            }
                        ]
                    }
                ],
                slug: '/economia'
            }
        ];

        const result = acuTransformV2Format(
            acumulado,
            { slug: '/economia' },
            true
        );

        expect(Object.keys(result).sort()).toEqual(
            ['metadata', 'items'].sort()
        );
    });

    test('transform should return right values for metadata object', () => {
        const acumulado = [
            {
                tipoAcumulado: 1,
                paginar: false,
                titulo: 'Economy',
                acumuladoTotal: 1,
                banners: [],
                notas: [
                    {
                        id: 'YJCIXGCMLZENDBXZRELU6ECBKE',
                        templateId: '1',
                        titulo: 'Bajó la tasa de interés de la deuda argentina',
                        tituloMobile:
                            'Bajó la tasa de interés de la deuda argentina',
                        fecha: '2000-01-6 00:00:00',
                        url:
                            '/economia/bajo-la-tasa-de-interes-de-la-deuda-argentina-nid505/',
                        bajada:
                            'El Gobierno colocó en el mercado internacional un bono en euros por US$ 778 millones a 7 años de plazo; el costo fue del 10,25% anual, 0,37 punto menos que la última emisión',
                        enviarApps: true,
                        autores: [
                            {
                                id: 170,
                                slug: 'javier-blanco-170',
                                valor: 'Javier Blanco',
                                tipo: 1
                            }
                        ],
                        categoria: {
                            slug: '/economia',
                            valor: 'Economía'
                        },
                        tags: [
                            {
                                id: 54327,
                                slug: 'comunidad-de-negocios-tid54327',
                                valor: 'Comunidad de Negocios',
                                tipoId: 1,
                                formatoId: 1,
                                tipoDescripcion: 'Topico'
                            }
                        ]
                    }
                ]
            }
        ];

        const result = acuTransformV2Format(acumulado, '/economia', true);

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['paginate', 'title', 'total', 'banners', 'category'].sort()
        );

        expect(Object.keys(result.metadata.category).sort()).toEqual(
            ['slug', 'value'].sort()
        );
    });

    test('transform should return right values for metadata object', () => {
        const acumulado = [
            {
                tipoAcumulado: 1,
                paginar: false,
                titulo: 'Economy',
                acumuladoTotal: 1,
                banners: [],
                notas: [
                    {
                        id: 'YJCIXGCMLZENDBXZRELU6ECBKE',
                        templateId: '1',
                        titulo: 'Bajó la tasa de interés de la deuda argentina',
                        tituloMobile:
                            'Bajó la tasa de interés de la deuda argentina',
                        fecha: '2000-01-6 00:00:00',
                        url:
                            '/economia/bajo-la-tasa-de-interes-de-la-deuda-argentina-nid505/',
                        bajada:
                            'El Gobierno colocó en el mercado internacional un bono en euros por US$ 778 millones a 7 años de plazo; el costo fue del 10,25% anual, 0,37 punto menos que la última emisión',
                        enviarApps: true,
                        autores: [
                            {
                                id: 170,
                                slug: 'javier-blanco-170',
                                valor: 'Javier Blanco',
                                tipo: 1
                            }
                        ],
                        categoria: {
                            slug: '/economia',
                            valor: 'Economía'
                        },
                        tags: [
                            {
                                id: 54327,
                                slug: 'comunidad-de-negocios-tid54327',
                                valor: 'Comunidad de Negocios',
                                tipoId: 1,
                                formatoId: 1,
                                tipoDescripcion: 'Topico'
                            }
                        ]
                    }
                ]
            }
        ];

        const result = acuTransformV2Format(acumulado, '/economia', true);

        expect(Object.keys(result.metadata).sort()).toEqual(
            ['paginate', 'title', 'total', 'banners', 'category'].sort()
        );

        expect(Object.keys(result.metadata.category).sort()).toEqual(
            ['slug', 'value'].sort()
        );
    });

    test('transform should return right metadata for suscriptores', () => {
        const acumulado = [
            {
                tipoAcumulado: 1,
                paginar: false,
                titulo: 'Economy',
                acumuladoTotal: 1,
                banners: [],
                notas: [
                    {
                        id: 'YJCIXGCMLZENDBXZRELU6ECBKE',
                        templateId: '1',
                        titulo: 'Bajó la tasa de interés de la deuda argentina',
                        tituloMobile:
                            'Bajó la tasa de interés de la deuda argentina',
                        fecha: '2000-01-6 00:00:00',
                        url:
                            '/economia/bajo-la-tasa-de-interes-de-la-deuda-argentina-nid505/',
                        bajada:
                            'El Gobierno colocó en el mercado internacional un bono en euros por US$ 778 millones a 7 años de plazo; el costo fue del 10,25% anual, 0,37 punto menos que la última emisión',
                        enviarApps: true,
                        autores: [
                            {
                                id: 170,
                                slug: 'javier-blanco-170',
                                valor: 'Javier Blanco',
                                tipo: 1
                            }
                        ],
                        categoria: {
                            slug: '/economia',
                            valor: 'Economía'
                        },
                        tags: [
                            {
                                id: 54327,
                                slug: 'comunidad-de-negocios-tid54327',
                                valor: 'Comunidad de Negocios',
                                tipoId: 1,
                                formatoId: 1,
                                tipoDescripcion: 'Topico'
                            }
                        ]
                    }
                ]
            }
        ];

        const result = acuTransformV2Format(acumulado, '/suscriptores', true);

        expect(result.metadata).toEqual({
            banners: [],
            category: {
                slug: '/suscriptores',
                value: 'Suscriptores'
            },
            paginate: true,
            title: 'Suscriptores',
            total: 1
        });
    });

    test('transform should return right metadata for ultimas-noticias', () => {
        const acumulado = [
            {
                tipoAcumulado: 1,
                paginar: false,
                titulo: 'Economy',
                acumuladoTotal: 1,
                banners: [],
                notas: [
                    {
                        id: 'YJCIXGCMLZENDBXZRELU6ECBKE',
                        templateId: '1',
                        titulo: 'Bajó la tasa de interés de la deuda argentina',
                        tituloMobile:
                            'Bajó la tasa de interés de la deuda argentina',
                        fecha: '2000-01-6 00:00:00',
                        url:
                            '/economia/bajo-la-tasa-de-interes-de-la-deuda-argentina-nid505/',
                        bajada:
                            'El Gobierno colocó en el mercado internacional un bono en euros por US$ 778 millones a 7 años de plazo; el costo fue del 10,25% anual, 0,37 punto menos que la última emisión',
                        enviarApps: true,
                        autores: [
                            {
                                id: 170,
                                slug: 'javier-blanco-170',
                                valor: 'Javier Blanco',
                                tipo: 1
                            }
                        ],
                        categoria: {
                            slug: '/economia',
                            valor: 'Economía'
                        },
                        tags: [
                            {
                                id: 54327,
                                slug: 'comunidad-de-negocios-tid54327',
                                valor: 'Comunidad de Negocios',
                                tipoId: 1,
                                formatoId: 1,
                                tipoDescripcion: 'Topico'
                            }
                        ]
                    }
                ]
            }
        ];

        const result = acuTransformV2Format(
            acumulado,
            '/ultimas-noticias',
            true
        );

        expect(result.metadata).toEqual({
            banners: [],
            category: {
                slug: '/ultimas-noticias',
                value: 'Últimas noticias'
            },
            paginate: true,
            title: 'Últimas noticias',
            total: 1
        });
    });
    test('transform should NOT return banners for avisos funebres', () => {
        const acumulado = [
            {
                tipoAcumulado: 1,
                paginar: false,
                titulo: 'Fúnebres',
                acumuladoTotal: 2386,
                banners: [
                    { idSeccion: 402, index: 4 }
                ],
                notas: [
                    {
                        id: 'TEST123',
                        templateId: '1',
                        titulo: 'AVISO FÚNEBRE',
                        fecha: '2026-03-01 00:00:00',
                        url: '/avisos/funebres/test',
                        enviarApps: true
                    }
                ]
            }
        ];

        const result = acuTransformV2Format(
            acumulado,
            '/avisos/funebres',
            true
        );

        expect(result.metadata).toEqual({
            paginate: true,
            title: 'Fúnebres',
            total: 2386,
            category: {
                slug: '/avisos/funebres',
                value: 'Fúnebres'
            }
        });

        expect(result.metadata).not.toHaveProperty('banners');
    });
});
