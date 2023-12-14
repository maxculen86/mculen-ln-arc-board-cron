import React from 'react';
import PropTypes from 'prop-types';

import Consumer from 'fusion:consumer';

import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import OpeningStorytelling from '../../features/foodit-global/common/OpeningStorytelling/foodit';
import StaticContent from '../../private/common/staticContent';
import Epigraph from '../../features/foodit-global/common/epigraph/foodit';
import { Note } from '@ln/foodit-ui-note';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Bookmark } from '@ln/foodit-ui-assets';

const pageBuilderSections = [
    'Pre-titulo',
    'Left-Cuerpo',
    'Cuerpo',
    'Tercera',
    'Bottom'
];

const FichaNotaFoodit = ({ children = [], globalContent = {} }) => {
    const [preTitle, leftBody, body, third, bottom] = children;
    const { promo_items } = globalContent;
    const video = Boolean(promo_items && promo_items.video_jw);

    // TODO: obtener créditos de la imagen/video para el componente <Epigraph />
    // TODO: obtener título, bajada, autor para el componente <Note />
    return (
        <BaseLayout>
            {/* <section>{preTitle}</section> */}
            <div className="flex flex-column">
                <div className="note-media-container w-100vw as-center">
                    {video ? (
                        <OpeningStorytelling article={globalContent} />
                    ) : (
                        <StaticContent>
                            <OpeningStorytelling article={globalContent} />
                        </StaticContent>
                    )}
                </div>
                <div className="note-body row-gap-32 z-1">
                    <section className="content note-article-container bg-light-1 pt-16 pt-24_md pt-32_lg mb-24">
                        <Note>
                            <Note.Body>
                                <Epigraph credits="CREDITOS" caption="TITULO" />
                                <hr />
                                <div className="flex flex-column gap-12">
                                    <Text className="prumo prumo-book text-28 text-40_md text-48_lg">
                                        TITLE
                                    </Text>
                                    {true && (
                                        <Text className="text-18 text-20_md">
                                            BAJADA
                                        </Text>
                                    )}
                                </div>
                                <Text className="text-14">AUTHOR</Text>
                            </Note.Body>
                            <Note.Footer>
                                <Button
                                    title="Guardar"
                                    size={{ sm: 32, lg: 40 }}
                                >
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
                                    {/* TODO: Incorporar el componente Share */}
                                    <Button title="Comentar" variant="link">
                                        <Icon size={24}>
                                            <Bookmark />
                                        </Icon>
                                    </Button>
                                </div>
                            </Note.Footer>
                        </Note>
                    </section>
                    {/* TODO: los componentes del body deben estar wrappeados en un section o div con className='content | full-width' */}
                    {body}
                </div>
            </div>
            {/* <section>{leftBody}</section>
            <section className="cuerpo__nota">{body}</section>
            <section>{third}</section>
            <section>{bottom}</section> */}
        </BaseLayout>
    );
};

FichaNotaFoodit.sections = pageBuilderSections;

FichaNotaFoodit.propTypes = {
    children: PropTypes.array,
    globalContent: PropTypes.object
};

export default Consumer(FichaNotaFoodit);
