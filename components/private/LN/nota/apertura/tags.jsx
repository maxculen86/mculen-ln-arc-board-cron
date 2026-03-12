import React from 'react';
import TaxonomyComponent from '../../common/taxonomyImportantList';
import HeaderSection from '../../../common/mod-headerSection';

const getSectionsAsTags = sections =>
    sections && sections.length > 0
        ? sections
              .filter(
                  section =>
                      section.name !== '' &&
                      section.name !== sections[0].name &&
                      sections[0].parent_id !== section.path &&
                      !sections[0].parent_id
                          .split('/')
                          .filter(v => v !== '')
                          .includes(section.path?.replace('/', ''))
              )
              .reduce(
                  (accumulator, section) => [
                      ...accumulator,
                      ...[
                          {
                              type: section.type,
                              slug: section.path,
                              text: section.name
                          }
                      ]
                  ],
                  []
              )
        : [];

function Tags({ tags = [], sections, destacado, temas, showItems }) {
    const categories = getSectionsAsTags(sections);

    const listTags = categories.concat(tags).map(x => ({
        type: x.type || 'tag',
        path: x.slug,
        text: x.text
    }));

    if (temas) {
        return (
            <div className="row" data-mrf-recirculation="n_temas">
                <div className="col-12">
                    {listTags.length > 0 && (
                        <HeaderSection tag="h3" title="Temas" line={false} />
                    )}
                    {listTags && (
                        <TaxonomyComponent
                            list={listTags}
                            destacado={destacado}
                            collapsible
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <TaxonomyComponent
            list={listTags.map(item => ({
                ...item,
                text: `Recetas con ${item.text}`
            }))}
            destacado={destacado}
            showItems={showItems}
        />
    );
}

export default Tags;
