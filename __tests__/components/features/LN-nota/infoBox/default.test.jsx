import React from 'react';
import { render } from '@testing-library/react';
import Context from 'fusion:context';
import InfoBoxFeature from '../../../../../components/features/LN-nota/infoBox/default';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('InfoBox', () => {
    it('Should render if parent id is /deportes', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                taxonomy: { primary_section: { parent_id: '/deportes' } }
            }
        }));

        const { container } = render(
            <InfoBoxFeature contextPath={'/pf'} deployment={arg => arg} />
        );
        expect(container).toMatchSnapshot();
    });

    it('shouldnt render if parent id is another than /deportes', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                taxonomy: { primary_section: { parent_id: '/mundo' } }
            }
        }));

        const { container } = render(
            <InfoBoxFeature contextPath={'/pf'} deployment={arg => arg} />
        );
        expect(container).toMatchSnapshot();
    });
});
