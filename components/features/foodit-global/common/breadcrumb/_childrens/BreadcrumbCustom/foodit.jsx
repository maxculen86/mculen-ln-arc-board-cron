import React from 'react';
import PropTypes from 'prop-types';
import { SITE_FOODIT } from 'fusion:environment';
import Static from 'fusion:static';

import classNames from 'classnames';

import { Breadcrumb } from '@ln/common-ui-breadcrumb';
import { Link } from '@ln/foodit-ui-link';
import capitalizeFirstLetter from '../../../../../../private/common/utils/capitalizeFirstLetter';

function BreadcrumbCustomFoodit({ className, sectionsCustom = [] }) {
    const sections = [
        {
            name: 'Foodit',
            url: `${SITE_FOODIT}/`
        },
        ...sectionsCustom
    ];

    return (
        <Static htmlOnly persistent id="breadcrumb-foodit-custom">
            <div className={classNames('flex ai-center gap-8', className)}>
                <Breadcrumb
                    gap="gap-8"
                    classnames={{
                        base: 'text-14',
                        separator: 'text-light-200'
                    }}
                >
                    {sections.map((section, index) => {
                        const { name, url } = section || {};
                        return (
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
                        );
                    })}
                </Breadcrumb>
            </div>
        </Static>
    );
}
BreadcrumbCustomFoodit.propTypes = {
    sectionsCustom: PropTypes.arrayOf(PropTypes.shape({})),
    className: PropTypes.string
};
BreadcrumbCustomFoodit.defaultProps = {
    sectionsCustom: [],
    className: ''
};
export default BreadcrumbCustomFoodit;
