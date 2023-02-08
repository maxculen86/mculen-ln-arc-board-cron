const setSlicedChildren = ({
    setQuantityByLayout,
    config,
    featuredChildren
}) => {
    const maxChildrenQuantity = setQuantityByLayout(config);
    return featuredChildren.slice(0, maxChildrenQuantity);
};

export default setSlicedChildren;
