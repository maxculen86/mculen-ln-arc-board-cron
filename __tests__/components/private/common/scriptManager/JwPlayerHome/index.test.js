import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import JwPlayerHome from '../../../../../../components/private/common/scriptManager/JwPlayerHome';
import { selectJwPlayerId } from '../../../../../../components/private/common/scriptManager/JwPlayerHome/helpers';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../../components/private/common/scriptManager/JwPlayerHome/helpers',
    () => ({
        selectJwPlayerId: jest.fn()
    })
);

describe('JwPlayerHome component', () => {
    it('Renders a script with the correct playerId', () => {
        useAppContext.mockReturnValue({ renderables: [] });
        selectJwPlayerId.mockReturnValue('OSRCuuxn');

        const { container } = render(<JwPlayerHome />);
        const script = container.querySelector('script');

        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute(
            'src',
            'https://cdn.jwplayer.com/libraries/OSRCuuxn.js'
        );
    });

    it('Does not render anything if no playerId is returned', () => {
        useAppContext.mockReturnValue({ renderables: [] });
        selectJwPlayerId.mockReturnValue(null);

        const { container } = render(<JwPlayerHome />);
        expect(container.firstChild).toBeNull();
    });
});
