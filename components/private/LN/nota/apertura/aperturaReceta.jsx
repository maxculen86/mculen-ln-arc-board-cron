import React from 'react';
import PropTypes from 'fusion:prop-types';
import TituloNota from './tituloNota';
import Breadcrumb from './breadcrumb';
import Tags from './tags';
import Sections from './sections';
import BajadaNota from './bajadaNota';
import AuthorNota from './authorNota';

const AperturaReceta = props => {
    const {
        globalContent: {
            taxonomy,
            taxonomy: { tags },
            headlines,
            subheadlines,
            credits: { by }
        }
    } = props;
    const destacado = true;
    return (
        <div>
            <Breadcrumb {...props} />
            <TituloNota titulo={headlines} />
            <Sections taxonomy={taxonomy} destacado={destacado} />
            <BajadaNota subheadlines={subheadlines} />
            <Tags tags={tags} destacado={false} />
            <AuthorNota author={by} />
        </div>
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
        }).isRequired
    }).isRequired
};

export default AperturaReceta;
