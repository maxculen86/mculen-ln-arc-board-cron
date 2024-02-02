import React from 'react';
import Consumer from 'fusion:consumer';

import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { Text } from '@ln/common-ui-text';

const pageBuilderSections = ['Breadcrumb', 'Apertura', 'Notas'];

const AcumuladoFoodit = props => {
    const { globalContent, children } = props;
    const { _id: id = '' } = globalContent;
    const title = id && id.replace(/\//g, ' ').trim();

    const [breadcrumb, apertura, notas] = children;

    return (
        <BaseLayout>
            <div className="flex flex-column gap-32">
                <section>
                    {breadcrumb}
                    <Text
                        as="h1"
                        className="prumo prumo-semibold text-28 text-40_md text-48_lg"
                    >
                        {title}
                    </Text>
                </section>
                {/* TODO: Descomentar si un acumulado lleva apertura */}
                {/* <section>{apertura}</section> */}
                <section className="flex flex-column gap-32">{notas}</section>
            </div>
        </BaseLayout>
    );
};

AcumuladoFoodit.sections = pageBuilderSections;

export default Consumer(AcumuladoFoodit);
