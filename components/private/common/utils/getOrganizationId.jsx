import get from './get';

const getOrganizationId = siteProperties => {
    const host = get(siteProperties, 'host', null);
    return host ? `${host.replace(/\/+$/, '')}/#organization` : null;
};

export default getOrganizationId;
