import React from 'react';
import Static from 'fusion:static';
import Consumer from 'fusion:consumer';

import { Text } from '@ln/common-ui-text';
import BreadcrumbCustomFoodit from '../../features/foodit-global/common/breadcrumb/_childrens/BreadcrumbCustom/foodit';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';

const pageBuilderSections = ['Apertura', 'Chefs'];

function AcumuladoChefFoodit({ children }) {
    const [, chefs] = children;
    const sectionsCustom = [
        {
            name: 'Recetas',
            url: `/recetas/`
        },
        {
            name: 'Chefs protagonistas',
            url: `/chefs-protagonistas/`
        }
    ];

    return (
        <BaseLayout>
            <Static id="acu-chefs-protagonistas">
                <div className="flex flex-column gap-32">
                    <section className="flex flex-column gap-24">
                        <BreadcrumbCustomFoodit
                            sectionsCustom={sectionsCustom}
                        />
                        <Text
                            as="h1"
                            className="prumo prumo-semibold text-28 text-40_md text-48_lg floating-button-sentinel"
                        >
                            Chefs protagonistas
                        </Text>
                    </section>
                    <section className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32">
                        {chefs}
                    </section>
                </div>
            </Static>
        </BaseLayout>
    );
}

AcumuladoChefFoodit.sections = pageBuilderSections;

export default Consumer(AcumuladoChefFoodit);
