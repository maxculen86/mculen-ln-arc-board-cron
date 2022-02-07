import React from 'react';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import { render, mount } from 'enzyme';
import Editoriales from '../../../../components/private/common/editoriales';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Editoriales test', () => {
    const editorialesProps = {
        articles: [],
        layout: 'editoriales2',
        title: 'Editoriales',
        link: '',
        arcSite: 'la-nacion-ar'
    };
    const component = mount(<Editoriales {...editorialesProps} />);

    it('Matches snapshot', () => {
        expect(component).toMatchSnapshot;
    });

    it('Renders title', () => {
        expect(component.find('h4')).toHaveLength(1);
    });

    it('Renders empty articles', () => {
        expect(component.find('article')).toHaveLength(0);
    });

    it('renders with Articles', () => {
        const _editorialesProps = {
            articles: ['1', '2', '3'],
            layout: 'editoriales2',
            title: 'Editoriales',
            link: '',
            arcSite: 'la-nacion-ar'
        };
        const component = mount(<Editoriales {..._editorialesProps} />);
        expect(component.find('article')).toHaveLength(3);
    });
});
