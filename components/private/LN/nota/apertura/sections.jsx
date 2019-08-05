import React from 'react';
import PropTypes from 'fusion:prop-types';
import TaxonomyComponent from '../../common/taxonomyImportantList';

const Sections = props => {
    const { taxonomy, destacado } = props;
    const primary = taxonomy.primary_section;

    let listSections = '';
    if (primary) {
        listSections = taxonomy.sections.filter(x =>
            x.additional_properties.original.ancestors.default.includes(
                primary.additional_properties.original.ancestors.default[0]
            )
        );
    }

    const listSectionsDespues = listSections.map(x => {
        return {
            path: x.path,
            text: x.name
        };
    });

    return (
        <TaxonomyComponent list={listSectionsDespues} destacado={destacado} />
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
    destacado: PropTypes.boolean.isRequired
};

export default Sections;
