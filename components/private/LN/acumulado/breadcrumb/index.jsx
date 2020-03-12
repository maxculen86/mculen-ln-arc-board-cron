import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import BreadcrumbAutor from './breadcrumbAutor';
import BreadcrumbTag from './breadcrumbTag';
import BreadcrumbSection from './breadcrumbSection';
import BreadcrumbCustom from './BreadcrumbCustom';

const renderBreadCrumbTag = (globalContent, host) => {
    const tag = globalContent.Payload.items[0];
    return <BreadcrumbTag tag={tag} host={host} />;
};

const renderBreadcrumbSection = (globalContent, host) => (
    <BreadcrumbSection sectionId={globalContent._id} host={host} />
);

const renderBreadcrumbAutor = (globalContent, host) => (
    <BreadcrumbAutor author={globalContent} host={host} />
);

function isRender(
    globalContent,
    globalContentConfig,
    host,
    title,
    customFields
) {
    if (customFields && customFields.sectionName)
        return (
            <BreadcrumbCustom
                customFields={customFields}
                host={host}
                title={title}
            />
        );

    if (globalContent.Payload) return renderBreadCrumbTag(globalContent, host);

    if (globalContent.node_type === 'section')
        return renderBreadcrumbSection(globalContent, host);

    if (globalContent.byline) return renderBreadcrumbAutor(globalContent, host);

    throw new Error(
        'Breadcrumb invalido en esta página. Verificar si hay un content source asociado o si ha completado el nombre de la sección'
    );
}

function Index(props) {
    const {
        globalContent,
        globalContentConfig,
        siteProperties,
        customFields
    } = props;

    const { host, title } = siteProperties;
    // if (globalContent.Payload) {
    //     const tag = globalContent.Payload.items[0];
    //     return <BreadcrumbTag tag={tag} host={host} />;
    // }

    // if (globalContent.node_type === 'section') {
    //     return <BreadcrumbSection sectionId={globalContent._id} host={host} />;
    // }
    // if (globalContent.byline)
    //     return <BreadcrumbAutor author={globalContent} host={host} />;
    return isRender(
        globalContent,
        globalContentConfig,
        host,
        title,
        customFields
    );
}

Index.propTypes = {
    host: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        sectionName: PropTypes.string.tag({ label: `Nombre de la Seccion` })
    })
};

export default Consumer(Index);
