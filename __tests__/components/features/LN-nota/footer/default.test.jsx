import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../../../../../components/features/LN-nota/footer/default';

jest.mock(
    '../../../../../components/features/LN-nota/footer/_children/externalSiganture',
    () => () => <div>ExternalSignature</div>
);
jest.mock(
    '../../../../../components/features/LN-nota/footer/_children/logo',
    () => () => <div>Logo</div>
);
jest.mock(
    '../../../../../components/features/LN-nota/footer/_children/trustProject',
    () => () => <div>TrustProject</div>
);
jest.mock(
    '../../../../../components/features/LN-nota/footer/_children/signature',
    () => () => <div>Signature</div>
);
jest.mock(
    '../../../../../components/features/LN-nota/footer/_children/themes',
    () => () => <div>Themes</div>
);
jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

describe('components - feature - LN-nota - Footer Component', () => {
    const globalContent = {
        _id: 'QZNU5KACKJFAJFRSKLVVZV3BDQ',
        canonical_url: '/economia/prueba-de-distributor-nid21122020/',
        category: 'Economía',
        comments: { allow_comments: true, display_comments: true },
        label: {
            edicion: { display: true, text: 'Digital' },
            enviar_a_apps: { display: true, text: 'Si', url: '' },
            mostrar_banners: { display: true, text: 'Si', url: '' },
            recomendar: { display: true, text: 'Si', url: '' },
            trust: { text: 'Noticia Original' }
        },
        owner: { sponsored: false },
        subtype: '1'
    };

    it('renders correctly with valid props and context', () => {
        const { getByText } = render(
            <Footer globalContent={globalContent} layout={'LN-nota-noticia'} />
        );

        expect(getByText('Signature')).toBeInTheDocument();
        expect(getByText('Logo')).toBeInTheDocument();
        expect(getByText('ExternalSignature')).toBeInTheDocument();
        expect(getByText('Themes')).toBeInTheDocument();
        expect(getByText('TrustProject')).toBeInTheDocument();

        expect(document.body).toMatchSnapshot();
    });
});
