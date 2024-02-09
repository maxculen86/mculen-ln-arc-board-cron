import React from 'react';

import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import DrawerRecetario from '../../features/foodit-global/common/drawerRecetario/foodit';
import RecetarioBody from '../../features/foodit-global/common/recetario/RecetarioBody';

import { Text } from '@ln/common-ui-text';

// TODO: Estas secciones son a modo orientativo, pueden cambiar en base a definiciones de producto.
const pageBuilderSections = ['Apertura', 'Bloque-1'];

// TODO: Layout base, ira cambiando segun vaya avanzando el layout final

// TODO: Validar si no tienen suscripcion, deberia redirigiar al login / paywall
const RecetarioFoodit = ({ children }) => {
    const [opening, bloque1] = children;

    return (
        <BaseLayout>
            <div className="flex flex-column gap-32">
                <section>
                    {/* TODO: Agregar breadcrumbs */}
                    <Text
                        as="h1"
                        className="prumo prumo-semibold text-28 text-40_md text-48_lg"
                    >
                        Mis recetas
                    </Text>
                </section>
                <RecetarioBody />
            </div>
            <DrawerRecetario />
        </BaseLayout>
    );
};

RecetarioFoodit.sections = pageBuilderSections;

export default RecetarioFoodit;
