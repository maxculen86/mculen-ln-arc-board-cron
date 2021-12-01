import React from 'react';
import PropTypes from 'fusion:prop-types';
import TaxonomyComponent from '../../common/taxonomyImportantList';
import { getFirstParentSection } from '../../../common/utils/sectionUtils';
import HeaderSection from '../../../common/mod-headerSection';

const Sections = props => {
    const { taxonomy, destacado, temas } = props;
    const primary = taxonomy.primary_section;

    let listSections = [];
    if (primary) {
        const parentPrimarySection = getFirstParentSection(primary);

        if (parentPrimarySection) {
            listSections = taxonomy.sections.filter(x => {
                const parentSection = getFirstParentSection(x);
                return (
                    parentSection &&
                    parentSection === parentPrimarySection &&
                    x._id !== parentPrimarySection &&
                    x._id !== '/recetas/cocina'
                );
            });
        }
    }
    const modifyRecipesName = x =>
        x.parent_id === '/recetas/cocina' ? `cocina ${x.name}` : x.name;

    const listSectionsFormatted = listSections.map(x => {
        return {
            path: x.path,
            text: modifyRecipesName(x)
        };
    });

    return (
        <div className="row">
            <div className="col-12">
                <>
                    {temas && listSectionsFormatted.length > 0 && (
                        <HeaderSection title="Temas" />
                    )}
                    {listSectionsFormatted && (
                        <TaxonomyComponent
                            list={listSectionsFormatted}
                            destacado={destacado}
                            type="section"
                        />
                    )}
                </>
            </div>
        </div>
    );
};

Sections.propTypes = {
    taxonomy: PropTypes.shape({
        sections: PropTypes.arrayOf(
            PropTypes.shape({
                path: PropTypes.string,
                name: PropTypes.string
            })
        ).isRequired,
        primary_section: PropTypes.object.isRequired
    }).isRequired,
    destacado: PropTypes.boolean.isRequired,
    temas: PropTypes.boolean.isRequired
};

export default Sections;
