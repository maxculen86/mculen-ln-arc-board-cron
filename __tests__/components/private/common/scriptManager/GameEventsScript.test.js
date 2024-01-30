import React from 'react';
import { render } from '@testing-library/react';
import GameEventScript from '../../../../../components/private/common/scriptManager/GameEventsScript';

jest.mock('fusion:context', () => ({
    useAppContext: () => {
        return { contextPath: 'pf', deployment: () => {} };
    }
}));

describe('setEventsGames', () => {
    it('Debe insetar el script en el DOM', () => {
        render(<GameEventScript />);
        const scriptTag = document.getElementById('script-games-events');
        expect(scriptTag).not.toBeNull();
    });
});
