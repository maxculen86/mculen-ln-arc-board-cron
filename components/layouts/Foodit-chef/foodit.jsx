import React from 'react';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import AuthorBiography from '../../features/foodit-global/common/authorBiography/foodit';

const pageBuilderSections = ['Notas'];

const ChefFoodit = props => {
    const { children } = props;

    const [notas] = children;

    // TODO: eliminar mock cuando se traiga la data
    const authorBiographyMock = {
        name: 'Dolli Beatriz Irigoyen Fontaine',
        imageProps: {
            src:
                'https://genealogiafamiliar.net//GF-datos/photos/Dolli%20Irigoyen.jpg'
        },
        description:
            'Lana soñaba con volar a la luna. Todas las tardes se tumbaba en su cama y se imaginaba cómo sería su viaje a bordo de su propia nave espacial.',
        socialNetworks: [
            { icon: 'instagram', name: '{user instagram}', href: '#' },
            { icon: 'youtube', name: '{user youtube}', href: '#' },
            { icon: 'pinterest', name: '{user pinterest}', href: '#' },
            { icon: 'twitter', name: '{user twitter}', href: '#' }
        ]
    };

    return (
        <BaseLayout>
            <div className="flex flex-column gap-32">
                <AuthorBiography {...authorBiographyMock} />
                <hr className="floating-button-sentinel" />
                <section className="flex flex-column gap-32">{notas}</section>
            </div>
        </BaseLayout>
    );
};

ChefFoodit.sections = pageBuilderSections;

export default ChefFoodit;
