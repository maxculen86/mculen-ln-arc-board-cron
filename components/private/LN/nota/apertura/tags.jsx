import React from 'react';
import PropTypes from 'fusion:prop-types';
import TaxonomyComponent from '../../common/taxonomyImportantList';
import HeaderSection from '../../../common/mod-headerSection';

const getSectionsAsTags = sections => {
    return sections
        ? sections
              .filter(section => section.name !== '')
              .reduce((accumulator, section, index) => {
                  return [
                      ...accumulator,
                      ...[
                          {
                              type: section.type,
                              slug: section.path,
                              text: section.name
                          }
                      ]
                  ];
              }, [])
        : [];
};

// TODO: este componente deberia ser el que tiene el titulo de "Recetas con:"
const Tags = ({ tags, sections, destacado, temas }) => {
    const categories = getSectionsAsTags(sections);

    const listTags = categories.concat(tags).map(x => {
        return {
            type: x.type || 'tag',
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
                            <HeaderSection tag="h3" title="Temas" />
                        )}
                        {listTags ? (
                            <TaxonomyComponent
                                list={listTags}
                                destacado={destacado}
                            />
                        ) : null}
                    </div>
                </div>
            ) : (
                <TaxonomyComponent list={listTags} destacado={destacado} />
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
    temas: PropTypes.boolean,
    sections: PropTypes.arrayOf(PropTypes.shape)
};

export default Tags;
