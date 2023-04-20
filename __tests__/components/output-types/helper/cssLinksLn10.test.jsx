import React from 'react';
import { render, screen } from '@testing-library/react';
import CssLinksLn10 from '../../../../components/output-types/Helper/cssLinksLn10';

describe('Components - outputType - helper - CssLinksLn10', () => {
    const deployment = arg => arg;
    const CssLinks = () => {
        return `<link href="/pf/dist/components/output-types/default.css"
        id="fusion-output-type-styles" rel="stylesheet" type="text/css"/>`;
    };

    const setting = {
        deployment: deployment,
        contextPath: 'pf'
    };
    test('When isLN10 is false, should return CssHomeLN10', () => {
        const { asFragment } = render(
            <CssLinksLn10
                CssLinks={CssLinks}
                isLN10={false}
                deployment={setting.deployment}
                contextPath={setting.contextPath}
            />
        );

        expect(asFragment()).toMatchInlineSnapshot(`
            <DocumentFragment>
              &lt;link href="/pf/dist/components/output-types/default.css"
                    id="fusion-output-type-styles" rel="stylesheet" type="text/css"/&gt;
            </DocumentFragment>
        `);
    });

    test('When isLN10 is true, should return CssLinks', () => {
        const { asFragment } = render(
            <CssLinksLn10
                CssLinks={setting.CssLinks}
                isLN10={true}
                deployment={setting.deployment}
                contextPath={setting.contextPath}
            />
        );

        expect(asFragment()).toMatchInlineSnapshot(`
            <DocumentFragment>
              <link
                href="pf/resources/packages/css/homeln10-style.min.css"
                id="fusion-output-type-styles"
                rel="stylesheet"
                type="text/css"
              />
            </DocumentFragment>
        `);
    });
});
