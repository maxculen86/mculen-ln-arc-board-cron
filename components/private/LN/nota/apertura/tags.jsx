import React from 'react';
import PropTypes from 'fusion:prop-types';
import TaxonomyComponent from '../../common/taxonomyImportantList';

// TODO: este componente deberia ser el que tiene el titulo de "Recetas con:"
const Tags = ({ tags, destacado, temas }) => {
    const listTags = tags.map(x => {
        return {
            path: x.slug,
            text: x.text
        };
    });
    return (
        <>
            {temas ? (
                <div className="row">
                    <div className="col-12">
                        {listTags.length > 0 && (
                            <h4 className="com-subtitle_list">Temas</h4>
                        )}
                        {listTags ? (
                            <TaxonomyComponent
                                list={listTags}
                                destacado={destacado}
                                type="tag"
                            />
                        ) : null}
                    </div>
                </div>
            ) : (
                <TaxonomyComponent
                    list={listTags}
                    destacado={destacado}
                    type="tag"
                />
            )}
        </>
    );
};

Tags.propTypes = {
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string,
            slug: PropTypes.string,
            text: PropTypes.string
        })
    ).isRequired,
    destacado: PropTypes.boolean.isRequired,
    temas: PropTypes.boolean
};

export default Tags;
