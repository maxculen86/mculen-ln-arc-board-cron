import Consumer from 'fusion:consumer';
import Acu from '../../../private/LN/api/acumulado';

const acuSection = props => {
    return Acu(props);
};

export default Consumer(acuSection);
