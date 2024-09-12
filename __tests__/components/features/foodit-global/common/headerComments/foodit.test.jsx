import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { HeaderComments } from '../../../../../../components/features/foodit-global/common/headerComments/foodit';

jest.mock('@ln/common-ui-text', () => ({
    Text: ({ as, children, className, id }) => (
        <div as={as} className={className} id={id} data-testid="text">
            {children}
        </div>
    )
}));

describe('Components - Features - Foodit-gloval - Common - HeaderComments', () => {
    it('should render the title and "Ver legales" link', () => {
        const { getByText } = render(<HeaderComments />);

        const title = getByText('Enviá tu comentario');
        expect(title).toBeInTheDocument();

        const verLegales = getByText('Ver legales');
        expect(verLegales).toBeInTheDocument();
    });

    it('should hide the legal text initially', () => {
        const { getByText } = render(<HeaderComments />);

        const legalText = getByText(
            'Los comentarios publicados son de exclusiva responsabilidad de sus autores y las consecuencias derivadas de ellos pueden ser pasibles de sanciones legales. Aquel usuario que incluya en sus mensajes algún comentario violatorio del reglamento será eliminado e inhabilitado para volver a comentar. Enviar comentario implica la aceptación del Reglamento.'
        );
        expect(legalText).toHaveClass('none');
    });

    it('should toggle the visibility of the legal text when "Ver legales" is clicked', () => {
        const { getByText } = render(<HeaderComments />);

        const verLegales = getByText('Ver legales');
        const legalText = getByText(
            'Los comentarios publicados son de exclusiva responsabilidad de sus autores y las consecuencias derivadas de ellos pueden ser pasibles de sanciones legales. Aquel usuario que incluya en sus mensajes algún comentario violatorio del reglamento será eliminado e inhabilitado para volver a comentar. Enviar comentario implica la aceptación del Reglamento.'
        );

        expect(legalText).toHaveClass('none');
        fireEvent.click(verLegales);
        expect(legalText).not.toHaveClass('none');
        fireEvent.click(verLegales);
        expect(legalText).toHaveClass('none');
    });
});
