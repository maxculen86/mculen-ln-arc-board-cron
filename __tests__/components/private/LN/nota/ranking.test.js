import Consumer from 'fusion:consumer';
import React from 'react';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};

        return props.children(mockAvailableProps);
    }
}));

import Context from 'fusion:context';

import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import Ranking from '../../../../../components/private/LN/common/ranking';
import articles from '../../../../../__mocks__/data/articleCollections/recetas';

describe('Ranking', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: { subtype: '1' }
    }));

    it('matches snapshot', () => {
        const component = render(
            <Ranking
                articles={articles}
                sectionId="recetas"
                size={3}
                globalContent={nota}
            />
        );

        expect(component).toMatchSnapshot();
    });
});
