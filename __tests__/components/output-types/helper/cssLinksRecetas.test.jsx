import React from 'react';
import { render } from '@testing-library/react';
import CssLinksRecetas from '../../../../components/output-types/Helper/cssLinksRecetas';
import Context from 'fusion:context';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
describe('Components - outputType - helper - CssLinksRecetas', () => {
    const deployment = deploymentValue => deploymentValue;
    const contextPath = '/pf';

    Context.useAppContext = jest.fn(() => ({
        deployment: deployment,
        contextPath: contextPath
    }));
    it('should be a tag link', () => {
        render(<CssLinksRecetas />);
        const element = document.querySelector('link');
        expect(element).toBeTruthy();
    });
    it('should have as base href to import recetas styles', () => {
        render(<CssLinksRecetas />);
        const urlBase = deployment(`${contextPath}/dist/css/site-recetas.css`);
        const element = document.querySelector('link');
        expect(element.href).toContain(urlBase);
    });
    it('should match snapshot', () => {
        const { container } = render(<CssLinksRecetas />);
        expect(container).toMatchSnapshot();
    });
});
