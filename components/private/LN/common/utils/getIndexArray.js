import get from '../../../common/utils/get';

const getIndexArray = (value, arr, prop) => {
    for (var i = 0; i < arr.length; i++) {
        const valorencontrado = get(arr[i], prop, null);
        if (valorencontrado === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
};

export default getIndexArray;
