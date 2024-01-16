import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createArticleList } from '../../../../../components/features/foodit/GrillaNotasAcu/helpers';
import articlesFoodit from '../../../../../__mocks__/data/fooditGridArticles/articlesFoodit.json';

describe('Component - Feature - createArticleList', () => {
    it('should renders CommonCardFoodit for each article', () => {
        const articles = articlesFoodit;
        render(<>{createArticleList({ articles })}</>);
        const articleElements = screen.getAllByRole('article');
        expect(articleElements).toHaveLength(24);
    });
});
