import React from 'react';
import { render, screen } from '@testing-library/react';
import { useContent } from 'fusion:content';
import Context from 'fusion:context';

import ArticlesAcum from '../../../../../components/private/LN/acumulado/articlesAcum';
import '@testing-library/jest-dom';
import articles from '../../../../../__mocks__/data/articlesAcum/articles.json';

jest.mock(
    'fusion:environment',
    () => ({
        __esModule: true,
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
        SITE_FOODIT: 'https://www.lanacion.com.ar',
        SITE_LANACION: undefined
    }),
    { virtual: true }
);

jest.mock(
    'fusion:content',
    () => ({
        __esModule: true,
        useContent: jest.fn()
    }),
    { virtual: true }
);

jest.mock(
    'fusion:properties',
    () => () => ({
        getProperties: () => []
    }),
    { virtual: true }
);

jest.mock('fusion:prop-types', () => require('prop-types'), { virtual: true });

jest.mock(
    'fusion:static',
    () => {
        const React = require('react');

        return function Static({ children, ...props }) {
            return React.createElement('static', props, children);
        };
    },
    { virtual: true }
);

jest.mock(
    '../../../../../components/private/common/utils/dateAndTimeUtil',
    () => {
        const actual = jest.requireActual(
            '../../../../../components/private/common/utils/dateAndTimeUtil'
        );
        const dateFormatter = new Intl.DateTimeFormat('es-AR', {
            day: 'numeric',
            month: 'long',
            timeZone: 'America/Argentina/Buenos_Aires',
            year: 'numeric'
        });
        const timeFormatter = new Intl.DateTimeFormat('es-AR', {
            hour: '2-digit',
            hour12: false,
            minute: '2-digit',
            timeZone: 'America/Argentina/Buenos_Aires'
        });

        return {
            __esModule: true,
            ...actual,
            default: jest.fn(displayDate => {
                const date = new Date(displayDate);
                return {
                    date: dateFormatter.format(date),
                    time: timeFormatter.format(date)
                };
            })
        };
    }
);

jest.mock(
    'fusion:context',
    () => {
        const context = function (Component) {
            return props => (Component ? <Component {...props} /> : null);
        };
        context.useAppContext = jest.fn(() => ({}));

        return {
            __esModule: true,
            default: context,
            get useAppContext() {
                return context.useAppContext;
            }
        };
    },
    { virtual: true }
);

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
