import React from 'react';
import { render } from '@testing-library/react';
import FundingChoices from '../../../../../components/private/common/scriptManager/scriptFundingChoices';

describe('components - private - common - scriptManager - FundingChoices', () => {
    it('should render the script tag with the correct attributes and content', () => {
        const { container } = render(<FundingChoices />);

        const scriptTag = container.querySelector('script:not([src])');

        const expectedScriptContent = `
        window.googlefc = window.googlefc || {};
        googlefc.controlledMessagingFunction = function (message) {
            message.proceed(true);
        };
    `;

        expect(scriptTag).toBeDefined();
        expect(scriptTag.innerHTML.trim()).toBe(expectedScriptContent.trim());
    });
});
