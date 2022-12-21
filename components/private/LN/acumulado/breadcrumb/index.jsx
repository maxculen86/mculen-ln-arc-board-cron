import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import BreadcrumbAutor from './breadcrumbAutor';
import BreadcrumbTag from './breadcrumbTag';
import BreadcrumbSection from './breadcrumbSection';
import BreadcrumbCustom from './BreadcrumbCustom';
import get from '../../../common/utils/get';
import BreadcrumbDistributor from './breadcrumbDistributor';
import BreadcrumbColumnista from './breadcrumbColumista';

const renderBreadCrumbTag = (globalContent, host) => {
    const tag = globalContent.Payload.items[0];
    return <BreadcrumbTag tag={tag} host={host} />;
};

const renderBreadcrumbSection = (globalContent, host, colorCategory) => (
    <BreadcrumbSection
        sectionId={globalContent && globalContent._id}
        host={host}
        colorCategory={colorCategory}
    />
);

const renderBreadcrumbAutor = (globalContent, host) => (
    <BreadcrumbAutor author={globalContent} host={host} />
);

const renderBreadcrumbDistributor = (globalContent, host) => (
    <BreadcrumbDistributor
        name={globalContent.name || ''}
        canonicalUrl={globalContent.canonical_url}
        host={host}
    />
);
const renderBreadcrumbColumnista = (host, requestUri) => (
    <BreadcrumbColumnista host={host} requestUri={requestUri} />
);

function isRender(
    globalContent,
    globalContentConfig,
    siteProperties,
    layout,
    requestUri,
    host,
    title,
    customFields,
    colorCategory
) {
    const { layoutsName } = siteProperties;
    if (layout === layoutsName.Columnistas)
        return renderBreadcrumbColumnista(host, requestUri);
    if (customFields && customFields.sectionName)
        return (
            <BreadcrumbCustom
                customFields={customFields}
                host={host}
                title={title}
            />
        );

    const { Payload, node_type: nodeType, byline } = globalContent;

    if (Payload) return renderBreadCrumbTag(globalContent, host);

    if (nodeType === 'section')
        return renderBreadcrumbSection(globalContent, host, colorCategory);

    if (nodeType === 'distributor')
        return renderBreadcrumbDistributor(globalContent, host);

    if (byline) return renderBreadcrumbAutor(globalContent, host);

    throw new Error(
        'Breadcrumb invalido en esta página. Verificar si hay un content source asociado o si ha completado el nombre de la sección'
    );
}

function Index(props) {
    const {
        globalContent,
        globalContentConfig,
        siteProperties,
        customFields,
        layout,
        requestUri
    } = props;

    const { host, title } = siteProperties;

    const colorCategory = get(
        globalContent,
        'acumuladoColor.navigation_color',
        null
    );

    return isRender(
        globalContent,
        globalContentConfig,
        siteProperties,
        layout,
        requestUri,
        host,
        title,
        customFields,
        colorCategory
    );
}

Index.propTypes = {
    customFields: PropTypes.shape({
        sectionName: PropTypes.string.tag({ label: `Nombre de la Seccion` })
    })
};

export default Consumer(Index);
