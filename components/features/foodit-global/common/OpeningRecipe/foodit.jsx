import React from 'react';
import PropTypes from 'prop-types';

import getAuthorsAsString from '../../../../private/common/utils/getAuthorsAsString';
import get from '../../../../private/common/utils/get';

import { Text } from '@ln/common-ui-text';
import { Recipe } from '@ln/foodit-ui-recipe';
import { Image } from '@ln/foodit-ui-image';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';
import { Badge } from '@ln/foodit-ui-badge';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Bookmark, Facebook, Instagram, Twitter } from '@ln/foodit-ui-assets';
import { Dropdown } from '@ln/common-ui-dropdown';
import StaticContent from '../../../../private/common/staticContent';
import VideoPlayer from '../../../private-global/common/videoPlayer/foodit';

export const OpeningRecipe = ({ article = {} }) => {
    const { promo_items = {}, headlines = {}, subheadlines = {} } = article;

    const {
        cookTime = 0,
        prepTime = 0,
        counterTime = 0,
        regions = [],
        cookingTypes = [],
        occasions = []
    } = get(promo_items, 'receta.embed.config', {});

    const author = getAuthorsAsString(article);

    // TODO: Get badge dinamically
    const badge = 'FACIL';
    const videoJW = get(promo_items, 'video_jw', null);

    const Share = () => {
        // TODO: Check if the device has support for native sharing
        const hasNavigator = false;

        if (hasNavigator) {
            // const shareData = { title: 'some title', text: 'some body', url: 'some URL' };
            // const shareFn = () => navigator.share(shareData)
            return (
                <Button title="Compartir" variant="link">
                    <Icon size={24}>
                        <Bookmark />
                    </Icon>
                </Button>
            );
        }

        return (
            <Dropdown hideArrow className="flex">
                <Dropdown.Toggle title="Compartir">
                    <Icon size={24}>
                        <Bookmark />
                    </Icon>
                </Dropdown.Toggle>
                <Dropdown.Menu
                    alignment="center"
                    className="bg-light-1 p-24 rounded-4 shadow-center"
                >
                    <div className="flex ai-center gap-16">
                        <Button
                            title="Compartir por Facebook"
                            variant="link"
                            href="#"
                        >
                            <Icon size={24}>
                                <Facebook />
                            </Icon>
                        </Button>
                        <Button
                            title="Compartir por Instagram"
                            variant="link"
                            href="#"
                        >
                            <Icon size={24}>
                                <Instagram />
                            </Icon>
                        </Button>
                        <Button
                            title="Compartir por Twitter"
                            variant="link"
                            href="#"
                        >
                            <Icon size={24}>
                                <Twitter />
                            </Icon>
                        </Button>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        );
    };
    // TODO: Make a new filter for foodit, the actual filter doesnt have some embed properties
    // TODO: Icons still pending design definitions
    // TODO: Add functions to buttons
    return (
        <>
            <Recipe>
                <Recipe.Media>
                    <StaticContent>
                        {videoJW ? (
                            <VideoPlayer
                                data={videoJW}
                                tituloNota={get(headlines, 'basic', '')}
                                className="w-100 ratio-16-9"
                            />
                        ) : (
                            <Image
                                alt={get(promo_items, 'basic.caption', '')}
                                src={get(promo_items, 'basic.url', '')}
                                className="w-100 ratio-3-2"
                                fetchPriority="high"
                                loading="eager"
                                sources={getImagesToLoadWithPicture(
                                    get(promo_items, 'basic.resized_urls', [])
                                )}
                            />
                        )}
                        {badge && (
                            <Badge className="lg-none absolute bottom-0 left-0 m-8">
                                {badge}
                            </Badge>
                        )}
                    </StaticContent>
                </Recipe.Media>
                <Recipe.Body>
                    <StaticContent>
                        <div className="flex flex-column ai-start gap-12">
                            {badge && (
                                <Badge className="lg-only">{badge}</Badge>
                            )}
                            <div className="flex flex-column ai-start gap-16">
                                <Text
                                    className="prumo prumo-black text-28 text-40_md text-48_lg"
                                    text={get(headlines, 'basic', '')}
                                    as="h1"
                                />
                                <Text
                                    className="text-14"
                                    text={author}
                                    as="h3"
                                />
                            </div>
                        </div>
                        <div className="flex ai-center gap-24">
                            <Button title="Guardar" size={{ sm: 32, lg: 40 }}>
                                <Icon size={16} className="sm-none">
                                    <Bookmark />
                                </Icon>
                                Guardar
                            </Button>
                            <hr className="h-100 lg-only" />
                            <div className="flex ai-center gap-16 gap-24_md">
                                <Button title="Copiar" variant="link">
                                    <Icon size={24}>
                                        <Bookmark />
                                    </Icon>
                                </Button>
                                <Button title="Imprimir" variant="link">
                                    <Icon size={24}>
                                        <Bookmark />
                                    </Icon>
                                </Button>
                                <Share />
                                <Button title="Comentar" variant="link">
                                    <Icon size={24}>
                                        <Bookmark />
                                    </Icon>
                                </Button>
                            </div>
                        </div>
                    </StaticContent>
                </Recipe.Body>
            </Recipe>
        </>
    );
};

OpeningRecipe.propTypes = {
    article: PropTypes.object
};

export default OpeningRecipe;
