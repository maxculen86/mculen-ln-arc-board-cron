import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CssLinksLn10 from '../../../../components/output-types/Helper/cssLinksLn10';
import Context from 'fusion:context';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Components - outputType - helper - CssLinksLn10', () => {
    const deployment = arg => arg;
    const CssLinks = () => {
        return `<link href="/pf/dist/components/output-types/default.css"
        id="fusion-output-type-styles" rel="stylesheet" type="text/css"/>`;
    };
    Context.useAppContext = jest.fn(() => ({
        deployment,
        contextPath: '/pf',
        arcSite: arcSite
    }));

    const setting = {
        deployment: deployment,
        contextPath: '/pf',
        arcSite: 'la-nacion-ar'
    };
    test('When isLN10 is false and arcSite is "la-nacion-ar", should return <CssLinks> arc component', () => {
        const { container } = render(
            <CssLinksLn10
                CssLinks={CssLinks}
                isLN10={false}
                deployment={setting.deployment}
                contextPath={setting.contextPath}
                arcSite={setting.arcSite}
            />
        );

        expect(container).toMatchSnapshot();
    });

    test('When isLN10 is true and arcSite is "la-nacion-ar", should return a fragment', () => {
        const { container } = render(
            <CssLinksLn10
                CssLinks={setting.CssLinks}
                isLN10={true}
                deployment={setting.deployment}
                arcSite={setting.arcSite}
                contextPath={setting.contextPath}
            />
        );

        expect(container).toBeEmptyDOMElement();
    });
});
