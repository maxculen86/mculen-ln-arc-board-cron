/* eslint-disable camelcase */
import React, { Fragment } from 'react';
import PropTypes from 'fusion:prop-types';
import { formatRelative, subDays } from 'date-fns';
import { es } from 'date-fns/locale';
import Tags from './tags';
import Sections from './sections';
import BajadaNota from './bajadaNota';
import AuthorNota from './authorNota';
import ArticleImage from '../articleImage';
import ListItems from './listItems';

const AperturaReceta = props => {
    const {
        globalContent: {
            taxonomy,
            taxonomy: { tags },
            subheadlines,
            credits: { by },
            imageResizePresets,
            promo_items,
            content_elements
        }
    } = props;
    const destacado = true;

    /** TODO: siguiente codigo corresponde a
     * la logica del container. */
    const listIngredientes = content_elements
        ? content_elements.filter(ce => ce.subtype === 'custom-ingrediente')
        : [];

    const listPreparacion = content_elements
        ? content_elements.filter(ce => ce.subtype === 'custom-preparacion')
        : [];

    return (
        <Fragment>
            <section className="col-desksm-8 cont-figure">
                {/* TODO: reemplazar por destacado.jsx */}
                <ArticleImage
                    imageResizePresets={imageResizePresets}
                    image={promo_items.basic}
                    zoom
                />
            </section>
            <div className="col-desksm-4 cont-aper">
                <Sections taxonomy={taxonomy} destacado={destacado} />
                {/* Porciones y tiempo */}
                <Tags tags={tags} destacado={false} />
            </div>
            <BajadaNota subheadlines={subheadlines} />
            <AuthorNota authors={by} />

            {/* TODO: falta componte de cuerpo */}
            {/** Usar el siguiente bucle para validar si hay 
            elementos por renderizar y renderizar lista de ingredientes */}
            {listIngredientes.length !== 0 && (
                <div className="ce-ingredientes">
                    <h2>Ingredientes</h2>
                    {listIngredientes.map(list => (
                        <ListItems
                            list={list.embed.config.items}
                            titleList={list.embed.config.titleList}
                        />
                    ))}
                </div>
            )}
            {/* TODO: falta componte de cuerpo 
                Usar el siguiente bucle para validar si hay 
                elementos por renderizar y renderizar lista de preparación */}
            {listPreparacion.length !== 0 && (
                <div className="ce-preparaciones">
                    <h2>Preparación</h2>
                    {listPreparacion.map(list => (
                        <ListItems
                            list={list.embed.config.items}
                            titleList={list.embed.config.titleList}
                            listNumeric="true"
                        />
                    ))}
                </div>
            )}
        </Fragment>
    );
};

AperturaReceta.propTypes = {
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    description: PropTypes.string,
                    slug: PropTypes.string,
                    text: PropTypes.string
                })
            ).isRequired
        }),
        headlines: PropTypes.object.isRequired,
        subheadlines: PropTypes.object.isRequired,
        credits: PropTypes.shape({
            by: PropTypes.array
        }).isRequired,
        imageResizePresets: PropTypes.object.isRequired,
        promo_items: PropTypes.object.isRequired,
        content_elements: PropTypes.array.isRequired
    }).isRequired
};

export default AperturaReceta;
