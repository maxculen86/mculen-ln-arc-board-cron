import React from 'react';
import TaxonomyComponent from '../../common/taxonomyImportantList';
import { getFirstParentSection } from '../../../common/utils/sectionUtils';
import HeaderSection from '../../../common/mod-headerSection';

function Sections(props) {
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
        x.parent_id === '/recetas/cocina'
            ? `cocina ${x.name.toLowerCase()}`
            : x.name;

    const listSectionsFormatted = listSections.map(x => ({
        path: x.path,
        text: modifyRecipesName(x)
    }));

    return (
        <div className="row">
            <div className="col-12">
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
            </div>
        </div>
    );
}

export default Sections;
