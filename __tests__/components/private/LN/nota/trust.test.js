import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('fusion:context', Component => {
    return function(Component) {
        const owner = {
            sponsored: true
        };
        return props => (
            <Component
                {...{
                    ...props,
                    globalContent: {
                        ...{
                            ...props.globalContent,
                            owner
                        }
                    }
                }}
            />
        );
    };
});

import Context from 'fusion:context';

import Trust from '../../../../../components/features/LN-nota/trust';

describe('Trust', () => {
    it('Does not show when sponsored content is present', () => {
        const { container } = render(<Trust />);
        expect(container.firstChild).toBeNull();
    });
});
