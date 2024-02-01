import React from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';

import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import OpeningRecipe from '../../features/foodit-global/common/OpeningRecipe/foodit';
import PowerupsReceta from '../../features/foodit-global/Body/PowerupsReceta/foodit';
import Subtitle from '../../features/foodit-global/common/subtitle/foodit';

const pageBuilderSections = ['Cuerpo', 'Bottom'];

const FichaRecetaFoodit = ({ children = [], globalContent = {} }) => {
    const [body, bottom] = children;

    return (
        <BaseLayout>
            <OpeningRecipe article={globalContent} />
            <Subtitle globalContent={globalContent} calssName="lg-none" />
            <section className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg row-gap-40 cuerpo__nota">
                <div className="col-span-8 col-span-4_md col-span-5_lg flex flex-column gap-32">
                    <PowerupsReceta article={globalContent} />
                </div>
                <div className="col-span-1_md sm-none" />
                <div className="col-span-8 col-span-7_md col-span-10_lg flex flex-column gap-32">
                    <Subtitle
                        globalContent={globalContent}
                        calssName="lg-only"
                    />
                    {body}
                </div>
            </section>
            <section>{bottom}</section>
        </BaseLayout>
    );
};

FichaRecetaFoodit.sections = pageBuilderSections;

FichaRecetaFoodit.propTypes = {
    children: PropTypes.array,
    globalContent: PropTypes.object
};

export default Consumer(FichaRecetaFoodit);
