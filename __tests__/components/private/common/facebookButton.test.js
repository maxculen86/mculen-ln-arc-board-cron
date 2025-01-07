
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Component from '../../../../components/private/common/facebookButton';


describe('private - common - facebookButton', () => {

    const FAKE_CLICK = jest.fn()

    test('verify that the onClick event ', () => {
        render(
            <Component onClick={FAKE_CLICK} />
        )

        const button = screen.getByRole('btn-face')

        expect(button).toBeInTheDocument()

        fireEvent.click(button)

        expect(FAKE_CLICK).toHaveBeenCalledTimes(1)

    });
});
