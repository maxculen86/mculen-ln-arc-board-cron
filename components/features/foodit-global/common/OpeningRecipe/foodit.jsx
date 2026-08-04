import React from 'react';
import Static from 'fusion:static';
import { Text } from '@ln/common-ui-text';
import { Recipe } from '@ln/foodit-ui-recipe';
import { Image } from '@ln/foodit-ui-image';
import { Badge } from '@ln/foodit-ui-badge';

import { useDisclosure } from '@ln/hooks';
import ButtonsGroup from '../ActionsButtons/foodit';
import VideoPlayer from '../../../private-global/common/videoPlayer/foodit';

import {
    getFooditAuthor,
    getHighestPriorityTag
} from '../utils/notaFooditHelper';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import get from '../../../../private/common/utils/get';
import replaceBaseUrl from '../utils/replaceBaseUrl';
import getImageAltText from '../utils/getImageAltText';
import MenuSemanalDialog from '../MenuSemanal/components/MenuSemanalDialog';
import { useGetWeeklyMenu } from '../MenuSemanal/hooks/useGetWeeklyMenu';
import useGetUserConfig from '../../hooks/useGetUserConfig';
import { getMealTotalById } from '../MenuSemanal/helpers/_helper';
import { RecipeActionsDropdown } from './recipeActionsDropdown';
import { CookMode } from './cookMode/foodit';

export function OpeningRecipe({ article = {}, isPrivate = false }) {
    const {
        promo_items: promoItems = {},
        headlines = {},
        taxonomy,
        _id: articleId
    } = article;

    const sections = get(taxonomy, 'sections', []);
    const badge = getHighestPriorityTag(sections);
    const title = get(headlines, 'basic', '');

    const videoJW = get(promoItems, 'video_jw', null);
    const imageData = get(promoItems, 'basic', {});
    const { resized_urls: resizedUrls = [], url = '' } =
        replaceBaseUrl(imageData);

    const { resizedUrl = '' } = getShortestImage(resizedUrls);
    const { isOpen, onOpen, onClose } = useDisclosure(false);
    const { isSubscribed: subscription } = useGetUserConfig();

    const { weeklyMenu, setWeeklyMenu } = useGetWeeklyMenu(subscription);

    const { total } = getMealTotalById(articleId, weeklyMenu);

    return (
        <Recipe>
            <Recipe.Media>
                {!isPrivate && videoJW ? (
                    <Static id="opening-media-recipe">
                        <VideoPlayer
                            data={videoJW}
                            tituloNota={title}
                            className="w-100 ratio-16-9"
                        />
                    </Static>
                ) : (
                    <Image
                        alt={getImageAltText({ ...imageData, title })}
                        src={resizedUrl || url}
                        className="w-100 ratio-3-2"
                        fetchPriority="high"
                        loading="eager"
                        sources={getImagesToLoadWithPicture(false, resizedUrls)}
                    />
                )}
                {badge && (
                    <Badge className="lg-none absolute bottom-0 left-0 m-8">
                        {badge}
                    </Badge>
                )}
            </Recipe.Media>
            <Recipe.Body>
                <div className="flex flex-column ai-start gap-12">
                    {badge && <Badge className="lg-only">{badge}</Badge>}
                    <div className="flex flex-column ai-start gap-16">
                        <Text
                            className="prumo prumo-black text-28 text-40_md text-48_lg"
                            text={get(headlines, 'basic', '')}
                            as="h1"
                        />
                        <Text
                            className="text-14"
                            text={getFooditAuthor(article)}
                            as="h3"
                        />
                    </div>
                </div>
                <div className="flex flex-column gap-24">
                    <div className="flex gap-24">
                        <RecipeActionsDropdown
                            handleOpen={onOpen}
                            countDayFood={total}
                            article={article}
                        />
                        <MenuSemanalDialog
                            weeklyMenu={weeklyMenu}
                            setWeeklyMenu={setWeeklyMenu}
                            isOpen={isOpen}
                            onClose={onClose}
                            article={article}
                        />
                    </div>
                    <div className="flex flex-column flex-column_lg gap-24 jc-between_md">
                        <CookMode title={title} article={article} />
                        <div className="flex ai-center gap-16 gap-24_md">
                            {article && (
                                <ButtonsGroup
                                    article={article}
                                    isPrivate={isPrivate}
                                    printButtonType="printButton"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Recipe.Body>
        </Recipe>
    );
}

export default OpeningRecipe;
