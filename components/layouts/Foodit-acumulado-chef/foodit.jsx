import React from 'react';
import Consumer from 'fusion:consumer';
import BreadcrumbCustomFoodit from '../../features/foodit-global/common/breadcrumb/_childrens/BreadcrumbCustom/foodit';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { Text } from '@ln/common-ui-text';
import StaticContent from '../../private/common/staticContent';

const pageBuilderSections = ['Apertura', 'Chefs'];

const AcumuladoChefFoodit = ({ children }) => {
    const [apertura, chefs] = children;

    return (
        <BaseLayout>
            <StaticContent>
                <div className="flex flex-column gap-32">
                    <section className="flex flex-column gap-24">
                        <BreadcrumbCustomFoodit
                            sectionsCustom={[
                                {
                                    name: 'Chefs protagonistas',
                                    url: `/chefs-protagonistas/`
                                }
                            ]}
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
            </StaticContent>
        </BaseLayout>
    );
};

AcumuladoChefFoodit.sections = pageBuilderSections;

export default Consumer(AcumuladoChefFoodit);
