const getFeatureByLayout = (features, children, layoutName) => {
    if (!layoutName || !features || !children) return null;

    const lowerLayout = layoutName.toLowerCase();
    const featureKeys = children.map(c => c.key);

    return (
        features.find(
            feature =>
                feature.type.includes(lowerLayout) &&
                featureKeys.includes(feature.props.id)
        ) || null
    );
};

export default getFeatureByLayout;
