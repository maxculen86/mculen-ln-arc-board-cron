import React from 'react';
import { render, mount, shallow } from 'enzyme';

import ComTitle from '../../../../components/private/common/com-title';
import ModheaderSection from '../../../../components/private/common/mod-headerSection';

describe('Private - Common - ModheaderSection => ', () => {
    it('Render OK', () => {
        const component = shallow(
            <ModheaderSection title='Titulo Separador' link='https://lanacion.com.ar' size="--l" line />
        );
        expect(component).toBeDefined();
        expect(component.isEmptyRender()).toBeFalsy();
        expect(component.props().className).toBe('mod-headersection ');

    });

    it('Render NOTOK', () => {
        const component = shallow(<ModheaderSection />);
        expect(component.isEmptyRender()).toBeTruthy();
    });

    it('Render del link', () => {
        const component = mount(
                <ModheaderSection title='Titulo Separador' link='https://lanacion.com.ar' />   
        );
        expect(component.find('a')).toHaveLength(1);
        expect(component.find('a.com-link').html()).toContain('<a href=\"https://lanacion.com.ar\" class=\"com-link\">Titulo Separador</a>');
    });

    it('Validación de propiedades size y classCondition (opcionales)', () => {
        const withClass = shallow(
            <ModheaderSection tag="h1" title="Título" classCondition="--mod" />
        );
        const fullTitle = shallow(
            <ModheaderSection
                size="--xxl"
                title="Título"
                classCondition="--bbc"
            />
        );
        expect(withClass.props().className).toBe('mod-headersection --mod');
        expect(fullTitle.props().className).toBe('mod-headersection --bbc');
    });

    it('Snapshots ModheaderSection', () => {
        const component = render(<ModheaderSection title='Titulo Separador' size="--l" line />);
        expect(component).toMatchSnapshot();
    });

    it('Snapshot ModheaderSection con link', () => {
        const component = render(
            <ModheaderSection title='Titulo Separador' link='https://lanacion.com.ar' size="--l" line />
        );
        expect(component).toMatchSnapshot();
    });

});
