import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { OpeningRecipe } from '../../features/foodit-global/common/OpeningRecipe/foodit';
import { PowerupsReceta } from '../../features/foodit-global/Body/PowerupsReceta/foodit';
import Subtitle from '../../features/foodit-global/common/subtitle/foodit';
import { UserBookmarks } from '../../features/foodit-global/common/bookmark/components/UserBookmarks';
import Breadcrumb from '../../features/foodit-global/common/breadcrumb/foodit';

const pageBuilderSections = ['Cuerpo', 'Bottom'];

function FichaRecetaFoodit({ children = [], globalContent = {} }) {
    const [body, bottom] = children;

    return (
        <BaseLayout>
            <UserBookmarks />
            <section className="flex flex-column gap-24">
                <Breadcrumb globalContent={globalContent} className="lg-only" />
                <OpeningRecipe article={globalContent} />
            </section>
            <Static htmlOnly persistent id="subtitle-mobile-recipe">
                <Subtitle globalContent={globalContent} calssName="lg-none" />
            </Static>
            <section className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg row-gap-40 cuerpo__nota">
                <div className="col-span-8 col-span-4_md col-span-5_lg flex flex-column gap-40 gap-32_md">
                    <PowerupsReceta article={globalContent} />
                </div>
                <div className="col-span-1_md sm-none" />
                <div className="col-span-8 col-span-7_md col-span-10_lg flex flex-column gap-24">
                    <Static
                        htmlOnly
                        persistent
                        id="opening-body-desktop-recipe"
                    >
                        <Subtitle
                            globalContent={globalContent}
                            calssName="lg-only"
                        />
                    </Static>
                    {body}
                </div>
            </section>
            <Breadcrumb globalContent={globalContent} className="lg-none" />
            <hr className="lg-none" />
            <section className="flex flex-column gap-40">{bottom}</section>
        </BaseLayout>
    );
}

FichaRecetaFoodit.sections = pageBuilderSections;

FichaRecetaFoodit.propTypes = {
    children: PropTypes.array.isRequired,
    globalContent: PropTypes.object.isRequired
};

export default Consumer(FichaRecetaFoodit);
