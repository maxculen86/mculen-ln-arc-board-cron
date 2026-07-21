import React from 'react';
import { SITE_FOODIT } from 'fusion:environment';
import Static from 'fusion:static';

import { Breadcrumb } from '@ln/common-ui-breadcrumb';
import { Link } from '@ln/foodit-ui-link';
import { cx } from '@ln/cva';
import capitalizeFirstLetter from '../../../../../../private/common/utils/capitalizeFirstLetter';

function BreadcrumbCustomFoodit({ className = '', sectionsCustom = [] }) {
    const sections = [
        {
            name: 'Foodit',
            url: `${SITE_FOODIT}/`
        },
        ...sectionsCustom
    ];

    return (
        <Static htmlOnly persistent id="breadcrumb-foodit-custom">
            <div className={cx('flex ai-center gap-8 --no-app', className)}>
                <Breadcrumb
                    gap="gap-8"
                    classnames={{
                        base: 'text-14',
                        separator: 'text-light-200'
                    }}
                >
                    {sections.map((section, index) => {
                        const { name, url } = section || {};
                        const isDisabled =
                            sections.length > 1 &&
                            index === sections.length - 1;

                        if (isDisabled) {
                            return (
                                <span
                                    key={name}
                                    className="link foodit-link flex gap-8 ai-center roboto-regular --disabled"
                                    data-variant="primary"
                                >
                                    {capitalizeFirstLetter(name)}
                                </span>
                            );
                        }

                        return (
                            <Link href={url} title={`Ir a ${name}`} key={name}>
                                {capitalizeFirstLetter(name)}
                            </Link>
                        );
                    })}
                </Breadcrumb>
            </div>
        </Static>
    );
}

export default BreadcrumbCustomFoodit;
