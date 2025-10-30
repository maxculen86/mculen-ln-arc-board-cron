import getDistributor from '../../../../../../../../components/private/LN/api/common/elements/distributor';

describe('API elements distributor tests', () => {
    describe('when distributor is La Nación', () => {
        const article = {
            distributor: {
                name: 'LA NACION'
            }
        };
        it('returns name and La Nación url', () => {
            const distributor = getDistributor(article);

            expect(distributor).toEqual({
                name: 'LA NACION',
                url: 'https://www.lanacion.com.ar/'
            });
        });
    });
    describe('when distributor is not La Nación', () => {
        it('returns name and url if category is `other` and author is guest', () => {
            const article = {
                distributor: {
                    name: 'Test Distributor',
                    category: 'other'
                },
                credits: {
                    by: [
                        {
                            type: 'author',
                            name: 'author',
                            additional_properties: {
                                original: {
                                    author_type: ''
                                }
                            }
                        }
                    ]
                }
            };

            const distributor = getDistributor(article);

            expect(distributor).toEqual({
                name: 'Test Distributor',
                url: '/distributor/test-distributor/'
            });
        });
        it('returns undefined if category is not `other`', () => {
            const article = {
                distributor: {
                    name: 'Test Distributor',
                    category: 'staff'
                },
                authors: [
                    {
                        additional_properties: {
                            original: {
                                author_type: ''
                            }
                        }
                    }
                ]
            };

            const distributor = getDistributor(article);

            expect(distributor).toBeUndefined();
        });
        it('returns undefined if category is other and author is not guest', () => {
            const article = {
                distributor: {
                    name: 'Test Distributor',
                    category: 'other'
                },
                credits: {
                    by: [
                        {
                            additional_properties: {
                                original: {
                                    author_type: 'Estándar'
                                }
                            }
                        }
                    ]
                }
            };

            const distributor = getDistributor(article);

            expect(distributor).toBeUndefined();
        });

        it('returns undefined if category is other and author is not guest and not is for home', () => {
            const article = {
                distributor: {
                    name: 'Test Distributor',
                    category: 'other'
                },
                credits: {
                    by: [
                        {
                            additional_properties: {
                                original: {
                                    author_type: 'Estándar'
                                }
                            }
                        }
                    ]
                }
            };

            const distributor = getDistributor(article, false);

            expect(distributor.name).toBe('Test Distributor');
            expect(distributor.url).toBe('/distributor/test-distributor/');
        });
    });
});
