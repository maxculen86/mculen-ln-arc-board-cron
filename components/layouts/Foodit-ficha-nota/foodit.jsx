import React from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';

import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import StaticContent from '../../private/common/staticContent';
import ActionsButtons from '../../features/foodit-global/common/ActionsButtons/foodit';
import Epigraph from '../../features/foodit-global/common/epigraph/foodit';
import { OpeningStorytelling } from '../../features/foodit-global/common/OpeningStorytelling/foodit';
import { Note } from '@ln/foodit-ui-note';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';

import getAuthorsAsString from '../../private/common/utils/getAuthorsAsString';
import get from '../../private/common/utils/get';
import IconSprite from '../../features/private-global/common/iconSprite/IconSprite';

const pageBuilderSections = ['Cuerpo', 'Bottom'];

const FichaNotaFoodit = ({ children = [], globalContent = {} }) => {
    const [body, bottom] = children;
    const { promo_items, headlines, subheadlines } = globalContent;
    const video = Boolean(promo_items && promo_items.video_jw);

    const title = get(headlines, 'basic', '');
    const subtitle = get(subheadlines, 'basic', '');
    const author = getAuthorsAsString(globalContent);
    const credits = getAuthorsAsString(
        get(promo_items, (video && 'video_jw') || 'basic', {}),
        true
    );

    return (
        <BaseLayout>
            <div className="flex flex-column">
                <div
                    className={`note-media-container w-100vw as-center ratio-unset_lg overflow-hidden ${
                        video ? 'ratio-16-9' : 'ratio-3-2'
                    }`}
                >
                    {video ? (
                        <OpeningStorytelling article={globalContent} />
                    ) : (
                        <StaticContent className="hidden h-100 w-100">
                            <OpeningStorytelling article={globalContent} />
                        </StaticContent>
                    )}
                </div>
                <div className="note-body row-gap-32 z-1">
                    <section className="content note-article-container bg-light-1 pt-16 pt-24_md pt-32_lg pb-24 cuerpo__nota">
                        <Note>
                            <Note.Body>
                                <Epigraph credits={credits} caption={title} />
                                <hr />
                                <div className="flex flex-column gap-12">
                                    <Text className="prumo prumo-book text-28 text-40_md text-48_lg">
                                        {title}
                                    </Text>
                                    {subtitle && (
                                        <Text className="text-18 text-20_md">
                                            {subtitle}
                                        </Text>
                                    )}
                                </div>
                                <Text className="text-14">{author}</Text>
                            </Note.Body>
                            <Note.Footer>
                                <Button
                                    title="Guardar"
                                    size={{ sm: 32, lg: 40 }}
                                >
                                    <Icon size={16} className="sm-none">
                                        <IconSprite name="bookmark" critical />
                                    </Icon>
                                    Guardar
                                </Button>
                                <hr className="h-100 lg-only" />
                                <div className="flex ai-center gap-16 gap-24_md">
                                    <ActionsButtons article={globalContent} />
                                </div>
                            </Note.Footer>
                        </Note>
                    </section>
                    {body}
                </div>
            </div>
            <section className="flex flex-column gap-40">{bottom}</section>
        </BaseLayout>
    );
};

FichaNotaFoodit.sections = pageBuilderSections;

FichaNotaFoodit.propTypes = {
    children: PropTypes.array,
    globalContent: PropTypes.object
};

export default Consumer(FichaNotaFoodit);
