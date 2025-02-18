import React from 'react';
import { render } from '@testing-library/react';
import DiagramationCard from '../../../../../components/features/LN-common/Juego/diagramationCard';

//TO-DO: COMPLETAR TESTS UNITARIOS
describe('Component - Features - LN Common - juego - DiagramationCard', () => {
    it('should match the snapshot', () => {
        const { asFragment } = render(
            <DiagramationCard variant="fourVertical">
                <div>Children</div>
            </DiagramationCard>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
