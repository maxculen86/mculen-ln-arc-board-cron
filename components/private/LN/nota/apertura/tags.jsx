import React from 'react';
import PropTypes from 'prop-types';
import TaxonomyComponent from '../../common/taxonomyImportantList';
import HeaderSection from '../../../common/mod-headerSection';

const getSectionsAsTags = sections => {
    return sections && sections.length > 0
        ? sections
              .filter(
                  section =>
                      section.name !== '' &&
                      section.name !== sections[0].name &&
                      sections[0].parent_id !== section.path &&
                      !sections[0].parent_id
                          .split('/')
                          .filter(v => v !== '')
                          .includes(section.path.replace('/', ''))
              )
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
const Tags = ({ tags = [], sections, destacado, temas }) => {
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
                        {listTags && (
                            <TaxonomyComponent
                                list={listTags}
                                destacado={destacado}
                            />
                        )}
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
    ),
    destacado: PropTypes.bool.isRequired,
    temas: PropTypes.bool,
    sections: PropTypes.arrayOf(PropTypes.shape)
};

Tags.defaultProps = {
    temas: false,
    sections: [],
    tags: []
};

export default Tags;
