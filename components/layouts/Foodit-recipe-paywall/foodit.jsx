import React from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';

const FooditRecipePaywallLayout = ({ children = [], globalContent = {} }) => {
    const [body] = children;

    return (
        <BaseLayout>
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
