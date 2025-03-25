import React from 'react';
import { render } from '@testing-library/react';
import ShareV2 from '../../../../../components/features/LN-common/shareV2/default';
import useShare from '../../../../../components/features/LN-nota/share/hooks/useShare';
import { shareVideoConfig } from '../../../../../components/features/LN-common/shareV2/helper';

jest.mock(
    '../../../../../components/features/LN-nota/share/hooks/useShare',
    () =>
        jest.fn(() => ({
            setCopy: jest.fn(),
            shareButton: jest.fn()
        }))
);

jest.mock(
    '../../../../../components/features/LN-common/shareV2/components/ShareBar',
    () => {
        const ShareBar = ({ children }) => (
            <div data-testid="share-bar">{children}</div>
        );

        ShareBar.Button = ({ children, onClick }) => (
            <button data-testid="share-button" onClick={onClick}>
                {children}
            </button>
        );

        return ShareBar;
    }
);

describe('Components - features - LN-common - ShareV2 - default', () => {
    it('matches the snapshot', () => {
        const { asFragment } = render(
            <ShareV2
                videoId="TdCdBgL"
                videoTitle="“Alá y el islam son la verdadera religión”. El grafiti en una iglesia vandalizada en el bastión rebelde en Siria y la luz de esperanza que ven los cristianos"
                className="custom-class"
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
