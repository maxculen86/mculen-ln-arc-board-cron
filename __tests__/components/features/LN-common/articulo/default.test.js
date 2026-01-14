import React from 'react';
import { render } from '@testing-library/react';
import ArticleFeature from '../../../../../components/features/LN-common/articulo/default';

jest.mock(
    '../../../../../components/features/LN-common/articulo/default',
    () => 'mock-component'
);

describe('Feature - LN-Common - articulo - <ArticleFeature />', () => {
    it('Should render the component with the props', () => {
        const noteId = 'TXQ62BPYN5AEFKLPRNM66WS63I';
        const imageId = 'UUEO45CS2ZEHFEOMB5H3EY5J5Q';
        const lead = 'Esta es una volanta';
        const title = 'Este es un titulo';
        const description = 'Esta es una bajada';
        const authors = 'Estos son los autores';

        const customFields = {
            noteId,
            imageId,
            lead,
            title,
            description,
            authors
        };
        const { container } = render(
            <ArticleFeature customFields={customFields} />
        );
        const mock = container.querySelector('mock-component');
        expect(mock).toBeInTheDocument();
    });
});
