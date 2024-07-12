import React from 'react';
import { SITE_FOODIT } from 'fusion:environment';
import Static from 'fusion:static';

import classNames from 'classnames';
import capitalizeFirstLetter from '../../../../../../private/common/utils/capitalizeFirstLetter';

import { Breadcrumb } from '@ln/common-ui-breadcrumb';
import { Link } from '@ln/foodit-ui-link';

export default function BreadcrumbCustomFoodit({
    sectionsCustom = [],
    className
}) {
    const sections = [
        {
            name: 'Foodit',
            url: `${SITE_FOODIT}/`
        },
        ...sectionsCustom
    ];

    return (
        <>
            <Static htmlOnly persistent id="breadcrumb-foodit-custom">
                <div className={classNames('flex ai-center gap-8', className)}>
                    <Breadcrumb gap={8} className="text-14">
                        {sections.map(({ name, url } = {}, index) => (
                            <Link
                                href={url}
                                title={`Ir a ${name}`}
                                key={name}
                                disabled={
                                    sections.length > 1 &&
                                    index === sections.length - 1
                                }
                            >
                                {capitalizeFirstLetter(name)}
                            </Link>
                        ))}
                    </Breadcrumb>
                </div>
            </Static>
        </>
    );
}
