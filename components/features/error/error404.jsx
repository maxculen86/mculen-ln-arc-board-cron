import React from 'react';
import Consumer from 'fusion:consumer';
import Arc404 from '../../private/OTT/common/error404';

const Error404 = ({ arcSite }) => {
    if (arcSite === 'ott') return <Arc404 />;

    return <div>este sitio no tiene un error 404</div>;
};

export default Consumer(Error404);
