import React from 'react';
import Consumer from 'fusion:consumer';
import BreadcrumbAutor from './breadcrumbAutor';
import BreadcrumbTag from './breadcrumbTag';
import BreadcrumbSection from './breadcrumbSection';

function Index({ globalContent, siteProperties }) {
    const { host } = siteProperties;
    if (globalContent.Payload) {
        const tag = globalContent.Payload.items[0];
        return <BreadcrumbTag tag={tag} host={host} />;
    }

    if (globalContent.node_type === 'section')
        return <BreadcrumbSection sectionId={globalContent._id} host={host} />;
    if (globalContent.byline)
        return <BreadcrumbAutor author={globalContent} host={host} />;

    throw new Error('Breadcrumb invalido en esta página. ');
}

export default Consumer(Index);
