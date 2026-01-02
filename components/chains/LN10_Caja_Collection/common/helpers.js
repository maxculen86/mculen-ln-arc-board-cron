import {
    imagePositions,
    size
} from '../../../private/common/utils/diagramationRules';
import { LAYOUTS } from '../../utils/common/_helpers-WebApi';

const { BN_2_GRID } = LAYOUTS;

export function diagramationRulesCustomOptions({
    layout,
    pageLayout,
    layoutsName
}) {
    if (layout === BN_2_GRID && pageLayout === layoutsName.AcumuladoV2) {
        return [
            {
                cardSize: size.XL,
                imageConfig: size.L,
                imagePosition: imagePositions.top
            },
            {
                cardSize: size.XL,
                imageConfig: size.L,
                imagePosition: imagePositions.top
            }
        ];
    }
    return [];
}
