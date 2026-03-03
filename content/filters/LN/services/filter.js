import weather from './weather';
import lottery from './lottery';
import holidays from './holidays';
import horoscope from './horoscope';
import indices from './indices';

export default `{
    children {
        _id
        name
        node_type

    }
    dataService {
        ${weather}
        ${lottery}
        ${holidays}
        ${horoscope}
        ${indices}
    }
    metaData {
        completeDay
        location
        lotteryName
        lotteryNumber
        modalities
        description
        subtitle
        headline
        latestNewsTitle
        title
        paragraph
    }
    name
    node_type
    serviceType
    serviceItem
    serviceSubItem
    _id
}`;
