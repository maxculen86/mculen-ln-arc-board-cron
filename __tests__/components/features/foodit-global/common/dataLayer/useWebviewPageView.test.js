import { renderHook } from '@testing-library/react';
import { useWebviewPageView } from '../../../../../../components/features/foodit-global/common/dataLayer/useWebviewPageView';

jest.mock(
    '../../../../../../components/features/foodit-global/common/utils/isMobileWebView',
    () => ({
        isMobileWebView: jest.fn()
    })
);
jest.mock(
    '../../../../../../components/features/foodit-global/common/utils/pushFooditEvent',
    () => ({
        pushFooditEvent: jest.fn()
    })
);

const {
    isMobileWebView
} = require('../../../../../../components/features/foodit-global/common/utils/isMobileWebView');
const {
    pushFooditEvent
} = require('../../../../../../components/features/foodit-global/common/utils/pushFooditEvent');

describe('useWebviewPageView', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls pushFooditEvent with page_view and params when in webview', () => {
        isMobileWebView.mockReturnValue(true);
        renderHook(() =>
            useWebviewPageView({ section: 'chat', content_type: 'buscador' })
        );
        expect(pushFooditEvent).toHaveBeenCalledWith({
            event: 'page_view',
            section: 'chat',
            content_type: 'buscador'
        });
    });

    it('does nothing when not in webview', () => {
        isMobileWebView.mockReturnValue(false);
        renderHook(() => useWebviewPageView({ section: 'chat' }));
        expect(pushFooditEvent).not.toHaveBeenCalled();
    });

    it('calls pushFooditEvent with only page_view when no params passed', () => {
        isMobileWebView.mockReturnValue(true);
        renderHook(() => useWebviewPageView());
        expect(pushFooditEvent).toHaveBeenCalledWith({ event: 'page_view' });
    });
});
