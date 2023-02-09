import React from 'react';
import CommonCollection from '../../../../../../../components/private/LN10/home/components/CommonCollection/default';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import diagramationRules from '../../../../../../../components/private/common/utils/diagramationRules';
import articles from '../../../../../../../__mocks__/data/CommonCollection/articles.json';
import { Cajahashtag } from '@ln/contenidos-ui-cajahashtag';
import { CHAIN_STYLE } from '../../../../../../../components/chains/utils/_helpers';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Tests Component CommonCollection', () => {
    test('should return 8 articles', () => {
        const roofData = {
            title: 'CommonCOllection',
            titleLink: '',
            logoId: '',
            buttonText: '',
            linkButton: '',
            buttonStyle: '',
            hideRoof: false,
            navigationId: '',
            isAdmin: true
        };

        const getProps = (articles, rules) => ({
            roofData,
            rules,
            gridType: '',
            articles
        });
        const { container } = render(
            <CommonCollection
                {...getProps(articles, diagramationRules('bnGrilla8'))}
            />
        );

        expect(screen.getAllByRole('article')).toHaveLength(8);
        expect(container).toMatchSnapshot();
    });
    test('should return hashTag with 7 articles', () => {
        const { HASHTAG } = CHAIN_STYLE;
        const roofData = {
            title: 'CommonCOllection',
            titleLink: '',
            logoId: '',
            buttonText: 'Hola mundo',
            linkButton: 'https://lanacion.com.ar',
            buttonStyle: '',
            hideRoof: false,
            navigationId: '',
            chainStyle: HASHTAG,
            isAdmin: true
        };

        const getProps = (articles, rules) => ({
            roofData,
            rules,
            gridType: 'hash-1-2-2-2_grid',
            articles
        });
        const props = {
            ...getProps(
                articles.slice(0, 7),
                diagramationRules('hash-1-2-2-2_grid')
            )
        };
        const { container } = render(
            <CommonCollection {...props} ContainerCards={Cajahashtag} />
        );
        const articlesRendered = screen.getAllByRole('article');
        expect(articlesRendered).toHaveLength(7);
        expect(articlesRendered[0]).toHaveClass(
            '--mobile-img-top --tablet-img-top --desktop-img-top'
        );
        articlesRendered.slice(1, 7).forEach(article => {
            expect(article).toHaveClass(
                '--mobile-img-right --tablet-img-top --desktop-img-top'
            );
        });
        expect(container.querySelector('.ln-caja-hashtag')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
