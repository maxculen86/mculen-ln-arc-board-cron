import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentFoodit from '../../../../../components/features/foodit/CommentFoodit/foodit';
import useTermica from '../../../../../components/private/common/hooks/useTermica';

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
global.IntersectionObserver = jest.fn((callback, options) => {
    return {
        observe: jest.fn(() => {
            callback([{ isIntersecting: false }]);
        }),
        disconnect: jest.fn(),
        unobserve: jest.fn()
    };
});
describe('Components - features - CommentFoodit', () => {
    it('should render CommentFoodit component', () => {
        useTermica.mockImplementation(() => true);

        const props = {
            outputType: 'foodit',
            customFields: {
                hideCaja: false
            },
            globalContent: {
                comments: {
                    display_comments: true
                },
                _id: 'ABCDEFG',
                type: 'story'
            }
        };

        const { container } = render(<CommentFoodit {...props} />);
        expect(container.querySelector('vf-tray')).toBeInTheDocument();
        expect(container.querySelector('vf-conversations')).toBeInTheDocument();
    });

    it('should hide CommentFoodit component', () => {
        useTermica.mockImplementation(() => true);

        const props = {
            outputType: 'foodit',
            customFields: {
                hideCaja: true
            },
            globalContent: {
                comments: {
                    display_comments: true
                },
                _id: 'ABCDEFG',
                type: 'story'
            }
        };

        const { container } = render(<CommentFoodit {...props} />);
        expect(container.querySelector('vf-tray')).not.toBeInTheDocument();
        expect(
            container.querySelector('vf-conversations')
        ).not.toBeInTheDocument();
    });
});
