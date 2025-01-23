import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
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
    const { _id: id } = globalContent;
    const renderAcu =
        id === '/tema' ? <AcuTema globalContent={globalContent} /> : notas;

    const mockLinks = [
        { href: '/link1', title: 'Tortas' },
        { href: '/link2', title: 'Postres' },
        { href: '/link3', title: 'Panqueques' },
        { href: '/link4', title: 'Budines' },
        { href: '/link5', title: 'tartas' },
        { href: '/link6', title: 'helados' },
        { href: '/link7', title: 'batidos' }
    ];

    return (
        <BaseLayout>
            <UserBookmarks />
            <div className="flex flex-column gap-32">
                <section className="flex flex-column gap-24">
                    <BreadcrumbFoodit globalContent={globalContent} />
                    <div className="flex flex-column flex-row_md gap-16 gap-24_md">
                        <Text
                            as="h1"
                            className="prumo prumo-semibold text-28 text-40_md text-48_lg"
                        >
                            {getFooditAcuTitle(globalContent)}
                        </Text>
                        <TagCategories mockLinks={mockLinks} />
                    </div>
                </section>
                <section className="grid gap-32">{renderAcu}</section>
            </div>
        </BaseLayout>
    );
}

AcumuladoFoodit.propTypes = {
    children: PropTypes.node.isRequired,
    globalContent: PropTypes.object.isRequired
};
AcumuladoFoodit.sections = pageBuilderSections;

export default Consumer(AcumuladoFoodit);
