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
import getScrollPercent from '../../../../../components/private/LN/common/utils/getScrollPercent';
import { VIDEO_COMENTARIOS } from '../../../../../components/private/common/utils/subtypes/subtypeHelper';

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
    '../../../../../components/private/LN/common/utils/getScrollPercent',
    () => jest.fn()
);

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
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
        termicaLivefyre = true,
        scrollPercent = 95
    } = {}) => {
        useValidateComments.mockReturnValue({
            shouldLoad,
            messageType,
            messageProps: messageType ? { title: 'Test Message' } : null,
            setMessage: jest.fn()
        });
        useTermica.mockReturnValue(termicaLivefyre);
        dynamicallyLoadScript.mockResolvedValue();
        getScrollPercent.mockReturnValue(scrollPercent);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        setupMocks();
        render(<CommentsViafouraFeature outputType="default" />);
        expect(screen.getByText('Test Message')).toBeInTheDocument();
    });

    it('loads Viafoura script on scroll', () => {
        setupMocks();
        render(<CommentsViafouraFeature outputType="default" />);
        fireEvent.scroll(window, { target: { scrollY: 1000 } });
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
});
