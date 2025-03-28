import React from 'react';
import { render, screen } from '@testing-library/react';
import Themes from '../../../../../../components/features/LN-nota/footer/_children/themes';

jest.mock(
    '../../../../../../components/private/common/mod-headerSection',
    () => {
        return jest.fn(({ title }) => <h3>{title}</h3>);
    }
);

describe('components - feature - LN-nota - footer - _children - themes', () => {
    it('renders correctly with provided tags and sections', () => {
        const globalContent = {
            taxonomy: {
                tags: [
                    {
                        description: 'Sergio Massa',
                        slug: 'sergio-massa',
                        text: 'Sergio Massa'
                    },
                    {
                        description: 'Ganancias',
                        slug: 'ganancias',
                        text: 'Ganancias'
                    }
                ],
                sections: [
                    {
                        _id: '/politica',
                        _website: 'la-nacion-ar',
                        name: 'Política',
                        path: '/politica',
                        type: 'section'
                    }
                ]
            },
            subtype: '1'
        };

        render(<Themes globalContent={globalContent} />);

        expect(screen.getByText('Sergio Massa')).toBeInTheDocument();
        expect(screen.getByText('Ganancias')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Sergio Massa' })
        ).toHaveAttribute('href', 'sergio-massa');
        expect(screen.getByRole('link', { name: 'Ganancias' })).toHaveAttribute(
            'href',
            'ganancias'
        );
    });

    it('does not render if there are no tags or sections', () => {
        const globalContent = { taxonomy: {} };
        const { container } = render(<Themes globalContent={globalContent} />);
        expect(container.firstChild).toBeNull();
    });

    it('does not render when isReceta', () => {
        const globalContent = {
            taxonomy: {
                tags: [
                    {
                        description: 'aceite de girasol',
                        slug: 'aceite-de-girasol-tid48354',
                        text: 'aceite de girasol'
                    }
                ],
                sections: [
                    [
                        {
                            _id: '/recetas/carnes',
                            _website: 'la-nacion-ar',
                            name: 'Carnes',
                            parent_id: '/recetas',
                            path: '/recetas/carnes',
                            type: 'section'
                        }
                    ]
                ]
            },
            subtype: '7'
        };
        const { container } = render(<Themes globalContent={globalContent} />);
        expect(container.firstChild).toBeNull();
    });
});
