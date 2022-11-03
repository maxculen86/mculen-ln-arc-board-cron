import weather from './weather';
import lottery from './lottery';
import holidays from './holidays';

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
    _id
}`;
