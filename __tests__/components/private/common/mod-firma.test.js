import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModFirma from '../../../../components/private/common/mod-firma';

describe('ModFirma', () => {
    const props = {
        autor: [
            { name: 'Pepe', link: 'https://lanacion.com.ar' },
            { name: 'Paco', link: 'https://lanacion.com.ar' }
        ],
        classCondition: '--autor'
    };

    it('Matches snapshot', () => {
        const { asFragment } = render(<ModFirma {...props} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('Renders as many authors as given', () => {
        const { getAllByRole } = render(<ModFirma {...props} />);
        const links = getAllByRole('link');
        expect(links).toHaveLength(2);
    });
});
