import React from 'react';
import { render, screen } from '@testing-library/react';
import { useContent } from 'fusion:content';
import Context from 'fusion:context';

import ArticlesAcum from '../../../../../components/private/LN/acumulado/articlesAcum';
import '@testing-library/jest-dom';
import articles from '../../../../../__mocks__/data/articlesAcum/articles.json';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

const globalContent = {
    _id: '/autor'
};

describe('Components - Private - LN - Acumulado - ArticlesAcum', () => {
    useContent.mockImplementation(() => {});
    Context.useAppContext = jest.fn(() => ({
        globalContent
    }));
    it('Should return articles with all articles with loading lazy and fetch priority low because is author', () => {
        const props = {
            articles,
            typeArticle: 'Grilla',
            classCondition: '',
            outputType: 'default',
            nodeType: 'author',
            articlesInCollection: [],
            hasCollectionApertura: null,
            hasChainBeforeGrid: false,
            isWiki: false
        };
        const { container } = render(<ArticlesAcum {...props} />);
        expect(container).toMatchSnapshot();
    });
    it('Should return articles with all articles with loading lazy and fetch priority low because hasCollectionApertura', () => {
        const props = {
            articles,
            typeArticle: 'Grilla',
            classCondition: '',
            outputType: 'default',
            nodeType: 'section',
            articlesInCollection: [],
            hasCollectionApertura: true,
            hasChainBeforeGrid: false,
            isWiki: false
        };
        const { container } = render(<ArticlesAcum {...props} />);
        expect(container).toMatchSnapshot();
    });
    it('Should return articles with all articles with loading lazy and fetch priority low because hasChainBeforeGrid', () => {
        const props = {
            articles,
            typeArticle: 'Grilla',
            classCondition: '',
            outputType: 'default',
            nodeType: 'section',
            articlesInCollection: [],
            hasCollectionApertura: false,
            hasChainBeforeGrid: true,
            isWiki: false
        };
        const { container } = render(<ArticlesAcum {...props} />);
        expect(container).toMatchSnapshot();
    });
    it('Should return articles with all articles with loading lazy and fetch priority low because is tags with wiki', () => {
        const props = {
            articles,
            typeArticle: 'Grilla',
            classCondition: '',
            outputType: 'default',
            nodeType: 'tags',
            articlesInCollection: [],
            hasCollectionApertura: null,
            hasChainBeforeGrid: false,
            isWiki: true
        };
        const { container } = render(<ArticlesAcum {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('Should return articles with all articles with loading lazy and fetch priority low because hasCollectionApertura and not have hasChainBeforeGrid', () => {
        const props = {
            articles,
            typeArticle: 'Grilla',
            classCondition: '',
            outputType: 'default',
            nodeType: 'tags',
            articlesInCollection: [],
            hasCollectionApertura: true,
            hasChainBeforeGrid: false,
            isWiki: false
        };
        const { container } = render(<ArticlesAcum {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('Should return the first article with loading eager and fetch priority high because not hasCollectionApertura and not have hasChainBeforeGrid', () => {
        const props = {
            articles,
            typeArticle: 'Grilla',
            classCondition: '',
            outputType: 'default',
            nodeType: 'tags',
            articlesInCollection: [],
            hasCollectionApertura: null,
            hasChainBeforeGrid: false,
            isWiki: false
        };
        render(<ArticlesAcum {...props} />);
        const imgs = screen.getAllByRole('img');
        expect(imgs[0].getAttribute('fetchpriority')).toEqual('high');
        expect(imgs[0].getAttribute('loading')).toEqual('eager');
        expect(imgs[1].getAttribute('fetchpriority')).toEqual('low');
        expect(imgs[1].getAttribute('loading')).toEqual('lazy');
    });
});
