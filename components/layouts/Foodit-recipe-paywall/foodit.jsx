import React from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import Subtitle from '../../features/foodit-global/common/subtitle/foodit';
import Breadcrumb from '../../features/foodit-global/common/breadcrumb/foodit';
import { OpeningRecipe } from '../../features/foodit-global/common/OpeningRecipe/foodit';
import { PowerupsRecipePaywall } from '../../features/foodit-global/Body/PowerupsRecipePaywall/foodit';
import FooditMiniWall from '../../features/foodit-global/common/MiniWall/foodit';

function FooditRecipePaywallLayout({ children = [], globalContent = {} }) {
    const [body] = children;

    return (
        <BaseLayout>
            <section className="flex flex-column gap-24">
                <Breadcrumb
                    globalContent={globalContent}
                    className="lg-only"
                    layout="ficha-receta"
                />
                <OpeningRecipe article={globalContent} isPrivate />
            </section>
            <section id="recipe-paywall-body" className="flex flex-column">
                <Static htmlOnly persistent id="recipe-paywall-subtitle">
                    <Subtitle
                        globalContent={globalContent}
                        calssName="lg-none"
                    />
                </Static>
                <div>
                    <Static
                        htmlOnly
                        persistent
                        id="recipe-paywall-body-content"
                    >
                        <section className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg row-gap-40 cuerpo__nota difumination">
                            <div className="col-span-8 col-span-4_md col-span-5_lg flex flex-column gap-40 gap-32_md">
                                <PowerupsRecipePaywall
                                    article={globalContent}
                                />
                            </div>
                            <div className="col-span-1_md sm-none" />
                            <div className="col-span-8 col-span-7_md col-span-10_lg flex flex-column gap-24">
                                <Subtitle
                                    globalContent={globalContent}
                                    calssName="lg-only"
                                />
                                {body}
                            </div>
                        </section>
                    </Static>
                </div>
                <div className="flex flex-column w-100vw as-center">
                    <FooditMiniWall />
                </div>
            </section>
        </BaseLayout>
    );
}

FooditRecipePaywallLayout.sections = ['Cuerpo'];

FooditRecipePaywallLayout.propTypes = {
    children: PropTypes.node.isRequired,
    globalContent: PropTypes.shape({}).isRequired
};

export default Consumer(FooditRecipePaywallLayout);
