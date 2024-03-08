import React from 'react';
import get from '../../../../private/common/utils/get';
import classNames from 'classnames';
import { Link } from '@ln/foodit-ui-link';
import { Breadcrumb } from '@ln/common-ui-breadcrumb';
import StaticContent from '../../../../private/common/staticContent';
import { setArraySection } from './_helpers';
import BreadcrumbTooltip from './_childrens/BreadcrumbTooltip/foodit';

export default function BreadcrumbFoodit({ globalContent, className }) {
    const acuSection = get(globalContent, '_id', '');
    const noteSection = get(globalContent, 'taxonomy.primary_section._id', '');
    const listSections = get(globalContent, 'taxonomy.sections', []);
    const showTooltip = listSections.some(({ _id = '' } = {}) =>
        _id.includes('sin-gluten')
    );
    const isAcu = acuSection.startsWith('/');

    const sections = isAcu
        ? setArraySection(acuSection, isAcu)
        : setArraySection(noteSection);

    return (
        <div className={classNames('flex ai-center gap-8', className)}>
            <StaticContent>
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
            </StaticContent>
            {showTooltip && <BreadcrumbTooltip />}
        </div>
    );
}
