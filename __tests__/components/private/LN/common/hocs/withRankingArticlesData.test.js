import Consumer from 'fusion:consumer';
import React from 'react';
import { shallow } from 'enzyme';
import withRankingArticlesData from '../../../../../../components/private/LN/common/hocs/WithRankingArticlesData';

describe('withRankingArticlesData', () => {
    let Articles;

    it('Passes along correct props', () => {
        const sectionId = '/recetas';

        Articles = ({ size }) => <div size={size}></div>;

        const Component = withRankingArticlesData(Articles);

        const wrapper = shallow(<Component size="big" sectionId="recetas" />);

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.props().size).toEqual('big');
        expect(wrapper.props().articles).toBeDefined();
        expect(wrapper.props().obtenerMasNotas).toBeDefined();
    });
});
