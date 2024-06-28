import React from 'react';
import { render, screen } from '@testing-library/react';
import ComTitle from '../../../../components/private/common/com-title';

describe('Private - Common - ComTitle => ', () => {
    it('Render OK', () => {
        render(<ComTitle tag="h1" content="Título Principal" />);
        const component = screen.getByRole('heading', { level: 1 });
        expect(component).toBeDefined();
        expect(component).not.toBeEmptyDOMElement();
        expect(component).toHaveClass(
            'com-title --font-primary --l --font-medium'
        );
        expect(component).toHaveTextContent('Título Principal');
    });

    it('Render NOTOK', () => {
        const { container } = render(<ComTitle />);
        expect(container).toBeEmptyDOMElement();
    });

    it('Render de la etiqueta según la propiedad "tag"', () => {
        render(
            <div>
                <ComTitle tag="h1" content="Título con la etiqueta H1" />
                <ComTitle tag="h2" content="Título con la etiqueta H2" />
                <ComTitle tag="h3" content="Título con la etiqueta H3" />
                <ComTitle tag="h4" content="Título con la etiqueta H4" />
            </div>
        );
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    });

    it.only('Render de la etiqueta h4 por defecto', () => {
        render(
            <div>
                <ComTitle content="Título sin tag definido" />
                <ComTitle tag="h5" content="Título con la etiqueta H5" />
                <ComTitle tag="h6" content="Título con la etiqueta H6" />
                <ComTitle tag="span" content="Título con la etiqueta SPAN" />
            </div>
        );
        expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(4);
    });

    it('Validacion del valor de la prop font por defecto, --font-primary', () => {
        render(
            <ComTitle
                tag="h2"
                size="xxl"
                link="/ultimas-noticias"
                content="Título de impacto H2 con ComLink"
                classCondition="--noticia"
            />
        );
        const component = screen.getByRole('heading', { level: 2 });
        expect(component).toHaveClass('--font-primary');
    });

    it.only('Validación de propiedades size y classCondition (opcionales)', () => {
        render(
            <div>
                <ComTitle tag="h1" size="xl" content="Título" />
                <ComTitle tag="h1" content="Título" classCondition="--mod" />
                <ComTitle
                    tag="h1"
                    size="--twoxl"
                    content="Título"
                    classCondition="--mod"
                />
            </div>
        );
        const withSize = screen.getAllByText('Título', { selector: 'h1' })[0];
        const withClass = screen.getAllByText('Título', { selector: 'h1' })[1];
        const fullTitle = screen.getAllByText('Título', { selector: 'h1' })[2];

        expect(withSize).toHaveClass(
            'com-title --font-primary xl --font-medium'
        );
        expect(withClass).toHaveClass(
            'com-title --font-primary --l --font-medium --mod'
        );
        expect(fullTitle).toHaveClass(
            'com-title --font-primary --twoxl --font-medium --mod'
        );
    });

    it('Cuando recibe como props link debe renderizar el componente ComLink', () => {
        render(
            <ComTitle
                tag="h2"
                size="xxl"
                link="/ultimas-noticias"
                content="Título de impacto H2 con ComLink"
                classCondition="--noticia"
            />
        );
        const link = screen.getByRole('link');
        const heading = screen.getByRole('heading', { level: 2 });

        expect(link).toBeInTheDocument();
        expect(heading).toBeInTheDocument();
    });

    it('Cuando recibe como props weight debe agregar la prop como clase extra', () => {
        const _weight = '--font-extra';
        render(
            <ComTitle
                tag="h2"
                size="xl"
                content="Título de impacto H2 con ComLink"
                classCondition="--noticia"
                weight={_weight}
            />
        );
        const component = screen.getByRole('heading', { level: 2 });
        expect(component).toHaveClass(_weight);
    });

    it('Cuando recibe como props font debe agregar la prop como clase extra', () => {
        const _font = '--arial';
        render(
            <ComTitle
                tag="h2"
                size="xl"
                font={_font}
                content="Título de impacto H2 con ComLink"
                classCondition="--noticia"
                weight="--font-extra"
            />
        );
        const component = screen.getByRole('heading', { level: 2 });
        expect(component).toHaveClass(_font);
    });

    it('Snapshots con tags h1, h2, h3, h4', () => {
        const { container } = render(
            <>
                <ComTitle tag="h1" content="Título de impacto H1" />
                <ComTitle tag="h2" content="Título de impacto H2" />
                <ComTitle tag="h3" content="Título de impacto H3" />
                <ComTitle tag="h4" content="Título de impacto H4" />
            </>
        );
        expect(container).toMatchSnapshot();
    });

    it('Snapshot h2 con link', () => {
        const { container } = render(
            <ComTitle
                tag="h2"
                link="/ultimas-noticias"
                content="Título de impacto H2 con ComLink"
            />
        );
        expect(container).toMatchSnapshot();
    });

    it('Snapshot h2 con content tags y link', () => {
        const { container } = render(
            <ComTitle
                tag="h2"
                link="/ultimas-noticias"
                content="Soy un <em>Título</em> de impacto H2 con ComLink"
            />
        );
        expect(container).toMatchSnapshot();
    });

    it('Snapshots tags no permitidos', () => {
        const { container } = render(
            <>
                <ComTitle tag="h5" content="Título de impacto H5" />
                <ComTitle tag="span" content="Título de impacto SPAN" />
            </>
        );
        expect(container).toMatchSnapshot();
    });

    it('Snapshot con classCondition, size y weight', () => {
        const { container } = render(
            <ComTitle
                tag="h2"
                size="--xl"
                classCondition="--modificador"
                content="Título de impacto H2"
                weight="--font-medium"
            />
        );
        expect(container).toMatchSnapshot();
    });
});
