import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LotteryDetailNav from '../../../../../components/features/LN-services/lotteryDetailNav/default';

describe('Features - LN-servicios - LN Loteria Detalle Nav =>', () => {
    it('should show a complete tag list', () => {
        render(<LotteryDetailNav />);
        expect(screen.getAllByRole('listitem')).toHaveLength(16);
    });
});
