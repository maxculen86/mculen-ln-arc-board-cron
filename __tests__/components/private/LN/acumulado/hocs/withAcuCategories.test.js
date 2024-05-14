import React from 'react';
import { render } from '@testing-library/react';
import withAcuCategories from '../../../../../../components/private/LN/acumulado/hocs/withAcuCategories';

jest.mock('fusion:content', () => ({
    useContent: () => ({
        _id: '/',
        _website: 'la-nacion-ar',
        name: 'LA NACION',
        node_type: 'section',
        children: [
            {
                _id: '/economia/dolar',
                _website: 'la-nacion-ar',
                name: 'Dólar Hoy',
                node_type: 'section'
            },
            {
                _id: '/economia/comercio-exterior',
                _website: 'la-nacion-ar',
                name: 'Comercio Exterior',
                node_type: 'section'
            },
            {
                _id: '/economia/campo',
                _website: 'la-nacion-ar',
                name: 'Campo',
                node_type: 'section'
            },
            {
                _id: '/economia/industria',
                _website: 'la-nacion-ar',
                name: 'Industria',
                node_type: 'section'
            },
            {
                _id: '/economia/empleos',
                _website: 'la-nacion-ar',
                name: 'Empleos',
                node_type: 'section'
            }
        ]
    })
}));

const Component = ({ isPrimarySection, navigation }) => (
    <div>
        <p>isPrimarySection: {String(isPrimarySection)}</p>
        <p>navigation: {JSON.stringify(navigation)}</p>
    </div>
);

describe('components - private - LN - acumulado - hocs - withAcuCategories', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should pass props correctly when hideCategories is "false"', () => {
        const props = {
            globalContent: {
                _id: '/news',
                children: ['category1', 'category2']
            },
            hideCategories: 'false',
            hierarchyManual: 'news'
        };

        const WrappedComponent = withAcuCategories(
            Component,
            {},
            'la-nacion-ar'
        )(props);

        const { getByText } = render(<WrappedComponent {...props} />);

        expect(getByText('isPrimarySection: true')).toBeInTheDocument();
    });

    it('should not pass navigation prop when hideCategories is not "false"', () => {
        const props = {
            globalContent: {
                _id: '/news/politics',
                children: ['category1', 'category2']
            },
            hideCategories: 'true',
            hierarchyManual: 'news'
        };

        const WrappedComponent = withAcuCategories(
            Component,
            {},
            'la-nacion-ar'
        )(props);

        const { queryByText } = render(<WrappedComponent {...props} />);

        expect(queryByText('isPrimarySection: true')).not.toBeInTheDocument();
        expect(queryByText('navigation:')).not.toBeInTheDocument();
    });
});
