import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import { Note } from '@ln/foodit-ui-note';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { ActionsButtons } from '../../features/foodit-global/common/ActionsButtons/foodit';
import { OpeningStorytelling } from '../../features/foodit-global/common/OpeningStorytelling/foodit';
import get from '../../private/common/utils/get';
import IconSprite from '../../features/private-global/common/iconSprite/IconSprite';
import { getFooditAuthor } from '../../features/foodit-global/common/utils/notaFooditHelper';
import FooditMiniWall from '../../features/foodit-global/common/MiniWall/foodit';

const pageBuilderSections = ['Cuerpo', 'Bottom'];

function FooditNotePaywallLayout({ children = [], globalContent = {} }) {
    const [body] = children;
    const { headlines, subheadlines, _id } = globalContent;

    const title = get(headlines, 'basic', '');
    const subtitle = get(subheadlines, 'basic', '');

    return (
        <BaseLayout>
            <div className="flex flex-column">
                <div className="note-media-container w-100vw as-center ratio-unset_lg overflow-hidden ratio-3-2">
                    <div className="hidden h-100 w-100">
                        <OpeningStorytelling
                            article={globalContent}
                            isPrivate
                        />
                    </div>
                </div>
                <div className="note-body row-gap-32 z-1">
                    <section className="content note-article-container bg-light-1 pt-16 pt-24_md pt-32_lg pb-24 cuerpo__nota">
                        <Note>
                            <Note.Body>
                                <div className="flex flex-column gap-12">
                                    <Text
                                        className="prumo prumo-book text-28 text-40_md text-48_lg"
                                        as="h1"
                                    >
                                        {title}
                                    </Text>
                                    {subtitle && (
                                        <Text
                                            className="text-18 text-20_md"
                                            as="h2"
                                        >
                                            {subtitle}
                                        </Text>
                                    )}
                                </div>
                                <Static
                                    htmlOnly
                                    persistent
                                    id="author-ficha-nota"
                                >
                                    <Text className="text-14">
                                        {getFooditAuthor(globalContent, true)}
                                    </Text>
                                </Static>
                            </Note.Body>
                            <Note.Footer>
                                <Static id={`btn-saved-${_id}`}>
                                    <Button
                                        title="Guardar"
                                        size={{ sm: 32, lg: 40 }}
                                        data-id={_id}
                                        data-modal="open-modal"
                                    >
                                        <Icon size={16} className="sm-none">
                                            <IconSprite
                                                name="bookmark"
                                                critical
                                            />
                                        </Icon>
                                        Guardar
                                    </Button>
                                </Static>
                                <hr className="h-100 lg-only" />
                                <div className="flex ai-center gap-16 gap-24_md">
                                    <ActionsButtons
                                        article={globalContent}
                                        printButtonType="regular"
                                    />
                                </div>
                            </Note.Footer>
                        </Note>
                    </section>
                    {body}
                </div>
            </div>
            <div className="flex flex-column w-100vw as-center">
                <FooditMiniWall />
            </div>
        </BaseLayout>
    );
}

FooditNotePaywallLayout.sections = pageBuilderSections;

export default Consumer(FooditNotePaywallLayout);
