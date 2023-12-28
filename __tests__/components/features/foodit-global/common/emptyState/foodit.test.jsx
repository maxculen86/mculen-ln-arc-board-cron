import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmptyState from '../../../../../../components/features/foodit-global/common/emptyState/foodit';

describe('EmptyState component', () => {
    it('should render title', () => {
        render(<EmptyState title="some title" />);
        const title = screen.getByText('some title');
        expect(title).toBeInTheDocument();
    });
    it('should render description', () => {
        render(<EmptyState description="some description" />);
        const description = screen.getByText('some description');
        expect(description).toBeInTheDocument();
    });
    it('should render image', () => {
        const src =
            'https://sandbox.lanacion.com.ar/resizer/v2/algo-bien-7MLRVAHIWNGBVIO4HLLU3GRVUQ.jpg?auth=df16a0c399ffbc23925cb0b8a210dc3e0851b79aafa339076a956a01025a710a&width=238&height=158&quality=70&smart=true';
        render(<EmptyState imageProps={{ src }} />);
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', src);
    });
    it('should render button', () => {
        render(<EmptyState buttonProps={{ children: 'some button' }} />);
        const button = screen.getByText('some button');
        expect(button).toBeInTheDocument();
    });
    it('should match snapshot', () => {
        const { container } = render(
            <EmptyState
                title="some title"
                description="some description"
                imageProps={{
                    src:
                        'https://sandbox.lanacion.com.ar/resizer/v2/algo-bien-7MLRVAHIWNGBVIO4HLLU3GRVUQ.jpg?auth=df16a0c399ffbc23925cb0b8a210dc3e0851b79aafa339076a956a01025a710a&width=238&height=158&quality=70&smart=true'
                }}
                buttonProps={{ children: 'some button' }}
            />
        );
        expect(container).toMatchSnapshot();
    });
});
