import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@ln/common-ui-text';
import { useAppContext } from 'fusion:context';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { UserBookmarks } from '../../features/foodit-global/common/bookmark/components/UserBookmarks';
import { getPageTitleFromUrl } from './_helpers';
import { CardCategory } from './Card/CardCategory';
import BreadcrumbCustomFoodit from '../../features/foodit-global/common/breadcrumb/_childrens/BreadcrumbCustom/foodit';

const pageBuilderSections = ['Apertura', 'Notas'];

function Subcategories({ children }) {
    const { requestUri } = useAppContext();

    const [, notas] = children;

    const pageTitle = getPageTitleFromUrl(requestUri);

    const getSubtitle = () => {
        if (pageTitle === 'Cociná a tu medida') {
            return (
                <Text
                    as="p"
                    className="roboto roboto-regular text-16 text-light-600"
                >
                    Organizá tus comidas con menús de nutricionistas y recetas
                    variadas para cada alimentación
                </Text>
            );
        }
        return null;
    };

    return (
        <BaseLayout>
            <UserBookmarks />
            <div className="flex flex-column gap-32">
                <section className="flex flex-column">
                    <BreadcrumbCustomFoodit
                        className="mb-24"
                        sectionsCustom={[
                            {
                                name: pageTitle,
                                url: requestUri
                            }
                        ]}
                    />
                    <div className="flex flex-column gap-16">
                        <Text
                            as="h1"
                            className="prumo prumo-semibold text-28 text-40_md text-48_lg min-w-fit"
                        >
                            {pageTitle}
                        </Text>
                        {getSubtitle()}
                    </div>
                </section>
                <section className="flex flex-column gap-64_lg">
                    <div className="flex flex-column gap-32">
                        <CardCategory />
                    </div>
                    <div className="lg-only flex flex-column gap-40">
                        {notas}
                    </div>
                </section>
            </div>
        </BaseLayout>
    );
}

Subcategories.propTypes = {
    children: PropTypes.node.isRequired
};

Subcategories.sections = pageBuilderSections;

export default Subcategories;
