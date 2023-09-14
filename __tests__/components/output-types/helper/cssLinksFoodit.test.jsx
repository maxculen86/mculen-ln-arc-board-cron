import React from 'react';
import { render } from '@testing-library/react';
import CssLinksFoodit from '../../../../components/output-types/Helper/cssLinksFoodit';
import Context from 'fusion:context';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
describe('Components - outputType - helper - CssLinksFoodit', () => {
    const deployment = deploymentValue => deploymentValue;
    const contextPath = '/pf';

    Context.useAppContext = jest.fn(() => ({
        deployment: deployment,
        contextPath: contextPath
    }));
    it('should be a tag link', () => {
        render(<CssLinksFoodit />);
        const element = document.querySelector('link');
        expect(element).toBeTruthy();
    });
    it('should have as base href to import foodit styles', () => {
        render(<CssLinksFoodit />);
        const urlBase = deployment(`${contextPath}/dist/css/site-foodit.css`);
        const element = document.querySelector('link');
        expect(element.href).toContain(urlBase);
    });
    it('should match snapshot', () => {
        const { container } = render(<CssLinksFoodit />);
        expect(container).toMatchSnapshot();
    });
});
