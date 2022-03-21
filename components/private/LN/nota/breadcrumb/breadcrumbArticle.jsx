/* eslint-disable camelcase */
import React, { useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import BreadcrumbComponent from '../../common/breadcrumbBase';
import BreadCrumbSchema from '../../common/breadcrumbSchema';
import getDomain from '../../../common/utils/getDomain';
import get from '../../../common/utils/get';
import getTooltip from '../../common/utils/getTooltip';
import { GlobalContext } from '../../../common/context/globalContext';

const getPrimaryTree = (sections, section, resultSections) => {
    resultSections.push({
        name: section.name,
        path: section.path
    });
    if (section.parent_id && section.parent_id !== '/') {
        getPrimaryTree(
            sections,
            sections.find(parent => parent._id === section.parent_id),
            resultSections
        );
    }
};

const BreadcrumbArticle = ({
    globalContent: {
        taxonomy: { primary_section, sections },
        website_url,
        _id,
        label,
        owner
    },
    siteProperties: { title: siteTitle, host }
}) => {
    const gc = useContext(GlobalContext);
    const siteService = get(gc, 'state.siteService', {});

    let allSections = [];
    if (primary_section) {
        getPrimaryTree(sections, primary_section, allSections);
    }
    allSections.push({
        name: siteTitle,
        path: '/'
    });
    allSections = allSections.reverse();
    const domainForRecetas = getDomain({ _id, website_url });
    const trust = get(label, 'trust.text', '');
    const tooltip = getTooltip(trust, siteService);
    const sponsored = get(owner, 'sponsored', false);
    const advertiser = get(label, 'marca_anunciante.text', null);

    return (
        <>
            <BreadcrumbComponent
                extraClasses=""
                sections={allSections}
                lastLinked
                host={host}
                tooltip={sponsored || advertiser ? null : tooltip}
            />
            <BreadCrumbSchema sections={allSections} host={domainForRecetas} />
        </>
    );
};

BreadcrumbArticle.propTypes = {
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            sections: PropTypes.array.isRequired,
            primary_section: PropTypes.object
        }).isRequired,
        website_url: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        label: PropTypes.shape({
            trust: PropTypes.shape({
                text: PropTypes.string
            }),
            marca_anunciante: PropTypes.shape({
                text: PropTypes.string
            })
        }),
        siteService: PropTypes.shape({
            tooltips: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    label: PropTypes.string
                })
            )
        }),
        owner: PropTypes.shape({
            sponsored: PropTypes.boolean
        })
    }).isRequired,
    siteProperties: PropTypes.shape({
        title: PropTypes.string.isRequired,
        host: PropTypes.string.isRequired
    }).isRequired
};

export default BreadcrumbArticle;
