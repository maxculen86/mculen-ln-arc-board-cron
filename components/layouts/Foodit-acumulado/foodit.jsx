import React from 'react';
import Consumer from 'fusion:consumer';
import BreadcrumbFoodit from '../../features/foodit-global/common/breadcrumb/foodit';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { Text } from '@ln/common-ui-text';
import { formatSectionName } from '../../features/foodit-global/common/breadcrumb/_helpers';
import { UserBookmarks } from '../../features/foodit-global/common/bookmark/components/UserBookmarks';

const pageBuilderSections = ['Apertura', 'Notas'];

const AcumuladoFoodit = props => {
    const { globalContent, children } = props;
    const { _id: id = '' } = globalContent;
    const title = formatSectionName(id, true);
    const [apertura, notas] = children;

    return (
        <BaseLayout>
            <UserBookmarks />
            <div className="flex flex-column gap-32">
                <section className="flex flex-column gap-24">
                    <BreadcrumbFoodit globalContent={globalContent} />
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
