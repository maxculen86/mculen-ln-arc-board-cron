import React from 'react';
import Context from 'fusion:context';
import { render } from '@testing-library/react';
import StaticValidation from '../../../../components/private/common/staticValidation';
import '@testing-library/jest-dom';

jest.mock('fusion:static', () => 'mock-static');
jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

const childMock = <p data-testid={'children-mock'}>Children mock</p>;

describe('components - private - common - StaticValidation', () => {
    beforeEach(() => {
        Context.useAppContext = jest.fn(() => ({
            outputType: 'default'
        }));
    });
    describe('With props on default outputType', () => {
        it('Should return static around children', () => {
            const { queryByText, getByTestId } = render(
                <StaticValidation id={'StaticMock'}>
                    {childMock}
                </StaticValidation>
            );
            expect(
                queryByText(
                    (_content, element) =>
                        element.tagName.toLowerCase() === 'mock-static'
                )
            ).toBeInTheDocument();
            expect(getByTestId('children-mock')).toBeInTheDocument();
        });
    });

    describe('With props on default outputType - extra condition isStatic set to false', () => {
        it('Should NOT return static, only children', () => {
            const { queryByText, getByTestId } = render(
                <StaticValidation id={'StaticMock'} isStatic={false}>
                    {childMock}
                </StaticValidation>
            );
            expect(
                queryByText(
                    (_content, element) =>
                        element.tagName.toLowerCase() === 'mock-static'
                )
            ).toBeNull();
            expect(getByTestId('children-mock')).toBeInTheDocument();
        });
    });

    describe('With extra props htmlOnly and persistent', () => {
        it('Should return static around children, with forwarded htmlOnly and persistent', () => {
            const { queryByText } = render(
                <StaticValidation
                    id={'StaticMock'}
                    isStatic={true}
                    htmlOnly
                    persistent
                >
                    {childMock}
                </StaticValidation>
            );
            const staticComp = queryByText(
                (_content, element) =>
                    element.tagName.toLowerCase() === 'mock-static'
            );
            expect(staticComp).toBeInTheDocument();
            expect(staticComp.getAttribute('htmlOnly')).toBe('true');
            expect(staticComp.getAttribute('persistent')).toBe('true');
        });
    });

    describe('With props on AMP outputType', () => {
        it('Should NOT return static around children', () => {
            Context.useAppContext = jest.fn(() => ({
                outputType: 'amp'
            }));
            const { queryByText, getByTestId } = render(
                <StaticValidation id={'StaticMock'}>
                    {childMock}
                </StaticValidation>
            );
            expect(
                queryByText(
                    (_content, element) =>
                        element.tagName.toLowerCase() === 'mock-static'
                )
            ).toBeNull();
            expect(getByTestId('children-mock')).toBeInTheDocument();
        });
    });
    describe('Without props nor outputType', () => {
        it('Should return null', () => {
            Context.useAppContext = jest.fn(() => ({
                outputType: undefined
            }));
            const { queryByText, queryByTestId } = render(
                <StaticValidation id={'StaticMock'}>
                    {childMock}
                </StaticValidation>
            );
            expect(
                queryByText(
                    (_content, element) =>
                        element.tagName.toLowerCase() === 'mock-static'
                )
            ).toBeNull();
            expect(queryByTestId('children-mock')).toBeNull();
        });
    });
});
