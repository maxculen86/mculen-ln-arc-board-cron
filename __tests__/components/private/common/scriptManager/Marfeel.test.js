import React from 'react';
import { MARFEEL_ACCOUNT_ID } from '../../../../../__mocks__/fusion:environment';
import { render } from '@testing-library/react';
import Marfeel from '../../../../../components/private/common/scriptManager/Marfeel';
import '@testing-library/jest-dom';

jest.mock('fusion:environment');

describe('Marfeel Component', () => {
    it('renders a script element', () => {
        const { container } = render(<Marfeel />);
        const scriptElement = container.querySelector('script');
        expect(scriptElement).toBeInTheDocument();
    });

    it('script element should have type "text/javascript"', () => {
        const { container } = render(<Marfeel />);
        const scriptElement = container.querySelector('script');
        expect(scriptElement).toHaveAttribute('type', 'text/javascript');
    });

    it('uses dangerouslySetInnerHTML to inject script content', () => {
        const { container } = render(<Marfeel />);
        const scriptElement = container.querySelector('script');
        expect(scriptElement.innerHTML).toMatch('function e(e)');
    });

    it('injects correct script content in __html', () => {
        const { container } = render(<Marfeel />);
        const scriptElement = container.querySelector('script');
        const expectedScriptContent = `window.addEventListener('load',function(){!function(){"use strict";function e(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],c=document.createElement("script");c.src=e,t?c.type="module":(c.async=!0,c.type="text/javascript",c.setAttribute("nomodule",""));var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(c,n)}!function(t,c){!function(t,c,n){var a,o,r;n.accountId=c,null!==(a=t.marfeel)&&void 0!==a||(t.marfeel={}),null!==(o=(r=t.marfeel).cmd)&&void 0!==o||(r.cmd=[]),t.marfeel.config=n;var i="https://sdk.mrf.io/statics";e("".concat(i,"/marfeel-sdk.js?id=").concat(c),!0),e("".concat(i,"/marfeel-sdk.es5.js?id=").concat(c),!1)}(t,c,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{})}(window,${MARFEEL_ACCOUNT_ID} /* AccountId */,{} /* Config */)}()});`;
        expect(scriptElement.innerHTML).toMatch(expectedScriptContent);
    });
});
