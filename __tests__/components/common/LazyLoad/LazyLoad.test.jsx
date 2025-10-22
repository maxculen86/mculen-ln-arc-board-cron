import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LazyLoad from '../../../../components/common/LazyLoad/LazyLoad';

describe('Components - common - LazyLoad - LazyLoad', () => {
    let observerCallback;
    let observeMock;
    let unobserveMock;
    let disconnectMock;

    beforeEach(() => {
        observeMock = jest.fn();
        unobserveMock = jest.fn();
        disconnectMock = jest.fn();
        observerCallback = null;

        global.IntersectionObserver = jest.fn((callback, options) => {
            observerCallback = callback;
            return {
                observe: observeMock,
                disconnect: disconnectMock,
                unobserve: unobserveMock
            };
        });
    });

    afterEach(() => {
        delete global.IntersectionObserver;
    });

    it('should render placeholder before intersection and children after intersecting', async () => {
        const onViewport = jest.fn();
        const Placeholder = () => <div>placeholder</div>;

        render(
            <LazyLoad
                PlaceholderComponent={Placeholder}
                onViewport={onViewport}
            >
                <div>content</div>
            </LazyLoad>
        );

        expect(screen.getByText('placeholder')).toBeInTheDocument();
        expect(onViewport).not.toHaveBeenCalled();

        await waitFor(() => {
            observerCallback([{ isIntersecting: true }]);
            expect(disconnectMock).toHaveBeenCalled();
        });

        await waitFor(() => expect(onViewport).toHaveBeenCalledTimes(1));
        await waitFor(() =>
            expect(screen.getByText('content')).toBeInTheDocument()
        );
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });

    it('should return null when hide is true', () => {
        const { container } = render(
            <LazyLoad hide PlaceholderComponent={() => <div>placeholder</div>}>
                <div>content</div>
            </LazyLoad>
        );

        expect(container.firstChild).toBeNull();
        expect(global.IntersectionObserver).not.toHaveBeenCalled();
    });
});
