import { setWrappedChildren } from '../LN10_Caja_Apertura/_helper';
import setSlicedChildren from './setSliceChildren';

const checkChangeChildrenForPB = ({
    features,
    children,
    setUpdateChildrens,
    layout,
    setQuantityByLayout
}) => {
    const orderFeaturesInitial = features.map(feature => {
        return feature.props && feature.props.id;
    });

    const orderChildrenInitial = children.map(child => {
        return child.key;
    });

    const isEqualOrder =
        JSON.stringify(orderChildrenInitial) ===
        JSON.stringify(orderFeaturesInitial);
    if (!isEqualOrder) {
        const featuresUpdated = children.map(child => {
            return features[
                features.findIndex(
                    feature =>
                        feature &&
                        feature.props &&
                        feature.props.id === child.key
                )
            ];
        });

        const featuredChildrenUpdated =
            setWrappedChildren(featuresUpdated, children) || [];

        const slicedChildrenUpdated = setSlicedChildren({
            setQuantityByLayout,
            featuredChildren: featuredChildrenUpdated,
            config: { layout, countTimeline: true }
        });

        setUpdateChildrens(slicedChildrenUpdated);
    }
};

export default checkChangeChildrenForPB;
