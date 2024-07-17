import React from 'react';
import Static from 'fusion:static';

import get from '../../../../private/common/utils/get';
import classNames from 'classnames';
import { getBreadcrumbSections } from './_helpers';

import { Breadcrumb } from '@ln/common-ui-breadcrumb';
import { Link } from '@ln/foodit-ui-link';
import BreadcrumbTooltip from './_childrens/BreadcrumbTooltip/foodit';

export default function BreadcrumbFoodit({ globalContent, className, layout }) {
    const sections = getBreadcrumbSections(globalContent);

    const listSections = get(globalContent, 'taxonomy.sections', []);
    const showTooltip = listSections.some(({ _id = '' } = {}) =>
        _id.includes('sin-gluten')
    );

    return (
        <div className={classNames('flex ai-center gap-8', className)}>
            <Static htmlOnly persistent id="breadcrumb-foodit">
                <Breadcrumb gap={8} className="text-14">
                    {sections.map(({ name, url, disabled = false } = {}) => (
                        <Link
                            href={url}
                            title={`Ir a ${name}`}
                            key={name}
                            disabled={disabled}
                        >
                            {name}
                        </Link>
                    ))}
                </Breadcrumb>
            </Static>
            {showTooltip && <BreadcrumbTooltip />}
        </div>
    );
}
