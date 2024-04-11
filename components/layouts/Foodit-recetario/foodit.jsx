import React from 'react';

import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import DrawerRecetario from '../../features/foodit-global/common/drawerRecetario/foodit';
import RecetarioBody from '../../features/foodit-global/common/recetario/RecetarioBody';
import BreadcrumbCustomFoodit from '../../features/foodit-global/common/breadcrumb/_childrens/BreadcrumbCustom/foodit';
import { Text } from '@ln/common-ui-text';

// TODO: Estas secciones son a modo orientativo, pueden cambiar en base a definiciones de producto.
const pageBuilderSections = ['Apertura', 'Bloque-1'];

// TODO: Validar si no tienen suscripcion, deberia redirigiar al login / paywall
const RecetarioFoodit = ({ children }) => {
    return (
        <BaseLayout>
            <div className="flex flex-column gap-32">
                <section className="flex flex-column gap-24">
                    <BreadcrumbCustomFoodit
                        sectionsCustom={[
                            { name: 'Mis recetas', url: '/recetario/' }
                        ]}
                    />
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
