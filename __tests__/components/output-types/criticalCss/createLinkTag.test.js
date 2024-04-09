import { createLinkTag } from '../../../../components/output-types/criticalCss/helpers';
import '@testing-library/jest-dom/extend-expect';
describe('components - outputType - criticalCss - createStyleTag', () => {
    const mockParams = {
        contextPath: '/pf',
        cssPathsByLayout: {
            HomeLN10: 'resources/packages/css/HomeLN10.min.css'
        },
        deployment: arg => arg,
        layout: 'HomeLN10'
    };
    createLinkTag(mockParams);
    it('should render attributes correctly', () => {
        const link = document.head.querySelector('link');
        expect(link).toHaveAttribute('rel', 'stylesheet');
        expect(link).toHaveAttribute('type', 'text/css');
        expect(link).toHaveAttribute('id', 'fusion-output-type-styles');
        expect(link).toHaveAttribute(
            'href',
            '/pf/resources/packages/css/HomeLN10.min.css'
        );
    });
    it('should match snapshot', () => {
        expect(document.head).toMatchSnapshot();
    });
});
