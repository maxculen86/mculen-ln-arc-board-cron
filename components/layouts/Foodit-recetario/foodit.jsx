import React from 'react';

import { Text } from '@ln/common-ui-text';
import Static from 'fusion:static';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import RecetarioBody from '../../features/foodit-global/common/recetario/RecetarioBody';
import BreadcrumbCustomFoodit from '../../features/foodit-global/common/breadcrumb/_childrens/BreadcrumbCustom/foodit';

const pageBuilderSections = ['Apertura', 'Bloque-1'];

function RecetarioFoodit() {
    return (
        <BaseLayout>
            <div className="flex flex-column gap-32 min-h-50dvh">
                <Static htmlOnly persistent id="recetario-foodit-header">
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
                </Static>
                <RecetarioBody />
            </div>
        </BaseLayout>
    );
}

RecetarioFoodit.sections = pageBuilderSections;

export default RecetarioFoodit;
