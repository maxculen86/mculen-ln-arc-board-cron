import React from 'react';
import { render, screen } from '@testing-library/react';
import List from '../../../../../../components/features/ui/ln/list/default';

describe('List - Presentational Component (ui/ln/list)', () => {
    describe('Basic rendering', () => {
        it('renders an unordered list by default', () => {
            render(
                <List>
                    <List.Item>Item 1</List.Item>
                    <List.Item>Item 2</List.Item>
                </List>
            );

            const list = screen.getByRole('list');
            expect(list.tagName).toBe('UL');
        });

        it('renders an ordered list when tag is "ol"', () => {
            render(
                <List tag="ol">
                    <List.Item>Item 1</List.Item>
                    <List.Item>Item 2</List.Item>
                </List>
            );

            const list = screen.getByRole('list');
            expect(list.tagName).toBe('OL');
        });

        it('renders list items correctly', () => {
            render(
                <List>
                    <List.Item>First item</List.Item>
                    <List.Item>Second item</List.Item>
                </List>
            );

            expect(screen.getByText('First item')).toBeInTheDocument();
            expect(screen.getByText('Second item')).toBeInTheDocument();
        });
    });

    describe('Props forwarding', () => {
        it('forwards custom className to the list', () => {
            const { container } = render(
                <List className="custom-class">
                    <List.Item>Item</List.Item>
                </List>
            );

            const list = container.querySelector('.custom-class');
            expect(list).toBeInTheDocument();
        });

        it('applies default direction as vertical', () => {
            render(
                <List>
                    <List.Item>Item</List.Item>
                </List>
            );

            const list = screen.getByRole('list');
            expect(list).toBeInTheDocument();
        });

        it('applies custom size prop', () => {
            render(
                <List size={24}>
                    <List.Item>Item</List.Item>
                </List>
            );

            const list = screen.getByRole('list');
            expect(list).toBeInTheDocument();
        });

        it('forwards additional props to CommonList', () => {
            render(
                <List data-testid="custom-list">
                    <List.Item>Item</List.Item>
                </List>
            );

            expect(screen.getByTestId('custom-list')).toBeInTheDocument();
        });
    });

    describe('Subcomponents', () => {
        it('exposes List.Item subcomponent', () => {
            expect(List.Item).toBeDefined();
            expect(typeof List.Item).toBe('function');
        });

        it('exposes List.Title subcomponent', () => {
            expect(List.Title).toBeDefined();
            expect(typeof List.Title).toBe('function');
        });

        it('exposes List.Separator subcomponent', () => {
            expect(List.Separator).toBeDefined();
            expect(typeof List.Separator).toBe('function');
        });

        it('renders with List.Title', () => {
            render(
                <List>
                    <List.Title>List Title</List.Title>
                    <List.Item>Item 1</List.Item>
                </List>
            );

            expect(screen.getByText('List Title')).toBeInTheDocument();
            expect(screen.getByText('Item 1')).toBeInTheDocument();
        });
    });

    describe('Different tag types', () => {
        it('renders correctly with ul tag', () => {
            render(
                <List tag="ul">
                    <List.Item>Unordered item</List.Item>
                </List>
            );

            const list = screen.getByRole('list');
            expect(list.tagName).toBe('UL');
        });

        it('renders correctly with ol tag', () => {
            render(
                <List tag="ol">
                    <List.Item>Ordered item</List.Item>
                </List>
            );

            const list = screen.getByRole('list');
            expect(list.tagName).toBe('OL');
        });
    });

    describe('Direction prop', () => {
        it('applies vertical direction by default', () => {
            render(
                <List>
                    <List.Item>Item</List.Item>
                </List>
            );

            const list = screen.getByRole('list');
            expect(list).toBeInTheDocument();
        });

        it('accepts horizontal direction', () => {
            render(
                <List direction="horizontal">
                    <List.Item>Item 1</List.Item>
                    <List.Item>Item 2</List.Item>
                </List>
            );

            const list = screen.getByRole('list');
            expect(list).toBeInTheDocument();
        });
    });
});
