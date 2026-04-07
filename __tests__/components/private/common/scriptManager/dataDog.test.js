import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import Datadog from '../../../../../components/private/common/scriptManager/dataDog';
import handleCookie from '../../../../../components/private/LN/common/utils/handleCookie';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../components/private/LN/common/utils/handleCookie',
    () =>
        jest.fn(() => ({
            getCookie: jest.fn(() => 'mockedCookieValue'),
            setCookie: jest.fn(),
            eraseCookie: jest.fn(),
            DiccionarioCookiesAGuardar: []
        }))
);

jest.mock('fusion:environment', () => ({
    DATADOG_CONFIG: {
        'la-nacion-ar': {
            clientTokenLogs: 'mockClientTokenLogs',
            clientTokenRum: 'mockClientTokenRum',
            applicationId: 'mockApplicationId',
            site: 'mockSite',
            forwardErrorsToLogs: true,
            sampleRateLog: 100,
            sampleRateRum: 100,
            service: 'mockService',
            env: 'test',
            sessionReplaySampleRate: 100,
            trackResources: true,
            trackLongTasks: true,
            trackUserInteractions: true,
            trackSessionAcrossSubdomains: true,
            defaultPrivacyLevel: 'mask-user-input'
        }
    }
}));

describe('Datadog Component', () => {
    beforeEach(() => {
        useAppContext.mockReturnValue({
            deployment: path => path,
            arcSite: 'la-nacion-ar',
            globalContent: {
                subtype: 'subtypeValue',
                node_type: 'nodeTypeValue'
            },
            template: 'templateValue',
            outputType: 'outputTypeValue',
            globalContentConfig: { source: 'sourceValue' },
            layout: 'layoutValue',
            contextPath: '/mockedContextPath'
        });
    });

    test('renders Datadog scripts', () => {
        const { container } = render(<Datadog />);

        const containerScripts = container.querySelectorAll('script');
        const [logScript, rumScript] = containerScripts;

        const configScript = document.head.querySelector(
            '#script-configure-datadog-context'
        );

        expect(logScript).toBeInTheDocument();
        expect(logScript).toHaveAttribute('type', 'text/javascript');
        expect(logScript).toHaveAttribute('async');
        expect(logScript.innerHTML).toContain('DD_LOGS.init');

        expect(rumScript).toBeInTheDocument();
        expect(rumScript).toHaveAttribute('type', 'text/javascript');
        expect(rumScript).toHaveAttribute('async');
        expect(rumScript.innerHTML).toContain('DD_RUM.init');

        expect(configScript).toBeInTheDocument();
        expect(configScript).toHaveAttribute('type', 'text/javascript');
        expect(configScript).toHaveAttribute('defer');
        expect(configScript).toHaveAttribute(
            'id',
            'script-configure-datadog-context'
        );
        expect(configScript).toHaveAttribute(
            'src',
            '/mockedContextPath/resources/js/LN/configureDatadogContext.min.js'
        );

        const expectedObj = {
            layout: 'layoutValue',
            contentSource: 'sourceValue',
            outputType: 'outputTypeValue',
            subtype: 'subtypeValue',
            template: 'templateValue',
            nodeType: 'nodeTypeValue'
        };
        expect(configScript.getAttribute('data-obj')).toBe(
            JSON.stringify(expectedObj)
        );
    });

    test('renders scripts regardless of where it is placed', () => {
        const { container } = render(<Datadog />);

        const scripts = container.querySelectorAll('script');
        expect(scripts.length).toBeGreaterThan(0);
    });
});
