import React from 'react';
import { render, screen } from '@testing-library/react';
import Themes from '../../../../components/features/LN-nota/Themes';

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

const mockTags = [
    {
        description: 'Liga Profesional',
        slug: 'liga-profesional',
        text: 'Liga Profesional'
    },
    {
        description: 'aceite de sésamo',
        slug: 'aceite-de-sesamo-tid48684',
        text: 'aceite de sésamo'
    },
    {
        description: 'Debate por la inmigración',
        slug: 'debate-por-la-inmigracion-tid63754',
        text: 'Debate por la inmigración'
    },
    {
        description: 'queso azul',
        slug: 'queso-azul-tid48581',
        text: 'queso azul'
    },
    {
        description: 'queso cheddar',
        slug: 'queso-cheddar-tid47312',
        text: 'queso cheddar'
    },
    { description: 'wasabi', slug: 'wasabi-tid48834', text: 'wasabi' }
];

const mockSection = [
    {
        _id: '/sociedad',
        _website: 'la-nacion-ar',
        additional_properties: { original: {} },
        name: 'Sociedad',
        parent_id: '/',
        path: '/sociedad',
        type: 'section'
    }
];

const mockProps = {
    globalContent: {
        taxonomy: {
            tags: [...mockTags],
            sections: [...mockSection]
        }
    }
};

describe('Components - Features - LN-Nota Temas', () => {
    it('renders correctly with provided tags and sections', () => {
        render(<Themes {...mockProps} />);

        expect(screen.getByText('Temas')).toBeInTheDocument();
        mockTags.slice(0, 4).forEach(tag => {
            expect(screen.queryByText(tag.description)).toBeInTheDocument();
        });
    });

    it('renders without crashing when props is empty object', () => {
        const mockProps = { globalContent: { taxonomy: {} } };
        render(<Themes {...mockProps} />);

        expect(screen.queryByText('Temas')).toBeNull();
        mockTags.slice(0, 4).forEach(tag => {
            expect(screen.queryByText(tag.description)).toBeNull();
        });
    });
});
