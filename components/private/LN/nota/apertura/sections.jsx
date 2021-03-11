import React from 'react';
import PropTypes from 'fusion:prop-types';
import TaxonomyComponent from '../../common/taxonomyImportantList';
import { getFirstParentSection } from '../../../common/utils/sectionUtils';
import ComTitle from '../../../common/com-title';
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
                    x._id !== parentPrimarySection
                );
            });
        }
    }

    const listSectionsDespues = listSections.map(x => {
        return {
            path: x.path,
            text: x.name
        };
    });
    return (
        <div className="row">
            <div className="col-12">
                <>
                    {temas && listSectionsDespues.length > 0 && (
                        /* <ComTitle size="--l" tag="h4" content="Temas" /> */
                        <HeaderSection title="Temas" />
                    )}
                    {listSectionsDespues && (
                        <TaxonomyComponent
                            list={listSectionsDespues}
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
