import React from 'react';

import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import RecetarioBody from '../../features/foodit-global/common/recetario/RecetarioBody';
import BreadcrumbCustomFoodit from '../../features/foodit-global/common/breadcrumb/_childrens/BreadcrumbCustom/foodit';
import { Text } from '@ln/common-ui-text';

const pageBuilderSections = ['Apertura', 'Bloque-1'];

const RecetarioFoodit = () => {
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
        </BaseLayout>
    );
};

RecetarioFoodit.sections = pageBuilderSections;

export default RecetarioFoodit;
