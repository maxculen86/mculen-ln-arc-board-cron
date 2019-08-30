import React from 'react';
import { render } from 'enzyme';
jest.mock(
    '../../../../../components/private/LN/common/media/videoPlayer.jsx',
    () => 'mock-video'
);

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

jest.mock(
    '../../../../../components/private/LN/common/hocs/WithRankingArticlesData',
    () => WrappedComp => props => {
        const nota = require('../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ');
        return <WrappedComp articles={[nota, nota]} />;
    }
);

import siteProps from '../../../../../__mocks__/data/properties/lnSiteProps';
import Ranking from '../../../../../components/private/LN/common/ranking';

describe('Ranking', () => {
    it('matches snapshot', () => {
        const component = render(
            <Ranking globalContent={nota} siteProperties={siteProps} />
        );
        expect(component).toMatchSnapshot();
    });
});
