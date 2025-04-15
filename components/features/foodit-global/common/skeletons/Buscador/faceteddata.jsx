import React from 'react';
import { Skeleton } from '@ln/common-ui-skeleton';
import classNames from 'classnames';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

export function SkeletonFaceteddata() {
    const dividerClass = classNames(
        'w-100 border border-bottom border-thin border-light-100 my-16'
    );
    const firstDividerClass = classNames('lg-none', dividerClass);

    const getFilterItems = qty => {
        const filterItemList = [];
        for (let i = 0; i < qty; i += 1) {
            filterItemList.push(
                <div className="flex gap-8">
                    <Skeleton width={20} height={20} />
                    <Skeleton width={115} height={20} />
                </div>
            );
        }
        return filterItemList;
    };

    const renderSection = (
        titleWidth,
        filterQty,
        includeExtraSkeleton = false
    ) => (
        <div className="flex flex-column gap-16">
            <div className="flex jc-between">
                <Skeleton width={titleWidth} height={20} />
                <Skeleton width={20} height={20} />
            </div>
            <div className="flex flex-column gap-8">
                {getFilterItems(filterQty)}
                {includeExtraSkeleton && <Skeleton width={72} height={16} />}
            </div>
        </div>
    );

    return (
        <div className="flex flex-column" data-testid="skeleton-loader">
            <div className="flex jc-between text-24 pb-24_lg">
                <span className="prumo">Filtros</span>
                <IconSprite name="close" className="lg-none" size={24} />
            </div>
            <div className={firstDividerClass} />
            {renderSection(115, 2)}
            <div className={dividerClass} />
            {renderSection(35, 3)}
            <div className={dividerClass} />
            {renderSection(55, 3, true)}
            <div className={dividerClass} />
            {renderSection(46, 3, true)}
            <div className={dividerClass} />
            {renderSection(46, 3)}
            <div className={dividerClass} />
        </div>
    );
}
