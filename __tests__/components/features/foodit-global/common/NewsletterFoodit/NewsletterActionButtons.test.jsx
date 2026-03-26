import React from 'react';
import { render } from '@testing-library/react';
import { NewsletterActionButton } from '../../../../../../components/features/foodit-global/common/Newsletter/components/NewsletterActionButtons';

jest.mock(
    '../../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () => ({
        __esModule: true,
        default: props => <i data-testid="icon-sprite" {...props} />
    })
);

describe('NewsletterActionButton snapshots', () => {
    it('snapshot OFF', () => {
        const { container } = render(
            <NewsletterActionButton
                selected={false}
                onClick={jest.fn()}
                labelOn="RECIBIENDO"
                labelOff="RECIBIR NEWSLETTER"
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('snapshot ON', () => {
        const { container } = render(
            <NewsletterActionButton
                selected
                onClick={jest.fn()}
                labelOn="RECIBIENDO"
                labelOff="RECIBIR NEWSLETTER"
            />
        );

        expect(container).toMatchSnapshot();
    });
});
