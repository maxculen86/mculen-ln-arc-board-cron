import buildFooter from '../../../../../../../../../components/private/LN/api/v1/mobile/story/footer';
import { authorCommon as Author } from '../../../../../../../../../components/private/LN/api/common/elements/author';
import getDistributor from '../../../../../../../../../components/private/LN/api/common/elements/distributor';
import getZocaloAppsProps from '../../../../../../../../../components/features/LN-Api/Story/json';
jest.mock(
    '../../../../../../../../../components/private/LN/api/common/elements/distributor'
);
jest.mock(
    '../../../../../../../../../components/private/LN/api/common/elements/author',
    () => ({
        authorCommon: jest.fn()
    })
);

jest.mock(
    '../../../../../../../../../components/features/LN-Api/Story/json',
    () => jest.fn()
);
describe('buildFooter', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return comments when there is nothing else to add except hidden trust', () => {
        const article = {
            label: {
                trust: { text: 'No Mostrar Trust' }
            }
        };
        const result = buildFooter(article);
        expect(result).toEqual([{ _t: 'comments' }]);
    });

    it('should add authors if they exist', () => {
        Author.mockReturnValue({
            id: 'mock-autor',
            slug: 'mock-autor',
            valor: 'mock autor',
            rol: null,
            tipo: 1,
            imagen: '/resizer/v2/https%3A%2F%2Fauthor-service-images-prod-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F061af271-6cd0-4f47-a5f9-93473f33602a.jpg?auth=4268b107544d24e0e8a6f4db2b749ff4ead28c128035448e968d33b2ded4d03b&width=80&quality=70&smart=false'
        });

        const article = {
            label: {
                trust: { text: 'No Mostrar Trust' }
            },
            credits: {
                by: [
                    {
                        _id: 'mock-autor',
                        additional_properties: {
                            original: {
                                bio_page: '',
                                byline: 'mock autor',
                                image: 'https://resizer.glanacion.com/resizer/v2/https%3A%2F%2Fauthor-service-images-prod-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F061af271-6cd0-4f47-a5f9-93473f33602a.jpg?auth=4268b107544d24e0e8a6f4db2b749ff4ead28c128035448e968d33b2ded4d03b&width=80&quality=70&smart=false'
                            }
                        },
                        image: {
                            auth: {
                                1: '4268b107544d24e0e8a6f4db2b749ff4ead28c128035448e968d33b2ded4d03b'
                            },
                            resized_urls: [
                                {
                                    option: {
                                        height: 80,
                                        media: '(min-width: 320px)',
                                        width: 80
                                    },
                                    resizedUrl:
                                        'https://resizer.glanacion.com/resizer/v2/https%3A%2F%2Fauthor-service-images-prod-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F061af271-6cd0-4f47-a5f9-93473f33602a.jpg?auth=4268b107544d24e0e8a6f4db2b749ff4ead28c128035448e968d33b2ded4d03b&width=80&quality=70&smart=false'
                                }
                            ],
                            url: 'https://resizer.glanacion.com/resizer/v2/https%3A%2F%2Fauthor-service-images-prod-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F061af271-6cd0-4f47-a5f9-93473f33602a.jpg?auth=4268b107544d24e0e8a6f4db2b749ff4ead28c128035448e968d33b2ded4d03b&width=768&quality=70&smart=false'
                        },
                        name: 'mock autor',
                        slug: '',
                        social_links: [{ site: 'email', url: '' }],
                        type: 'author',
                        url: ''
                    }
                ]
            }
        };

        const result = buildFooter(article);

        expect(Author).toHaveBeenCalledTimes(1);
        expect(result).toEqual([
            {
                _t: 'authors',
                authors: [
                    {
                        id: 'mock-autor',
                        slug: 'mock-autor',
                        valor: 'mock autor',
                        rol: null,
                        tipo: 1,
                        imagen: '/resizer/v2/https%3A%2F%2Fauthor-service-images-prod-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F061af271-6cd0-4f47-a5f9-93473f33602a.jpg?auth=4268b107544d24e0e8a6f4db2b749ff4ead28c128035448e968d33b2ded4d03b&width=80&quality=70&smart=false'
                    }
                ]
            },
            { _t: 'comments' }
        ]);
    });

    it('should add distributor if it exists', () => {
        getDistributor.mockReturnValue({
            name: 'EL PAIS',
            url: '/distributor/el-pais/',
            legend: '@Ediciones El Pais, S.L.U.'
        });

        const article = {
            label: {
                trust: { text: 'No Mostrar Trust' }
            }
        };
        const result = buildFooter(article);

        expect(getDistributor).toHaveBeenCalled();
        expect(result).toEqual([
            {
                _t: 'distributor',
                distributor: {
                    name: 'EL PAIS',
                    url: '/distributor/el-pais/',
                    legend: '@Ediciones El Pais, S.L.U.'
                }
            },
            { _t: 'comments' }
        ]);
    });

    it('should not add distributor when it is LA NACION', () => {
        getDistributor.mockReturnValue({
            name: 'LA NACION',
            url: '/distributor/la-nacion/'
        });

        const article = {
            label: {
                trust: { text: 'No Mostrar Trust' }
            }
        };
        const result = buildFooter(article);

        expect(getDistributor).toHaveBeenCalled();
        expect(result).toEqual([{ _t: 'comments' }]);
    });

    it('should not add distributor when it is lanacionar', () => {
        getDistributor.mockReturnValue({
            name: 'lanacionar',
            url: '/distributor/lanacionar/'
        });

        const article = {
            label: {
                trust: { text: 'No Mostrar Trust' }
            }
        };
        const result = buildFooter(article);

        expect(getDistributor).toHaveBeenCalled();
        expect(result).toEqual([{ _t: 'comments' }]);
    });

    it('should add trust as true if it does not contain "nomostrartrust"', () => {
        const article = {
            label: {
                trust: { text: 'Mostrar trust' }
            }
        };

        const result = buildFooter(article);

        expect(result).toEqual([{ _t: 'trust' }, { _t: 'comments' }]);
    });

    it('should add trust as false if it contains "nomostrartrust"', () => {
        const article = {
            label: {
                trust: { text: 'No Mostrar Trust' }
            }
        };

        const result = buildFooter(article);

        expect(result).toEqual([{ _t: 'comments' }]);
    });

    it('should add authors + distributor + trust together', () => {
        Author.mockImplementation(() => {
            return {
                id: 'mock-autor',
                slug: 'mock-autor',
                valor: 'mock autor',
                rol: null,
                tipo: 1,
                imagen: '/resizer/v2/https%3A%2F%2Fauthor-service-images-prod-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F061af271-6cd0-4f47-a5f9-93473f33602a.jpg?auth=4268b107544d24e0e8a6f4db2b749ff4ead28c128035448e968d33b2ded4d03b&width=80&quality=70&smart=false'
            };
        });
        getDistributor.mockReturnValue({
            name: 'EL PAIS',
            url: '/distributor/el-pais/',
            legend: '@Ediciones El Pais, S.L.U.'
        });

        const article = {
            credits: {
                by: [
                    {
                        _id: 'mock-autor',
                        additional_properties: {
                            original: {
                                bio_page: '',
                                byline: 'mock autor',
                                image: 'https://resizer.glanacion.com/resizer/v2/https%3A%2F%2Fauthor-service-images-prod-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F061af271-6cd0-4f47-a5f9-93473f33602a.jpg?auth=4268b107544d24e0e8a6f4db2b749ff4ead28c128035448e968d33b2ded4d03b&width=80&quality=70&smart=false'
                            }
                        },
                        image: {
                            auth: {
                                1: '4268b107544d24e0e8a6f4db2b749ff4ead28c128035448e968d33b2ded4d03b'
                            },
                            resized_urls: [
                                {
                                    option: {
                                        height: 80,
                                        media: '(min-width: 320px)',
                                        width: 80
                                    },
                                    resizedUrl:
                                        'https://resizer.glanacion.com/resizer/v2/https%3A%2F%2Fauthor-service-images-prod-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F061af271-6cd0-4f47-a5f9-93473f33602a.jpg?auth=4268b107544d24e0e8a6f4db2b749ff4ead28c128035448e968d33b2ded4d03b&width=80&quality=70&smart=false'
                                }
                            ],
                            url: 'https://resizer.glanacion.com/resizer/v2/https%3A%2F%2Fauthor-service-images-prod-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F061af271-6cd0-4f47-a5f9-93473f33602a.jpg?auth=4268b107544d24e0e8a6f4db2b749ff4ead28c128035448e968d33b2ded4d03b&width=768&quality=70&smart=false'
                        },
                        name: 'mock autor',
                        slug: '',
                        social_links: [{ site: 'email', url: '' }],
                        type: 'author',
                        url: ''
                    }
                ]
            },
            label: {
                trust: { text: 'Trust OK' }
            }
        };

        const result = buildFooter(article);

        expect(result).toEqual([
            {
                _t: 'authors',
                authors: [
                    {
                        id: 'mock-autor',
                        slug: 'mock-autor',
                        valor: 'mock autor',
                        rol: null,
                        tipo: 1,
                        imagen: '/resizer/v2/https%3A%2F%2Fauthor-service-images-prod-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F061af271-6cd0-4f47-a5f9-93473f33602a.jpg?auth=4268b107544d24e0e8a6f4db2b749ff4ead28c128035448e968d33b2ded4d03b&width=80&quality=70&smart=false'
                    }
                ]
            },
            {
                _t: 'distributor',
                distributor: {
                    name: 'EL PAIS',
                    url: '/distributor/el-pais/',
                    legend: '@Ediciones El Pais, S.L.U.'
                }
            },
            { _t: 'trust' },
            { _t: 'comments' }
        ]);
    });

    it('should return the same footer received', () => {
        const article = {
            footer: [{ _t: 'card', id: 'canchallena' }],
            label: {
                trust: { text: 'No Mostrar Trust' }
            }
        };

        const result = buildFooter(article);

        expect(result).toEqual([
            { _t: 'card', id: 'canchallena' },
            { _t: 'comments' }
        ]);
    });

    it('should append zocalo card after comments when path matches', () => {
        getZocaloAppsProps.mockReturnValue({
            _t: 'card',
            id: 'canchallena'
        });

        const article = {
            label: {
                trust: { text: 'Mostrar trust' }
            },
            taxonomy: {
                primary_section: {
                    path: '/deportes/futbol'
                }
            }
        };

        const result = buildFooter(article);

        expect(result).toEqual([
            { _t: 'trust' },
            { _t: 'comments' },
            { _t: 'card', id: 'canchallena' }
        ]);
    });
});
