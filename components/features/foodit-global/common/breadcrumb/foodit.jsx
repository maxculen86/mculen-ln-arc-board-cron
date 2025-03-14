import React from 'react';
import Static from 'fusion:static';

import classNames from 'classnames';

import { Breadcrumb } from '@ln/common-ui-breadcrumb';
import { Link } from '@ln/foodit-ui-link';
import PropTypes from 'fusion:prop-types';
import { getBreadcrumbSections } from './_helpers';
import get from '../../../../private/common/utils/get';
import BreadcrumbTooltip from './_childrens/BreadcrumbTooltip/foodit';

export default function BreadcrumbFoodit({ globalContent, className }) {
    const sections = getBreadcrumbSections(globalContent);

    const listSections = get(globalContent, 'taxonomy.sections', []);
    const showTooltip = listSections.some(({ _id = '' } = {}) =>
        _id.includes('sin-gluten')
    );
    const breadcrumbExclude = ['Que cocinar hoy', 'Dietas'];

    const renderSections = sections.reduce(
        (acc, { url = '', name = '', disabled = false } = {}) => {
            if (!breadcrumbExclude.includes(name)) {
                acc.push(
                    <Link
                        href={url}
                        title={`Ir a ${name}`}
                        key={name}
                        disabled={disabled}
                    >
                        {name}
                    </Link>
                );
            }
            return acc;
        },
        []
    );
    return (
        <div className={classNames('flex ai-center gap-8', className)}>
            <Static htmlOnly persistent id="breadcrumb-foodit">
                <Breadcrumb
                    gap="gap-8"
                    classnames={{
                        base: 'text-14',
                        separator: 'text-light-200'
                    }}
                >
                    {renderSections}
                </Breadcrumb>
            </Static>
            {showTooltip && <BreadcrumbTooltip />}
        </div>
    );
}
BreadcrumbFoodit.propTypes = {
    globalContent: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired
};
