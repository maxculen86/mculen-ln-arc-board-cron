import Consumer from 'fusion:consumer';
import Context from 'fusion:context';
import React from 'react';

import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import Ranking from '../../../../../components/private/LN/common/ranking';
import articles from '../../../../../__mocks__/data/articleCollections/recetas';

describe('Ranking', () => {
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
