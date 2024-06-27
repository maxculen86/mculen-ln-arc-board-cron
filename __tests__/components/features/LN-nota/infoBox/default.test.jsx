import React from 'react';
import { render } from '@testing-library/react';
import Context from 'fusion:context';
import InfoBoxFeature from '../../../../../components/features/LN-nota/infoBox/default';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('InfoBox', () => {
    it('Should render if path has /deportes in it', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                taxonomy: { primary_section: { path: '/deportes' } }
            }
        }));

        const { container } = render(
            <InfoBoxFeature contextPath={'/pf'} deployment={arg => arg} />
        );
        expect(container).toMatchSnapshot();
    });

    it('shouldnt render if path not contain /deportes or /juegos in it', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                taxonomy: { primary_section: { path: '/mundo' } }
            }
        }));

        const { container } = render(
            <InfoBoxFeature contextPath={'/pf'} deployment={arg => arg} />
        );
        expect(container).toMatchSnapshot();
    });
});
