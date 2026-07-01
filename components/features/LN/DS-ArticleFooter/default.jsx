import React from 'react';
import { useAppContext } from 'fusion:context';
import { WrapperBody } from '../common/wrapperBody/default';
import { ArticleFooterUi } from '../common/articleFooter/default';
import capitalizeFirstLetter from '../../../private/common/utils/capitalizeFirstLetter';
import get from '../../../private/common/utils/get';
import useTrustProjectData from '../../../private/common/hooks/useTrustProjectData';
import buildDistributorUrl from '../../../private/LN/common/utils/buildDistributorUrl';
import useSiteTooltip from '../../../private/common/hooks/useSiteTooltip';

const buildTagItems = tags =>
    tags.map(({ slug, description }) => {
        const title = capitalizeFirstLetter(description);

        return {
            href: `/tema/${slug}/`,
            title,
            children: title
        };
    });

function ArticleFooter() {
    const { globalContent = {} } = useAppContext();
    const { label, taxonomy = {}, distributor = {} } = globalContent;
    const { tags = [] } = taxonomy;
    const { name: distributorName, subcategory } = distributor;
    const trust = get(label, 'trust.text', null);
    const tooltipData = useSiteTooltip(trust);
    const trustProjectData = useTrustProjectData();

    return (
        <WrapperBody className="mb-24 md:mb-64">
            <ArticleFooterUi>
                <ArticleFooterUi.AuthorAndDescription
                    distributor={distributorName}
                    complementaryText={subcategory}
                    href={buildDistributorUrl(distributorName)}
                />
                <ArticleFooterUi.Tags tags={buildTagItems(tags)} />
                <ArticleFooterUi.Brand />
                <ArticleFooterUi.TheTrustProject {...trustProjectData.image} />
                <ArticleFooterUi.WorkType tooltipData={tooltipData} />
            </ArticleFooterUi>
        </WrapperBody>
    );
}

ArticleFooter.label = 'LN-DS-Pie-de-nota';
export default ArticleFooter;
