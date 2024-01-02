import React from 'react';
import { render } from '@testing-library/react';
import LazyLoad from '../../../../../../components/features/foodit-global/common/LazyLoad/foodit';

describe('Tests LazyLoad Component', () => {
    global.IntersectionObserver = jest.fn((callback, options) => {
        return {
            observe: jest.fn(() => {
                callback([{ isIntersecting: false }]);
            }),
            disconnect: jest.fn(),
            unobserve: jest.fn()
        };
    });
    it('should call onViewport when component is in the viewport', () => {
        const onViewportMock = jest.fn();
        render(<LazyLoad onViewport={onViewportMock}>Lazy Content</LazyLoad>);
        expect(onViewportMock).toBeCalledTimes(0);
        const [callback] = window.IntersectionObserver.mock.calls[0];
        callback([{ isIntersecting: true }]);
        expect(onViewportMock).toBeCalledTimes(1);
    });
});
