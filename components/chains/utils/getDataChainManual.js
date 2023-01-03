import {
    getChildrenFromAperturaHome,
    getChildrenFromSectionHome
} from '../../private/LN/common/utils/cajaTemasHelper';
import { validateChainManual } from '../../private/LN/common/utils/cajaTemasValidators';
import setFilteredChildren from '../../private/LN/common/utils/setFilteredChildren';
import {
    childrenValidation,
    customFieldValidation
} from './contentValidations';

const getDataChainManual = ({
    layout = '',
    children = [],
    featureId = '',
    renderables = [],
    childProps = []
}) => {
    const aperturasChildren = getChildrenFromAperturaHome(
        renderables,
        childProps
    );

    const multimediaChildren = getChildrenFromSectionHome(
        renderables,
        'Multimedia',
        5
    );
    const isInApertura = customFieldValidation({
        featureId,
        sectionChildren: aperturasChildren
    });

    const isMultimedia = customFieldValidation({
        featureId,
        sectionChildren: multimediaChildren
    });

    const features = renderables.filter(r => r.collection === 'features');
    const multimediaCustomFields = ['video', 'html'];

    const filteredChildren = setFilteredChildren({
        features,
        children,
        conditions: {
            feature: f => f.type !== 'LN-acumulado/timeline',
            children: layout !== 'grillaUltimasNoticias'
        }
    });

    const [isVideoBackground, containsHTML] = multimediaCustomFields.map(
        customField =>
            childrenValidation({
                featureId,
                customField,
                sectionChildren: multimediaChildren
            })
    );

    const error = validateChainManual(
        childProps,
        layout,
        isInApertura,
        isVideoBackground,
        containsHTML
    );

    return {
        isInApertura,
        isMultimedia,
        features,
        multimediaChildren,
        filteredChildren,
        error
    };
};

export default getDataChainManual;
