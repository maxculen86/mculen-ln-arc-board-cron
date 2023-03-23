import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { getDataOpinion } from '../../../../../components/features/LN-common/LN10_opinion/_helpers';
import articlesOpinion from '../../../../../__mocks__/data/LN10_Opinion/articlesOpinion.json';
import Context from 'fusion:context';
import Consumer from 'fusion:consumer';
import Opinion from '../../../../../components/features/LN-common/LN10_opinion/default';
import useAppContext from '../../../../../__mocks__/data/LN10_Opinion/useAppContext.json';
import { useContent } from 'fusion:content';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
const mockOpinion = articlesOpinion.content_elements;
const mockEditorial = articlesOpinion.content_elements.slice(0, 2);
jest.mock(
    '../../../../../components/features/LN-common/LN10_opinion/_helpers',
    () => ({
        ...jest.requireActual(
            '../../../../../components/features/LN-common/LN10_opinion/_helpers'
        ),
        getDataOpinion: jest.fn(() => {
            return {
                articlesOpinion: mockOpinion,
                articlesEditorial: mockEditorial
            };
        })
    })
);

const props = {
    customFields: {
        idCollectionOpinion: 'JAQCURJIX5CNFLC7JD2I4X553A',
        idCollectionEditorial: 'JAQCURJIX5CNFLC7JD2I4X553A',
        layout: 'opinion8'
    }
};

describe('Tests - helpers - feature - Opinion', () => {
    Context.useAppContext = jest.fn(() => ({ ...useAppContext }));
    it('should should return feature', () => {
        const { container } = render(<Opinion {...props} />);
        expect(container).toMatchSnapshot();
    });
    it('should show 8 articles opinion and 2 articles editorial', () => {
        const { container } = render(<Opinion {...props} />);
        expect(container.querySelectorAll('article.--author')).toHaveLength(8);
        expect(container.querySelectorAll('article.--regular')).toHaveLength(2);
    });
    it('should show 4 articles opinion and 2 articles editorial', () => {
        getDataOpinion.mockImplementation(() => {
            return {
                articlesOpinion: mockOpinion.slice(0, 4),
                articlesEditorial: mockEditorial
            };
        });

        const props4 = {
            customFields: {
                idCollectionOpinion: 'JAQCURJIX5CNFLC7JD2I4X553A',
                idCollectionEditorial: 'JAQCURJIX5CNFLC7JD2I4X553A',
                layout: 'opinion4'
            }
        };
        const { container } = render(<Opinion {...props4} />);
        expect(container.querySelectorAll('article.--author')).toHaveLength(4);
        expect(container.querySelectorAll('article.--regular')).toHaveLength(2);
    });
});
