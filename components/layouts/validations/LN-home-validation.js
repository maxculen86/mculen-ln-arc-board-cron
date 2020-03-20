import PropTypes from 'fusion:prop-types';

const validateLayoutChildren = (renderables, config) => {
    const sections = renderables.filter(
        element => element.collection === 'sections'
    );
    const errors = config.map(
        sectionConfig =>
            sections &&
            sections[sectionConfig.index] &&
            sections[sectionConfig.index].children
                .map(child => {
                    return !sectionConfig.allowedChains.includes(child.type)
                        ? {
                              type: 'warning',
                              message: `El Chain ${child.type} no es soportado por la ${sectionConfig.name}`
                          }
                        : null;
                })
                .filter(error => error != null)
    );
    return errors;
};

validateLayoutChildren.propTypes = {
    renderables: PropTypes.arrayOf(PropTypes.node),
    config: PropTypes.arrayOf(PropTypes.node)
};

export default validateLayoutChildren;
