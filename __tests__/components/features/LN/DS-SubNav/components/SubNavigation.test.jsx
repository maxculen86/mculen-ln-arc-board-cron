import React from 'react';
import { render, screen } from '@testing-library/react';
import SubNavigation from '../../../../../../components/features/LN/DS-SubNav/components/SubNavigation';

jest.mock(
    '../../../../../../components/features/LN/DS-SubNav/components/SubNavScrollArea',
    () =>
        function MockScrollArea({ brand }) {
            return <div data-testid="scroll-area" data-brand={brand} />;
        }
);

jest.mock(
    '../../../../../../components/features/LN/DS-SubNav/components/SubNavCollapsible',
    () =>
        function MockCollapsible({ brand }) {
            return <div data-testid="collapsible" data-brand={brand} />;
        }
);

describe('Components - features - LN - DS-SubNav - SubNavigation', () => {
    const navigation = [{ key: '/cat', textname: 'Cat' }];

    describe('when there is nothing to render', () => {
        it('should render null when navigation is empty', () => {
            const { container } = render(
                <SubNavigation navigation={[]} navigationType="scroll" />
            );
            expect(container).toBeEmptyDOMElement();
        });

        it('should render null when navigationType is none', () => {
            const { container } = render(
                <SubNavigation navigation={navigation} navigationType="none" />
            );
            expect(container).toBeEmptyDOMElement();
        });
    });

    describe('when navigationType is collapsible', () => {
        it('should render the collapsible navigation', () => {
            render(
                <SubNavigation
                    navigation={navigation}
                    navigationType="collapsible"
                />
            );
            expect(screen.getByTestId('collapsible')).toBeInTheDocument();
        });

        it('should forward the brand to the collapsible navigation', () => {
            render(
                <SubNavigation
                    navigation={navigation}
                    navigationType="collapsible"
                    brand="economia"
                />
            );
            expect(screen.getByTestId('collapsible')).toHaveAttribute(
                'data-brand',
                'economia'
            );
        });
    });

    describe('when navigationType is scroll (default)', () => {
        it('should render the scroll navigation by default', () => {
            render(<SubNavigation navigation={navigation} />);
            expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
        });

        it('should forward the brand to the scroll navigation', () => {
            render(
                <SubNavigation
                    navigation={navigation}
                    navigationType="scroll"
                    brand="propiedades"
                />
            );
            expect(screen.getByTestId('scroll-area')).toHaveAttribute(
                'data-brand',
                'propiedades'
            );
        });
    });
});
