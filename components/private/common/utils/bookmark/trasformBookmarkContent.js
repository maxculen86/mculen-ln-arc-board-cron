import { RESIZER_URL_PUBLIC } from 'fusion:environment';
import get from '../get';
import { getShortestImage } from '../../../LN/common/utils/mediaHelper';

const trasformBookmarkContent = (data = []) => {
    return data.map(article => {
        const { bookmarkId, bookmarkContent } = article;
        let basic = {};
        const image = get(bookmarkContent, 'imagen', undefined);

        if (image) {
            const arrayImageResized = get(
                bookmarkContent,
                'imagen.parametros',
                []
            );
            const urlAbsolute = get(bookmarkContent, 'imagen.absoluteUrl', '');
            const resizedUrls = arrayImageResized.map(({ ancho, firma }) => {
                return {
                    option: {
                        width: ancho
                    },
                    resizedUrl: firma
                        ? urlAbsolute.replace('{{param}}', firma)
                        : ''
                };
            });

            const { resizedUrl, _width: width } = getShortestImage(resizedUrls);

            // const height = resizedUrl

            basic = {
                height: 'Hay que tomar el alto de la url',
                resized_urls: resizedUrls,
                type: 'image',
                url: resizedUrl || '',
                width
            };
        }

        const autores = get(bookmarkContent, 'autores', []).map(
            ({ imagen, valor }) => {
                return {
                    additional_properties: {
                        original: {
                            author_type: ''
                        }
                    },
                    image: imagen && `${RESIZER_URL_PUBLIC}${imagen}`,
                    name: valor,
                    type: 'author'
                };
            }
        );

        return {
            _id: get(article, 'bookmarkTypeId', ''),
            credits: {
                by: autores
            },
            headlines: {
                basic: get(bookmarkContent, 'titulo', '')
            },
            label: {
                recomendar: { text: '' },
                volanta: { display: false, text: '' }
            },
            promo_items: {
                basic
            },
            category: get(bookmarkContent, 'categoria.valor', ''),
            // related_content: { basic: [] },
            // subheadlines: {
            //     basic:
            //         'Se están realizando movilizaciones en 22 provincias del país para reclamar al Gobierno la generación de puestos de trabajo y asistencia a los comedores; el Movimiento Evita y Barrios de Pie suspendieron la marcha de apoyo a Alberto Fernández'
            // },
            // subtype: '1',
            // taxonomy: {
            //     primary_section: {
            //         _id: '/politica',
            //         additional_properties: [Object],
            //         name: '=67',
            //         path: '/politica'
            //     }
            // },
            website_url: get(bookmarkContent, 'url', ''),
            bookmarkId
        };
    });
};

export default trasformBookmarkContent;

const data = [
    {
        bookmarkId: 'f5f4c1b5-e5f9-4c8b-b33e-99315d248255',
        bookmarkType: 'story',
        bookmarkTypeId: 'NFOE7IE6FVEBLKW2EO3LCTAA2Y',
        bookmarkContent: {
            bajada:
                'La Corte provincial intervino en 2019 en una pulseada jurídica que duró más de diez años',
            fecha: '28 de diciembre de 2021 • 14:12',
            categoria: {
                valor: 'Política',
                slug: '/politica'
            },
            titulo:
                'Mendoza: cómo la Justicia enterró el deseo de los intendentes eternos',
            enviarApps: true,
            fechaActualizacion: '28 de diciembre de 2021 • 14:12',
            imagen: {
                baseUrl:
                    '/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/5UH2M5EWTZBIJE6LCGMRZCUEW4.jpg',
                id: '5UH2M5EWTZBIJE6LCGMRZCUEW4',
                _t: 'img',
                parametros: [
                    {
                        firma:
                            'P4T41MmV3eifqiteLXmKuJcW_mw=/360x240/filters:quality(80)',
                        media: 1024,
                        ancho: 360
                    },
                    {
                        firma:
                            'Rv5WizN4nrGJr-3G2t9vTs0O4ww=/768x512/filters:quality(80)',
                        media: 768,
                        ancho: 768
                    },
                    {
                        firma:
                            'lW7qG2X_dHzU9b8TF0x9bIRQlTk=/351x234/filters:quality(80)',
                        media: 360,
                        ancho: 351
                    },
                    {
                        firma:
                            'P4T41MmV3eifqiteLXmKuJcW_mw=/360x240/filters:quality(80)',
                        media: 320,
                        ancho: 360
                    }
                ],
                absoluteUrl:
                    'https://resizer.glanacion.com/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/5UH2M5EWTZBIJE6LCGMRZCUEW4.jpg'
            },
            id: 'NFOE7IE6FVEBLKW2EO3LCTAA2Y',
            autores: [
                {
                    valor: 'Pablo Mannino',
                    imagen:
                        '/resizer/ZcQcAq3Npl33zoVxEdDDBIJ6p4k=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/99/3401499.png',
                    tipo: 1,
                    id: 5479,
                    slug: 'pablo-mannino-5479'
                }
            ],
            templateId: '1',
            url:
                '/politica/mendoza-como-la-justicia-enterro-el-deseo-de-los-intendentes-eternos-nid28122021/',
            tags: [
                {
                    valor: 'Mendoza',
                    slug: 'mendoza-tid193',
                    id: 193
                }
            ]
        },
        bookmarkState: 100,
        createdDate: 1652733078963,
        updatedDate: 1652733078963,
        bookmarkParent: 'NFOE7IE6FVEBLKW2EO3LCTAA2Y',
        bookmarkGroup: 'default'
    }
];
