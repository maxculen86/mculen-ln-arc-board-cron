export const buildPaginationQuery = meta =>
    meta ? `&nextKeyPK=${meta.nextKeyPK}&nextKeySK=${meta.nextKeySK}` : '';

export const hasMorePages = meta => Boolean(meta && meta.nextKeyPK !== null);

export const hasCredentials = (token, accessToken) =>
    Boolean(token && accessToken);
