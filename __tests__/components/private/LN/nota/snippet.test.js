import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Snippet from '../../../../../components/private/LN/nota/snippet';
import recipeNoteWithCompleteAttrs from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import recipeNoteWithMissingAttrs from '../../../../../__mocks__/data/articles/recipeNoteWithMissingAttrs';
import renderer from 'react-test-renderer';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('snippet', () => {
    it('renders ok with complete data', () => {
        render(
            <Snippet globalContent={recipeNoteWithCompleteAttrs} />,
            container
        );
        expect(container).toMatchSnapshot();
    });

    it('renders ok with missing data', () => {
        const snippet = renderer
            .create(<Snippet globalContent={recipeNoteWithMissingAttrs} />)
            .toJSON();
        expect(snippet).toMatchSnapshot();
    });
});
