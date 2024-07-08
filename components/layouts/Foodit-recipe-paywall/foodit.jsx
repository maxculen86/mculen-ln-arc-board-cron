import React from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { RecipeSchema } from '../../features/foodit-global/schemas/Recipe';
import { BreadcrumbSchema } from '../../features/foodit-global/schemas/Breadcrumb';
import { getBreadcrumbSections } from '../../features/foodit-global/common/breadcrumb/_helpers';

const FooditRecipePaywallLayout = ({ children = [], globalContent = {} }) => {
    const [body] = children;

    return (
        <BaseLayout>
            <RecipeSchema article={globalContent} />
            <BreadcrumbSchema sections={getBreadcrumbSections(globalContent)} />
            <div>Paywall</div>
        </BaseLayout>
    );
};

FooditRecipePaywallLayout.sections = ['Cuerpo'];

FooditRecipePaywallLayout.propTypes = {
    children: PropTypes.array,
    globalContent: PropTypes.object
};

export default Consumer(FooditRecipePaywallLayout);
