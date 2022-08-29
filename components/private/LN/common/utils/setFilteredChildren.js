const setFilteredChildren = ({ features, children, conditions }) => {
    const featuresIds = features
        .filter(f => conditions.feature(f))
        .map(f => f.props.id);

    return conditions.children
        ? children.filter(x => featuresIds.includes(x.key))
        : children;
};

export default setFilteredChildren;
