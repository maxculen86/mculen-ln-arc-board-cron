import get from '../../../private/common/utils/get';

const getFillClass = data => {
    const dataLength = get(data, 'length');
    const extraClass = ['', '--minusThree', '--minusTwo', '--minusOne'];

    if (dataLength < 4) {
        return '--fewElem';
    }

    return data ? extraClass[dataLength % 4] : '';
};

export default getFillClass;
