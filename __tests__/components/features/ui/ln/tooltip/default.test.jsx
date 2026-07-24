import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tooltip from '../../../../../../components/features/ui/ln/tooltip/default';

// El mock del DS renderiza el customWrapper recibido, exponiendo show/onExitComplete
// vía props de test para poder ejercitar el wrapper por defecto del facade.
jest.mock('@ln/ds-common-tooltip', () => {
    function Content({
        customWrapper: Wrapper,
        children,
        testShow = true,
        testOnExit
    }) {
        return (
            <div data-testid="ds-content">
                <Wrapper show={testShow} onExitComplete={testOnExit}>
                    {children}
                </Wrapper>
            </div>
        );
    }
    function Root({ children }) {
        return <div>{children}</div>;
    }
    Root.Trigger = function Trigger({ children }) {
        return <div>{children}</div>;
    };
    Root.Content = Content;
    return { Tooltip: Root };
});

describe('ui/ln/tooltip facade', () => {
    describe('default customWrapper', () => {
        it('should wrap the content in a data-tw node with display:contents', () => {
            render(<Tooltip.Content>hola</Tooltip.Content>);

            const wrapper = screen
                .getByTestId('ds-content')
                .querySelector('[data-tw]');

            expect(wrapper).toBeInTheDocument();
            expect(wrapper).toHaveStyle({ display: 'contents' });
            expect(wrapper).toHaveTextContent('hola');
        });

        it('should be overridable by passing a customWrapper', () => {
            function Custom({ children }) {
                return <div data-testid="custom">{children}</div>;
            }

            render(
                <Tooltip.Content customWrapper={Custom}>hola</Tooltip.Content>
            );

            expect(screen.getByTestId('custom')).toBeInTheDocument();
            expect(
                screen.getByTestId('ds-content').querySelector('[data-tw]')
            ).toBeNull();
        });
    });

    describe('deferred unmount', () => {
        it('should call onExitComplete when the content closes (show=false)', () => {
            const onExit = jest.fn();

            render(
                <Tooltip.Content testShow={false} testOnExit={onExit}>
                    x
                </Tooltip.Content>
            );

            expect(onExit).toHaveBeenCalled();
        });

        it('should not call onExitComplete while open (show=true)', () => {
            const onExit = jest.fn();

            render(
                <Tooltip.Content testShow testOnExit={onExit}>
                    x
                </Tooltip.Content>
            );

            expect(onExit).not.toHaveBeenCalled();
        });
    });
});
