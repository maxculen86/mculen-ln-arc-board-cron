import React from 'react';
import Static from 'fusion:static';

import classNames from 'classnames';

import { Breadcrumb } from '@ln/common-ui-breadcrumb';
import { Link } from '@ln/foodit-ui-link';
import { getBreadcrumbSections } from './_helpers';
import get from '../../../../private/common/utils/get';
import BreadcrumbTooltip from './_childrens/BreadcrumbTooltip/foodit';

export default function BreadcrumbFoodit({ globalContent, className }) {
    const sections = getBreadcrumbSections(globalContent);

    const listSections = get(globalContent, 'taxonomy.sections', []);
    const showTooltip = listSections.some(({ _id = '' } = {}) =>
        _id.includes('sin-gluten')
    );
    const breadcrumbExclude = ['Que cocinar hoy'];

    const validSections = sections.filter(
        ({ name = '' }) => !breadcrumbExclude.includes(name)
    );

    const renderSections = validSections.reduce(
        (acc, { url = '', name = '', disabled = false }) => {
            if (disabled) {
                acc.push(
                    <span
                        key={name}
                        className="link foodit-link flex gap-8 ai-center roboto-regular --disabled"
                        data-variant="primary"
                    >
                        {name}
                    </span>
                );
            } else {
                acc.push(
                    <Link href={url} title={`Ir a ${name}`} key={name}>
                        {name}
                    </Link>
                );
            }

            return acc;
        },
        []
    );

    return (
        <div className={classNames('flex ai-center gap-24', className)}>
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
