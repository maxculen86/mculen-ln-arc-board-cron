import React from 'react';
import { render, screen } from '@testing-library/react';
import CommonCardFoodit from '../../../../../../components/features/foodit-global/common/CommonCardFoodit/foodit';
import '@testing-library/jest-dom';

describe('CommonCardFoodit', () => {
    const article = {
        title: 'Receta de tortilla de patatas',
        author: 'Juan Pérez',
        time: 30,
        image: {
            alt_text: 'Tortilla de patatas',
            url:
                'https://www.recetasderecetas.com/wp-content/uploads/2020/01/tortilla-de-patatas-2.jpg'
        },
        tag: 'rica',
        href: 'https://recetas.lanacion.com.ar',
        variant: 'recipe',
        size: 'small'
    };

    it('should render the card with the correct data', () => {
        const { container } = render(<CommonCardFoodit article={article} />);
        expect(screen.getByText('rica')).toBeTruthy();
        expect(screen.getByAltText('Tortilla de patatas')).toBeTruthy();
        expect(screen.getByText('30 min')).toBeTruthy();
        expect(
            screen.getByRole('button', { name: 'Guardar receta' })
        ).toBeTruthy();
        expect(screen.getByRole('link')).toHaveAttribute('href', article.href);
        expect(container).toMatchSnapshot();
    });
});
