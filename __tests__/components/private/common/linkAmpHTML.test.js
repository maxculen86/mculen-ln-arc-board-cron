import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LinkAmpHTML from '../../../../components/private/common/linkAmpHTML.jsx';

describe('Private - LN - Common - linkAmpHTML', () => {
    const props = {
        canonicalUrl:
            '/politica/cambios-en-el-gabinete-el-nombramiento-de-kelly-olmos-en-trabajo-no-despierta-entusiasmo-en-la-cgt-nid13102022/',
        subtype: '1',
        arcSite: 'la-nacion-ar',
        nodeType: ''
    };
    jest.mock('fusion:content', () => ({
        useContent: jest.fn()
    }));

    it('Render OK', () => {
        const { container } = render(<LinkAmpHTML {...props} />);
        expect(container).toBeVisible();
    });

    it('Render NOTOK', () => {
        const { container } = render(<LinkAmpHTML {...props} subtype={'9'} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('If no props are sended return empty dom element', () => {
        const { container } = render(<LinkAmpHTML />);
        expect(container).toBeEmptyDOMElement();
    });

    it('Should have the correct DOM attributes', () => {
        const { container } = render(<LinkAmpHTML {...props} />);
        const link = container.getElementsByTagName('link');
        expect(link).toHaveLength(0);
    });

    it('Snapshots', () => {
        const { container } = render(<LinkAmpHTML {...props} />);
        expect(container).toMatchSnapshot();
    });
});
