import nodeFetch from 'node-fetch';
import { ARC_ACCESS_TOKEN } from 'fusion:environment';

const getRequest = query => {
    const opt = {
        method: 'GET'
    };
    if (ARC_ACCESS_TOKEN) {
        opt.headers = {
            Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
        };
    }
    return nodeFetch(query, opt).then(data => data.json());
};

export default getRequest;
