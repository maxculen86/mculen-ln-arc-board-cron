import setTimelineProps from '../../../../../components/features/LN-10/timeline/_helper';

describe('Components - Features - LN-10 - Timeline - _helper', () => {
    const props = {
        hideTitle: false,
        roof: 'Últimas Noticias',
        url: '',
        articles: [
            {
                artPosition: '01',
                articleData: {
                    _id: '5LKZBWGDUREZBGKEEYD4RWJDLA'
                },
                cardVariant: 'liveblog',
                hour: {
                    props: {
                        display_date: new Date()
                    }
                },
                label: {
                    text: 'En Vivo'
                },
                lead: 'Prueba Volanta',
                link: '/politica/a-fondo-sin-imagen-destacada-nid24022023/',
                titleText: 'A Fondo sin imagen destacada'
            },
            {
                artPosition: '02',
                articleData: {
                    _id: '5LKZBWGDUREZBGKEEYD4RWJDL2'
                },
                cardVariant: 'liveblog',
                hour: {
                    props: {
                        display_date: new Date()
                    }
                },
                label: {
                    text: 'En Vivo'
                },
                lead: 'Prueba Volanta',
                link: '/politica/a-fondo-sin-imagen-destacada-nid24022023/',
                titleText: 'A Fondo sin imagen destacada'
            },
            {
                artPosition: '03',
                articleData: {
                    _id: '5LKZBWGDUREZBGKEEYD4RWJDL6'
                },
                cardVariant: 'liveblog',
                hour: {
                    props: {
                        display_date: new Date()
                    }
                },
                label: {
                    text: 'En Vivo'
                },
                lead: 'Prueba Volanta',
                link: '/politica/a-fondo-sin-imagen-destacada-nid24022023/',
                titleText: 'A Fondo sin imagen destacada'
            },
            {
                artPosition: '04',
                articleData: {
                    _id: '5LKZBWGDUREZBGKEEYD4RWJDL3'
                },
                cardVariant: '',
                hour: {
                    props: {
                        display_date: new Date()
                    }
                },
                label: {},
                lead: 'Prueba Volanta',
                link: '/politica/a-fondo-sin-imagen-destacada-nid24022023/',
                titleText: 'A Fondo sin imagen destacada'
            },
            {
                artPosition: '05',
                articleData: {
                    _id: '5LKZBWGDUREZBGKEEYD4RWJDL4'
                },
                cardVariant: '',
                hour: {
                    props: {
                        display_date: new Date()
                    }
                },
                label: {},
                lead: 'Prueba Volanta',
                link: '/politica/a-fondo-sin-imagen-destacada-nid24022023/',
                titleText: 'A Fondo sin imagen destacada'
            }
        ]
    };

    test('should return object with timneline props', () => {
        const timelineProps = setTimelineProps(props);

        expect(Object.keys(timelineProps)).toEqual(['data', 'dataRoof']);
        expect(timelineProps.data).toHaveLength(props.articles.length);

        timelineProps.data.forEach((article, index) => {
            expect(Object.keys(article)).toEqual([
                'dataId',
                'dataNotaId',
                'dataSource',
                'dataPos',
                'time',
                'title',
                'href',
                'lead',
                'cardVariant'
            ]);

            expect(article.dataPos).toEqual(
                `tl${props.articles[index].artPosition}`
            );
        });

        expect(Object.keys(timelineProps.dataRoof)).toEqual([
            'text',
            'title',
            'href',
            'icon'
        ]);
    });

    test('should hides roof when hideTitle is true', () => {
        const timelineProps = setTimelineProps({
            ...props,
            hideTitle: true
        });

        expect(Object.keys(timelineProps.dataRoof)).toEqual([]);
    });
});
