import React from 'react';
import Context from 'fusion:context';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import WIkiFeature from '../../../../components/features/LN-acumulado/wiki/default';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

describe('LN-Acumulado-WikiTag test', () => {
    it('Should render the feture when isWIki si true', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                isWiki: true
            }
        }));
        const { container } = render(<WIkiFeature />);

        expect(container).toBeInTheDocument();
    });
    it('Should not render when isWIki is false', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                isWiki: false
            }
        }));
        const { container } = render(<WIkiFeature />);

        expect(container).toMatchInlineSnapshot('<div />');
    });
});
