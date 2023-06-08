import React from 'react';
import CommonCollection from '../../../../../../../components/private/LN10/home/components/CommonCollection/default';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import diagramationRules from '../../../../../../../components/private/common/utils/diagramationRules';
import articles from '../../../../../../../__mocks__/data/CommonCollection/articles.json';
import { Cajahashtag } from '@ln/contenidos-ui-cajahashtag';
import { CHAIN_STYLE } from '../../../../../../../components/chains/utils/common/_helpers-WebApi';
import {
    getTitleAndLeadForHome,
    getDataAuthorCollection,
    getBadge
} from '../../../../../../../components/private/LN10/home/components/CommonCollection/_helper';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Tests Component CommonCollection', () => {
    const roofData = {
        title: 'CommonCOllection',
        titleLink: '',
        logoId: '',
        buttonText: '',
        linkButton: '',
        buttonStyle: '',
        hideRoof: false,
        navigationId: '',
        isAdmin: true,
        chainId: 'njsaiodnJ'
    };

    const getProps = ({ articles, rules, dataRoof, gridType }) => ({
        roofData: dataRoof,
        rules,
        gridType,
        articles
    });

    test('should return 8 articles', () => {
        const { container } = render(
            <CommonCollection
                {...getProps({
                    articles,
                    rules: diagramationRules('bnGrilla8'),
                    dataRoof: roofData
                })}
            />
        );

        expect(screen.getAllByRole('article')).toHaveLength(8);
        expect(container).toMatchSnapshot();
    });

    test('should return hashTag with 7 articles', () => {
        const { HASHTAG } = CHAIN_STYLE;
        const dataRoof = {
            ...roofData,
            buttonText: 'Hola mundo',
            linkButton: 'https://lanacion.com.ar',
            chainStyle: HASHTAG
        };

        const props = {
            ...getProps({
                articles: articles.slice(0, 7),
                gridType: 'hash-1-2-2-2_grid',
                rules: diagramationRules('hash-1-2-2-2_grid'),
                dataRoof
            })
        };

        const { container } = render(
            <CommonCollection {...props} ContainerCards={Cajahashtag} />
        );

        const articlesRendered = screen.getAllByRole('article');

        expect(articlesRendered).toHaveLength(7);
        expect(articlesRendered[0]).toHaveClass(
            'ln-card --d-flex --flex-col --ai-start --m --regular'
        );
        articlesRendered.slice(1, 7).forEach(article => {
            expect(article).toHaveClass(
                'ln-card --d-flex --flex-col --ai-start --tab-text-center --m --regular --mobile-img-right'
            );
        });
        expect(container.querySelector('.ln-caja-hashtag')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});

describe('Tests function getTitleAndLeadForHome', () => {
    test('should return title short and lead', () => {
        const article1 = {
            headlines: {
                basic: 'Bullrich visita El Calafate y presenta libro',
                mobile: 'Este es un titulo corto.'
            },
            label: {
                volanta: {
                    text: 'Santa Cruz.'
                }
            }
        };

        expect(getTitleAndLeadForHome(article1)).toStrictEqual({
            lead: 'Santa Cruz.',
            title: 'Este es un titulo corto.'
        });
        expect(getTitleAndLeadForHome(undefined)).toStrictEqual({
            lead: '',
            title: ''
        });
        expect(getTitleAndLeadForHome(null)).toStrictEqual({
            lead: '',
            title: ''
        });
    });

    test('should return title long and no lead', () => {
        const article1 = {
            headlines: {
                basic: 'Bullrich visita El Calafate y presenta libro',
                mobile: ''
            },
            label: {
                volanta: {
                    text: 'Santa Cruz.'
                }
            }
        };

        expect(getTitleAndLeadForHome(article1)).toStrictEqual({
            lead: '',
            title: 'Bullrich visita El Calafate y presenta libro'
        });
    });

    test('Should always return the long title when required (when the requireTitleLong parameter is true).', () => {
        const article1 = {
            headlines: {
                basic: 'Bullrich visita El Calafate y presenta libro',
                mobile: 'Bullrich en el calafate.'
            },
            label: {
                volanta: {
                    text: 'Santa Cruz.'
                }
            }
        };

        expect(getTitleAndLeadForHome(article1, true)).toStrictEqual({
            lead: '',
            title: 'Bullrich visita El Calafate y presenta libro'
        });
    });

    test('In case the long title is required, but does not exist, it must return the short title.', () => {
        const article1 = {
            headlines: {
                basic: '',
                mobile: 'Bullrich en el calafate.'
            },
            label: {
                volanta: {
                    text: 'Santa Cruz.'
                }
            }
        };

        expect(getTitleAndLeadForHome(article1, true)).toStrictEqual({
            lead: '',
            title: 'Bullrich en el calafate.'
        });
    });
});

describe('Tests function getDataAuthorCollection', () => {
    const getArticle = (withCredits, nameAuthor = 'Juan Perez') => ({
        credits: {
            by: [withCredits && { name: nameAuthor }]
        }
    });
    test('should return only one name author', () => {
        expect(getDataAuthorCollection(getArticle(true))).toStrictEqual(
            'Juan Perez'
        );
    });
    test('shoudl return null if no credits', () => {
        expect(getDataAuthorCollection(getArticle(false))).toStrictEqual(null);
    });

    test('shoudl return null when the name author is a blank space', () => {
        expect(getDataAuthorCollection(getArticle(true, ' '))).toStrictEqual(
            null
        );
    });
});

describe('Test function getBadge', () => {
    test('should return an badge with style live because is in CajaExclusivoSuscriptor.', () => {
        const articleMock = {
            ...articles[0],
            content_restrictions: { content_code: 'cerrada' },
            owner: { sponsored: true },
            subtype: '6'
        };
        expect(
            getBadge({ article: articleMock, isExclusiveSub: true })
        ).toEqual({
            badgeStyle: 'live',
            badgeText: 'vivo'
        });
    });
    test('should return an badge with style exclusive-ln priority 1.', () => {
        const articleMock = {
            ...articles[0],
            content_restrictions: { content_code: 'cerrada' },
            owner: { sponsored: true },
            subtype: '6'
        };
        expect(
            getBadge({ article: articleMock, isExclusiveSub: false })
        ).toEqual({
            badgeStyle: 'exclusive-ln',
            badgeText: 'Exclusivo suscriptores'
        });
    });
    test('should return an badge with style live priority 2.', () => {
        const articleMock = {
            ...articles[0],
            owner: { sponsored: true },
            subtype: '6'
        };
        expect(
            getBadge({ article: articleMock, isExclusiveSub: false })
        ).toEqual({
            badgeStyle: 'live',
            badgeText: 'vivo'
        });
    });
    test('should return an badge with style contentlab priority 3.', () => {
        const articleMock = {
            ...articles[0],
            owner: { sponsored: true }
        };
        expect(
            getBadge({ article: articleMock, isExclusiveSub: false })
        ).toEqual({
            badgeStyle: 'contentlab',
            badgeText: 'CONTENT LAB'
        });
    });
});
