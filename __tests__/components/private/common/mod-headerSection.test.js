import React from 'react';
import { render, mount, shallow } from 'enzyme';
import ModheaderSection from '../../../../components/private/common/mod-headerSection';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

const imageMock = {
    width: '100',
    height: '100',
    url: 'https://lanacion.com.ar/mock.jpeg'
};

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
    it('Render OK without classCondition', () => {
        const component = mount(
            <ModheaderSection
                title="Titulo Separador"
                link="https://lanacion.com.ar/"
                size="--l"
                line
            />
        );
        expect(component).toBeDefined();
        expect(component.html()).toContain(
            '<section class="mod-headersection  --line" role="contentinfo">'
        );
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
            '<a href="https://lanacion.com.ar/" title="Titulo Separador" class="com-link">Titulo Separador</a>'
        );
    });

    it('Snapshots ModheaderSection', () => {
        const component = render(
            <ModheaderSection title="Titulo Separador" size="--l" line />
        );
        expect(component).toMatchSnapshot();
    });
    it('ModheaderSection with image should render mod-logo', () => {
        const component = render(
            <ModheaderSection
                title="Titulo Separador"
                image={imageMock}
                size="--l"
                line
            />
        );
        expect(component.find('div.mod-logo')).toHaveLength(1);
        expect(component.find('a.com-link')).toHaveLength(0);
        expect(component.find('div.mod-logo').html()).toContain(
            '<img src="https://lanacion.com.ar/mock.jpeg" alt="Titulo Separador" width="100" height="100" class="com-image " loading="lazy" importance="low">'
        );
        expect(component).toMatchSnapshot();
    });
    it('ModheaderSection with image and link should render mod-logo with anchor tag', () => {
        const component = render(
            <ModheaderSection
                link="https://lanacion.com.ar/"
                title="Titulo Separador"
                image={imageMock}
                size="--l"
                line
            />
        );
        expect(component.find('div.mod-logo')).toHaveLength(1);
        expect(component.find('a.com-link')).toHaveLength(1);
        expect(component.find('a.com-link').html()).toContain(
            '<img src="https://lanacion.com.ar/mock.jpeg" alt="Titulo Separador" width="100" height="100" class="com-image " loading="lazy" importance="low">'
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
