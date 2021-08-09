import React from 'react';
import { render, mount, shallow } from 'enzyme';
import ComTitle from '../../../../components/private/common/com-title';
import ModheaderSection from '../../../../components/private/common/mod-headerSection';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

import Consumer from 'fusion:consumer';

jest.mock('fusion:content', () => ({
    getContent: () => ({
        image: {
            width: '100',
            height: '100',
            url: 'https://lanacion.com.ar'
        }
    })
}));

describe('Private - Common - ModheaderSection => ', () => {
    it('Render OK', () => {
        const component = mount(
            <ModheaderSection
                title="Titulo Separador"
                link="https://lanacion.com.ar/"
                size="--l"
                classCondition="--pink"
                line
            />
        );
        expect(component).toBeDefined();
        expect(component.isEmptyRender()).toBeFalsy();
        expect(component.props().classCondition).toBe('--pink');
    });

    it('Render NOTOK', () => {
        const component = mount(<ModheaderSection />);
        expect(component.isEmptyRender()).toBeTruthy();
    });

    it('Render del link', () => {
        const component = mount(
            <ModheaderSection
                title="Titulo Separador"
                link="https://lanacion.com.ar/"
            />
        );
        expect(component.find('a')).toHaveLength(1);
        expect(component.find('a.com-link').html()).toContain(
            '<a href="https://lanacion.com.ar/" title="" class="com-link">Titulo Separador</a>'
        );
    });

    it('Snapshots ModheaderSection', () => {
        const component = render(
            <ModheaderSection title="Titulo Separador" size="--l" line />
        );
        expect(component).toMatchSnapshot();
    });

    it('Snapshot ModheaderSection con link', () => {
        const component = render(
            <ModheaderSection
                title="Titulo Separador"
                link="https://lanacion.com.ar"
                size="--l"
                line
            />
        );
        expect(component).toMatchSnapshot();
    });
});
