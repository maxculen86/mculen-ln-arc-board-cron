// Migrated from: components/layouts/Foodit-acumulado/foodit.jsx
// Migration date: 2026-06-10
// Strategy: strategic fork — diverges from the monolith intentionally, do not merge back.
import React from 'react';
import Consumer from 'fusion:consumer';
import { Text } from '@ln/common-ui-text';
import BreadcrumbFoodit from '../../features/foodit-global/common/breadcrumb/foodit';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { getFooditAcuTitle } from '../../features/foodit-global/common/breadcrumb/_helpers';
import { UserBookmarks } from '../../features/foodit-global/common/bookmark/components/UserBookmarks';
import AcuTema from '../../features/foodit-global/common/AcuTema/foodit';
import { TagCategories } from '../../features/foodit-global/common/TagCategories/foodit';

const pageBuilderSections = ['Apertura', 'Notas'];

function AcumuladoFoodit(props) {
    const { globalContent = {}, children } = props;

    const [, notas] = children;
    const { _id: id, children: childrenContent = [] } = globalContent;

    const tagCategories = childrenContent
        .map(({ _id = '', name = '' }) => ({
            href: `${_id}/`,
            title: name
        }))
        .sort((a, b) => a?.title.localeCompare(b?.title));

    const renderAcu =
        id === '/tema' ? <AcuTema globalContent={globalContent} /> : notas;

    return (
        <BaseLayout>
            <UserBookmarks />
            <div className="flex flex-column gap-32">
                <section className="flex flex-column gap-24">
                    <BreadcrumbFoodit globalContent={globalContent} />
                    <div className="flex flex-column gap-16 gap-24_md">
                        <Text
                            as="h1"
                            className="prumo prumo-semibold text-28 text-40_md text-48_lg min-w-fit"
                        >
                            {getFooditAcuTitle(globalContent)}
                        </Text>
                        <TagCategories tagLinks={tagCategories} />
                    </div>
                </section>
                <section className="flex flex-column gap-40">
                    {renderAcu}
                </section>
            </div>
        </BaseLayout>
    );
}

AcumuladoFoodit.sections = pageBuilderSections;

export default Consumer(AcumuladoFoodit);
