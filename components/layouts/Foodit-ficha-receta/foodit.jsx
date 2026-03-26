import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { OpeningRecipe } from '../../features/foodit-global/common/OpeningRecipe/foodit';
import { PowerupsReceta } from '../../features/foodit-global/Body/PowerupsReceta/foodit';
import Subtitle from '../../features/foodit-global/common/subtitle/foodit';
import { UserBookmarks } from '../../features/foodit-global/common/bookmark/components/UserBookmarks';
import Breadcrumb from '../../features/foodit-global/common/breadcrumb/foodit';
import RelatedContent from '../../features/foodit/RelatedContent/foodit';
import { NutritionalInfo } from '../../features/foodit-global/common/nutritionalInfo/foodit';
import { AIImageDisclaimer } from '../../features/foodit-global/common/AIImageDisclaimer/foodit';
import { BannersFoodit } from '../../features/foodit-global/Banners/foodit';
import { NewsletterFoodit } from '../../features/foodit-global/common/Newsletter/foodit';

const pageBuilderSections = ['Cuerpo', 'Bottom'];

function FichaRecetaFoodit({ children = [], globalContent = {} }) {
    const [body, bottom] = children;

    return (
        <BaseLayout>
            <UserBookmarks />
            {BannersFoodit.modal_1x1()}
            <section className="flex flex-column gap-24">
                <Breadcrumb globalContent={globalContent} className="lg-only" />
                <OpeningRecipe article={globalContent} />
            </section>
            <div className="-mb-16 lg-none">
                <Breadcrumb globalContent={globalContent} />
            </div>
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
                    <AIImageDisclaimer globalContent={globalContent} />
                </div>
            </section>
            <div className="print-hide flex flex-column gap-40">
                <NutritionalInfo globalContent={globalContent} />
                <hr className="sm-none" />
                <RelatedContent globalContent={globalContent} />
                <NewsletterFoodit />
                <section className="flex flex-column gap-40">{bottom}</section>
            </div>
        </BaseLayout>
    );
}

FichaRecetaFoodit.sections = pageBuilderSections;

export default Consumer(FichaRecetaFoodit);
