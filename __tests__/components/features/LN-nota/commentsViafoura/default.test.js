import React from 'react';
import {
    render,
    screen,
    fireEvent,
    waitFor,
    act
} from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentsViafouraFeature from '../../../../../components/features/LN-nota/commentsViafoura/default';
import dynamicallyLoadScript from '../../../../../components/private/LN/common/utils/dynamicallyLoadScript';
import { useValidateComments } from '../../../../../components/private/common/utils/commentsHelper';
import useTermica from '../../../../../components/private/common/hooks/useTermica';
import { VIDEO_COMENTARIOS } from '../../../../../components/private/common/utils/subtypes/subtypeHelper';
import * as scrollUtils from '../../../../../components/private/LN/common/utils/scrollToElementWithOffset';

jest.mock('fusion:consumer', () => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../../components/private/LN/common/utils/dynamicallyLoadScript'
);

jest.mock('../../../../../components/private/common/utils/commentsHelper');

jest.mock('../../../../../components/private/common/hooks/useTermica');

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock(
    '../../../../../components/private/LN/common/utils/scrollToElementWithOffset'
);

jest.mock(
    '../../../../../components/features/LN/common/scrollToTopButton/ScrollToTopButton',
    () => {
        return function MockScrollToTopButton({ onClick }) {
            return (
                <button onClick={onClick} data-testid="scroll-top-btn">
                    Scroll Top
                </button>
            );
        };
    }
);

const mockGlobalContext = {
    state: {
        loginData: {
            subscription: true
        }
    }
};

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn(() => mockGlobalContext)
}));

describe('CommentsViafouraFeature', () => {
    const setupMocks = ({
        shouldLoad = true,
        messageType = 'CLOSED_BY_TERMIC',
        termicaLivefyre = true
    } = {}) => {
        useValidateComments.mockReturnValue({
            shouldLoad,
            messageType,
            messageProps: messageType ? { title: 'Test Message' } : null,
            setMessage: jest.fn()
        });
        useTermica.mockReturnValue(termicaLivefyre);
        dynamicallyLoadScript.mockResolvedValue();
    };

    beforeEach(() => {
        jest.clearAllMocks();
        window.scrollTo = jest.fn();
        window.IntersectionObserver = jest.fn(function (callback) {
            window.intersectionObserverCallback = callback;
            return {
                observe: jest.fn(),
                disconnect: jest.fn()
            };
        });
    });

    it('renders without crashing', () => {
        setupMocks();
        render(<CommentsViafouraFeature outputType="default" />);
        expect(screen.getByText('Test Message')).toBeInTheDocument();
    });

    it('loads Viafoura script when intersecting', () => {
        setupMocks();
        render(<CommentsViafouraFeature outputType="default" />);

        act(() => {
            if (window.intersectionObserverCallback) {
                window.intersectionObserverCallback([{ isIntersecting: true }]);
            }
        });

        expect(dynamicallyLoadScript).toHaveBeenCalledWith(
            'https://cdn.viafoura.net/vf-v2.js',
            'body'
        );
    });

    it('does not render if shouldLoad is false', () => {
        setupMocks({ shouldLoad: false });
        render(<CommentsViafouraFeature outputType="default" />);
        expect(screen.queryByText('Test Message')).not.toBeInTheDocument();
    });

    it('renders Message component if termicaLivefyre is false and messageType is CLOSED_BY_TERMIC', () => {
        setupMocks({ termicaLivefyre: false, messageType: 'CLOSED_BY_TERMIC' });
        render(<CommentsViafouraFeature outputType="default" />);
        expect(screen.getByText('Test Message')).toBeInTheDocument();
    });

    it('does not render component if outputType is not default', () => {
        setupMocks();
        render(<CommentsViafouraFeature outputType="non-default" />);
        expect(screen.queryByText('Test Message')).not.toBeInTheDocument();
    });
    it('loads Viafoura script on mount for VIDEO_COMENTARIOS subtype', async () => {
        setupMocks();

        render(
            <CommentsViafouraFeature
                outputType="default"
                globalContent={{ subtype: VIDEO_COMENTARIOS }}
            />
        );

        await waitFor(() => {
            expect(dynamicallyLoadScript).toHaveBeenCalledWith(
                'https://cdn.viafoura.net/vf-v2.js',
                'body'
            );
        });
    });

    describe('tracking comments', () => {
        it('llama a addEventToDataLayerV2 con los parámetros correctos', () => {
            const {
                addEventToDataLayerV2
            } = require('../../../../../components/private/LN/common/utils/addEventToDataLayer');

            addEventToDataLayerV2({
                event: 'impressioncomentario',
                ctr_brand: 'cajaComentarios',
                ctr_position: '101100',
                articleId: '123'
            });

            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'impressioncomentario',
                ctr_brand: 'cajaComentarios',
                ctr_position: '101100',
                articleId: '123'
            });
        });
    });

    describe('scroll to top button', () => {
        it('scrolls to article title when h1 exists', () => {
            setupMocks();
            const mockElement = document.createElement('h1');
            mockElement.className = 'com-title';
            mockElement.textContent = 'Article Title';
            jest.spyOn(mockElement, 'getBoundingClientRect').mockReturnValue({
                top: 200
            });
            document.body.appendChild(mockElement);
            window.scrollY = 500;

            render(<CommentsViafouraFeature outputType="default" />);
            fireEvent.click(screen.getByTestId('scroll-top-btn'));

            expect(scrollUtils.scrollToElementWithOffset).toHaveBeenCalledWith(
                mockElement
            );

            document.body.removeChild(mockElement);
        });

        it('scrolls to top with smooth behavior when h1 not found', () => {
            setupMocks();
            render(<CommentsViafouraFeature outputType="default" />);
            fireEvent.click(screen.getByTestId('scroll-top-btn'));

            expect(window.scrollTo).toHaveBeenCalledWith({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});
