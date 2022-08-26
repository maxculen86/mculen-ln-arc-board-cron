import weather from './weather';
import lottery from './lottery';

export default `{
    children {
        _id
        name
        node_type

    }
    dataService {
        ${weather}
        ${lottery}
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
    }
    name
    node_type
    serviceType
    _id
}`;
