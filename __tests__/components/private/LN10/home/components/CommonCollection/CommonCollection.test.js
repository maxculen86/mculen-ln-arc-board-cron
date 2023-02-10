import React from 'react';
import CommonCollection from '../../../../../../../components/private/LN10/home/components/CommonCollection/default';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import diagramationRules from '../../../../../../../components/private/common/utils/diagramationRules';
import articles from '../../../../../../../__mocks__/data/CommonCollection/articles.json';

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
        isAdmin: true
    };

    const getProps = (articles, rules) => ({
        roofData,
        rules,
        gridType: '',
        articles
    });

    test('should return 8 articles', () => {
        const { container } = render(
            <CommonCollection
                {...getProps(articles, diagramationRules('bnGrilla8'))}
            />
        );
        screen.debug();

        expect(screen.getAllByRole('article')).toHaveLength(8);
        expect(container).toMatchSnapshot();
    });
});
