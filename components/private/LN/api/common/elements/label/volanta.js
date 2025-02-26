import get from '../../../../../common/utils/get';

const volanta = dataNota => get(dataNota, 'label.volanta.text', null);

export { volanta };
