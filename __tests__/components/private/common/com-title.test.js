import React from 'react';
import { render, mount, shallow } from 'enzyme';

import ComTitle from '../../../../components/private/common/com-title';

describe('Private - Common - ComTitle => ', () => {
    it('Render OK', () => {
        const component = shallow(
            <ComTitle tag="h1" content="Título Principal" />
        );
        expect(component).toBeDefined();
        expect(component.isEmptyRender()).toBeFalsy();
        expect(component.props().className).toBe('com-title');
        expect(component.html()).toContain('Título Principal');
    });

    it('Render NOTOK', () => {
        const component = shallow(<ComTitle />);
        expect(component.isEmptyRender()).toBeTruthy();
    });

    it('Render de la etiqueta según la propiedad "tag"', () => {
        const component = mount(
            <div>
                <ComTitle tag="h1" content="Título con la etiqueta H1" />
                <ComTitle tag="h2" content="Título con la etiqueta H2" />
                <ComTitle tag="h3" content="Título con la etiqueta H3" />
                <ComTitle tag="h4" content="Título con la etiqueta H4" />
            </div>
        );
        expect(component.find('h1')).toHaveLength(1);
        expect(component.find('h2')).toHaveLength(1);
        expect(component.find('h3')).toHaveLength(1);
        expect(component.find('h4')).toHaveLength(1);
    });

    it('Render de la etiqueta h4 por defecto', () => {
        const component = mount(
            <div>
                <ComTitle content="Título sin tag definido" />
                <ComTitle tag="h5" content="Título con la etiqueta H5" />
                <ComTitle tag="h6" content="Título con la etiqueta H6" />
                <ComTitle tag="span" content="Título con la etiqueta SPAN" />
            </div>
        );
        expect(component.find('h4')).toHaveLength(4);
    });

    it('Validación de propiedades size y classCondition (opcionales)', () => {
        const withSize = shallow(
            <ComTitle tag="h1" size="xl" content="Título" />
        );
        const withClass = shallow(
            <ComTitle tag="h1" content="Título" classCondition="--mod" />
        );
        const fullTitle = shallow(
            <ComTitle
                tag="h1"
                size="xxl"
                content="Título"
                classCondition="--mod"
            />
        );
        expect(withSize.props().className).toBe('com-title xl');
        expect(withClass.props().className).toBe('com-title --mod');
        expect(fullTitle.props().className).toBe('com-title xxl --mod');
    });

    it('Cuando recibe como props link debe renderizar el componente ComLink', () => {
        const component = shallow(
            <ComTitle
                tag="h2"
                size="xxl"
                link="/ultimas-noticias"
                content="Título de impacto H2 con ComLink"
                classCondition="--noticia"
            />
        );
        expect(component.find('a')).toBeTruthy();
        expect(component.find('h2')).toBeTruthy();
    });

    it('Snapshots con tags h1, h2, h3, h4', () => {
        const component = render(
            <>
                <ComTitle tag="h1" content="Título de impacto H1" />
                <ComTitle tag="h2" content="Título de impacto H2" />
                <ComTitle tag="h3" content="Título de impacto H3" />
                <ComTitle tag="h4" content="Título de impacto H4" />
            </>
        );
        expect(component).toMatchSnapshot();
    });

    it('Snapshot h2 con link', () => {
        const component = render(
            <ComTitle
                tag="h2"
                link="/ultimas-noticias"
                content="Título de impacto H2 con ComLink"
            />
        );
        expect(component).toMatchSnapshot();
    });

    it('Snapshot h2 con content tags  y link', () => {
        const component = render(
            <ComTitle
                tag="h2"
                link="/ultimas-noticias"
                content="Soy un <em>Título</em> de impacto H2 con ComLink"
            />
        );
        expect(component).toMatchSnapshot();
    });

    it('Snapshots tags no permitidos', () => {
        const component = render(
            <>
                <ComTitle tag="h5" content="Título de impacto H5" />
                <ComTitle tag="span" content="Título de impacto SPAN" />
            </>
        );
        expect(component).toMatchSnapshot();
    });

    it('Snapshot con classCondition y size ', () => {
        const component = render(
            <ComTitle
                tag="h2"
                size="--s"
                classCondition="--modificador"
                content="Título de impacto H2"
            />
        );
        expect(component).toMatchSnapshot();
    });
});
