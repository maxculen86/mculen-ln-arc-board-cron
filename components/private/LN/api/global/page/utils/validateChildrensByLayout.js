import {
    checkIfValid,
    findSectionChildren
} from '../../../../../common/utils/validateSectionHome';
import {
    checkIfValid as checkIfValid10,
    findSectionChildren as findSectionChildren10
} from '../../../../../common/utils/validateSectionHomeLN10';

export const validateChildrensByLayout = {
    'LN-acumulado': {
        1: findSectionChildren,
        2: checkIfValid
    },
    'LN-Home_Main': {
        1: findSectionChildren,
        2: checkIfValid
    },
    'LN-Home_Sports': {
        1: findSectionChildren,
        2: checkIfValid
    },
    'LN10-Home_Main': {
        1: findSectionChildren10,
        2: checkIfValid10
    }
};

export default validateChildrensByLayout;
