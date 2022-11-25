import Consumer from 'fusion:consumer';
import getHomeElements from '../../private/LN/api/v1/global/pages';
//import propsjson from '../../../__mocks__/data/homes/propsHome.json';
//import propsjson from '../../../__mocks__/data/homes/propsEconomia.json';
import home from '../../private/LN/api/v1/global/home';

const ApiLNHomeMain = props => {
    return [props?.globalContent];
    //const homeSections = getHomeElements(props);
    //return home(homeSections) || [];
};

export default Consumer(ApiLNHomeMain);
