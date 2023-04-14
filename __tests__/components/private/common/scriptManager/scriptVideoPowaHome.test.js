import React from 'react';
import ScriptVideoPowaHome from '../../../../../components/private/common/scriptManager/scriptVideoPowaHome';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('components - private - common - ScriptVideoPowaHome', () => {
    const props = {
        renderables: [
            {
                collection: 'chains',
                props: { customFields: { layout: 'grillaVideo1' } },
                children: [
                    {
                        props: {
                            customFields: {
                                video: 'video'
                            }
                        }
                    }
                ]
            }
        ],
        section: 'home'
    };
    it('should render by having the correct props in home section', () => {
        const { container } = render(<ScriptVideoPowaHome {...props} />);
        const scriptElement = container.querySelector('script');
        expect(scriptElement).toBeInTheDocument();
    });
    it('should not render by not having a video in home section', () => {
        const customProps = { ...props, renderables: [] };
        const { container } = render(<ScriptVideoPowaHome {...customProps} />);
        const scriptElement = container.querySelector('script');
        expect(scriptElement).not.toBeInTheDocument();
    });
    it('should not render when section is not home', () => {
        const customProps = { ...props, section: 'not-home' };
        const { container } = render(<ScriptVideoPowaHome {...customProps} />);
        const scriptElement = container.querySelector('script');
        expect(scriptElement).not.toBeInTheDocument();
    });
});
