import { pushFooditEvent } from '../../../../../../components/features/foodit-global/common/utils/pushFooditEvent';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';
import { scheduleTask } from '../../../../../../components/private/common/utils/scheduleTask';

jest.mock(
    '../../../../../../components/features/foodit-global/common/utils/isMobileWebView',
    () => ({ isMobileWebView: jest.fn() })
);
jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);
jest.mock(
    '../../../../../../components/private/common/utils/scheduleTask',
    () => ({
        scheduleTask: jest.fn(cb => cb())
    })
);
jest.mock('../../../../../../components/private/LN/common/utils/isSSR', () =>
    jest.fn(() => false)
);

const {
    isMobileWebView
} = require('../../../../../../components/features/foodit-global/common/utils/isMobileWebView');
const isSSR = require('../../../../../../components/private/LN/common/utils/isSSR');

describe('pushFooditEvent', () => {
    const logEventMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        isSSR.mockReturnValue(false);
        window.mobileWebView = { logEvent: logEventMock };
        Object.defineProperty(document, 'title', {
            value: 'Test Page',
            writable: true
        });
        Object.defineProperty(document, 'referrer', {
            value: '',
            writable: true
        });
    });

    afterEach(() => {
        delete window.mobileWebView;
    });

    it('calls window.mobileWebView.logEvent when in webview context', () => {
        isMobileWebView.mockReturnValue(true);
        pushFooditEvent({ event: 'e_linkclick', category: 'interaction' });
        expect(logEventMock).toHaveBeenCalledWith(
            'e_linkclick',
            JSON.stringify({ category: 'interaction' })
        );
        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('delegates to addEventToDataLayerV2 when not in webview', () => {
        isMobileWebView.mockReturnValue(false);
        const eventData = { event: 'e_linkclick', category: 'interaction' };
        pushFooditEvent(eventData);
        expect(addEventToDataLayerV2).toHaveBeenCalledWith(eventData);
        expect(logEventMock).not.toHaveBeenCalled();
    });

    it('enriches page_view with page metadata in webview', () => {
        isMobileWebView.mockReturnValue(true);
        Object.defineProperty(document, 'referrer', {
            value: 'https://foodit.com',
            writable: true
        });
        delete window.location;
        window.location = { pathname: '/recetas/pasta/' };
        pushFooditEvent({ event: 'page_view' });
        const [, jsonData] = logEventMock.mock.calls[0];
        const parsed = JSON.parse(jsonData);
        expect(parsed.page_location).toBe('/recetas/pasta/');
        expect(parsed.origin).toBe('https://foodit.com');
    });

    it('does not enrich non-page_view events in webview', () => {
        isMobileWebView.mockReturnValue(true);
        pushFooditEvent({ event: 'e_linkclick', category: 'interaction' });
        const [, jsonData] = logEventMock.mock.calls[0];
        const parsed = JSON.parse(jsonData);
        expect(parsed.page_title).toBeUndefined();
        expect(parsed.page_location).toBeUndefined();
    });

    it('does nothing in SSR context', () => {
        isSSR.mockReturnValue(true);
        pushFooditEvent({ event: 'e_linkclick' });
        expect(logEventMock).not.toHaveBeenCalled();
        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });
});
