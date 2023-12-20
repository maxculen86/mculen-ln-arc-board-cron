import Context from 'fusion:context';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderComponent from '../../../../../../../components/private/OTT/common/header/headerItem';

jest.mock(
    '../../../../../../../components/private/common/utils/hrefHelper',
    () => {
        return { createCorrectHref: (a, b) => b };
    }
);

describe('OTT - layout - headerItem - components', () => {
    const data = { 'data-event': 'LinkClick', 'data-section': 'HeaderOTT' };
    const props = {
        description: 'descripcion',
        href: 'ott',
        alt: 'description'
    };

    it('Testeo que renderee el link', () => {
        const { getByRole } = render(<HeaderComponent {...props} />);
        const link = getByRole('link');

        expect(link).toBeInTheDocument();
    });

    it('Testeo que lleguen las props que envíen', () => {
        const { getByRole } = render(<HeaderComponent {...props} />);
        const link = getByRole('link');

        expect(link).toHaveAttribute('href', props.href);
        expect(link).toHaveAttribute('alt', props.alt);
        expect(link).toHaveTextContent(props.description);
        expect(link).toHaveAttribute('data-section', data['data-section']);
        expect(link).toHaveAttribute('data-event', data['data-event']);
    });
});
