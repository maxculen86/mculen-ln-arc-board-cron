jest.mock(
    '../../../../../../components/private/LN/common/lists/ordered.jsx',
    () => 'list-mock'
);
jest.mock(
    '../../../../../../components/private/common/mod-article',
    () => 'mod-article-mock'
);
jest.mock(
    '../../../../../../components/private/common/com-title.jsx',
    () => 'title-mock'
);

jest.mock(
    '../../../../../../components/private/LN/common/hocs/WithRankingData',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

import Consumer from 'fusion:consumer';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        };

        return props.children(mockAvailableProps);
    }
}));

import Context from 'fusion:context';

import React from 'react';
import { mount } from 'enzyme';
import Ranking from '../../../../../../components/private/LN/common/ranking';

import nota from '../../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import articles from '../../../../../../__mocks__/data/articleCollections/recetas';

describe('Private - LN - Common - Ranking', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: { subtype: '1' }
    }));

    const props = {
        articles: articles,
        dataSection: '/recetas',
        title: 'Más Leídas de Recetas'
    };
    it('Render OK', () => {
        const component = mount(<Ranking {...props} />);
        expect(component).toBeDefined();
    });

    it('Render NOTOK', () => {
        const component = mount(<Ranking {...props} articles={null} />);
        expect(component.html()).toBe('');
    });

    it('Validar props enviadas', () => {
        const component = mount(<Ranking {...props} />);
        expect(component.props()).toEqual(props);
    });

    it('Si no envio props retornar ""', () => {
        const component = mount(<Ranking />);
        expect(component.html()).toBe('');
    });

    it('Atributos y nodo del DOM correcto', () => {
        const component = mount(<Ranking {...props} />);
        expect(component.find('list-mock')).toHaveLength(1);
        expect(component.find('mod-article-mock')).toHaveLength(9);
        expect(component.find('title-mock')).toHaveLength(1);
        expect(component.find('title-mock').props().content).toBe(
            'Más Leídas de Recetas'
        );
    });
});
