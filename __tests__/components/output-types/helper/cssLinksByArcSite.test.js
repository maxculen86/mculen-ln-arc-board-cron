import React from 'react';
import { render } from '@testing-library/react';
import CssLinksBySite from '../../../../components/output-types/Helper/cssLinksByArcSite';
import Context from 'fusion:context';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('CssLinksBySite', () => {
    describe('Components - outputType - helper - CssLinksBySite', () => {
        const deployment = deploymentValue => deploymentValue;
        const contextPath = '/pf';
        let arcSite = '';

        Context.useAppContext = jest.fn(() => ({
            deployment: deployment,
            contextPath: contextPath,
            arcSite: arcSite
        }));
        
        it('should have as base href to import styles', () => {
            arcSite = 'foodit';
            render(<CssLinksBySite />);
            const urlBase = deployment(
                `${contextPath}/dist/css/site-${arcSite}.css`
            );
            const element = document.querySelector('link');
            expect(element.href).toMatch(urlBase);
        });
        it('should return a fragment when arcSite is la-nacion-ar', () => {
            arcSite = 'la-nacion-ar';
            const { asFragment } = render(<CssLinksBySite />);
            console.log(asFragment());
            expect(asFragment()).toMatchInlineSnapshot(`
                <DocumentFragment>
                  <link
                    href="/pf/dist/css/site-la-nacion-ar.css"
                    id="fusion-output-type-styles"
                    rel="stylesheet"
                    type="text/css"
                  />
                </DocumentFragment>
            `);
        });
    });
});
