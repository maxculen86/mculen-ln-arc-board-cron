import React from 'react';
import Context from 'fusion:context';
import CommonCollection from '../../../../../../../components/private/LN10/home/components/CommonCollection/default';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import diagramationRules from '../../../../../../../components/private/common/utils/diagramationRules';
import articles from '../../../../../../../__mocks__/data/CommonCollection/articles.json';
import { Cajahashtag } from '@ln/contenidos-ui-cajahashtag';

import {
    CHAIN_STYLE,
    LAYOUTS
} from '../../../../../../../components/chains/utils/common/_helpers-WebApi';
import {
    getTitleAndLeadForHome,
    getBadge
} from '../../../../../../../components/private/LN10/home/components/CommonCollection/_helper';

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../../../components/features/LN-10-global/customArticles/fooditBox/default',
    () => ({
        CustomArticleFooditBox: function MockCustomArticleFooditBox(props) {
            return (
                <div data-testid="custom-article-foodit-box" {...props}>
                    Foodit Box Component
                </div>
            );
        }
    })
);

jest.mock(
    '../../../../../../../components/features/LN-10-global/customArticles/segmentedBox/default',
    () => ({
        CustomArticleSegmentedBox: function MockCustomArticleSegmentedBox(
            props
        ) {
            return (
                <div data-testid="custom-article-segmented-box" {...props}>
                    Segmented Box Component
                </div>
            );
        }
    })
);

describe('Tests Component CommonCollection', () => {
    Context.useAppContext = jest.fn(() => ({
        deployment: arg => arg,
        contextPath: '/pf'
    }));
    const roofData = {
        title: 'CommonCOllection',
        titleLink: '',
        logoId: '',
        buttonText: '',
        linkButton: '',
        buttonLogo: '',
        buttonStyle: '',
        hideTitle: false,
        navigationId: '',
        isAdmin: true,
        chainId: 'njsaiodnJ'
    };

    const getProps = ({
        articles,
        rules,
        dataRoof,
        gridType,
        isSegmentedBox,
        isFoodit
    }) => ({
        roofData: dataRoof,
        rules,
        gridType,
        articles,
        isSegmentedBox,
        isFoodit
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
            'ln-card flex flex-column ai-start --m --regular'
        );
        articlesRendered.slice(1, 7).forEach(article => {
            expect(article).toHaveClass(
                'ln-card flex flex-column ai-start --m-l --regular'
            );
        });
        expect(container.querySelector('.ln-caja-hashtag')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it('should render correctly extra node component when isSegmented is true', () => {
        const dataRoof = {
            ...roofData,
            logo: { src: 'logo.png', alt: 'Logo' }
        };

        const props = {
            ...getProps({
                articles: articles.slice(0, 3),
                gridType: LAYOUTS.LOGO_3_GRID,
                rules: diagramationRules(LAYOUTS.LOGO_3_GRID),
                isSegmentedBox: true,
                dataRoof
            })
        };

        render(<CommonCollection {...props} ContainerCards={Cajahashtag} />);

        expect(
            screen.getByTestId('custom-article-segmented-box')
        ).toBeInTheDocument();
    });
    it('should render correctly extra node component when isFoodit is true', () => {
        const dataRoof = {
            ...roofData,
            logo: { src: 'logo.png', alt: 'Logo' }
        };

        const props = {
            ...getProps({
                articles: articles.slice(0, 3),
                gridType: LAYOUTS.LOGO_3_GRID,
                rules: diagramationRules(LAYOUTS.LOGO_3_GRID),
                isFoodit: true,
                dataRoof
            })
        };

        render(<CommonCollection {...props} ContainerCards={Cajahashtag} />);

        expect(
            screen.getByTestId('custom-article-foodit-box')
        ).toBeInTheDocument();
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
            badgeStyle: 'subscriber',
            badgeText: 'Suscriptores'
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
