import React from 'react';
import { Skeleton } from '@ln/common-ui-skeleton';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import classNames from 'classnames';

export const SkeletonFaceteddata = () => {
    const dividerClass = classNames(
        'w-100 border border-bottom border-thin border-light-100 my-16'
    );
    const firstDividerClass = classNames('lg-none', dividerClass);

    const getFilterItems = qty => {
        const filterItemList = [];
        for (let i = 0; i < qty; i++) {
            filterItemList.push(
                <div className="flex gap-8">
                    <Skeleton width={20} height={20} />
                    <Skeleton width={115} height={20} />
                </div>
            );
        }
        return filterItemList;
    };

    return (
        <div className="flex flex-column">
            <div className="flex jc-between text-24 pb-24_lg">
                <span className="prumo">Filtros</span>
                <IconSprite name="close" className="lg-none" size={24} />
            </div>
            <div className={firstDividerClass} />
            <div className="flex flex-column gap-16">
                <div className="flex jc-between">
                    <Skeleton width={115} height={20} />
                    <Skeleton width={20} height={20} />
                </div>
                <div className="filterItems flex flex-column gap-8">
                    {getFilterItems(2)}
                </div>
            </div>
            <div className={dividerClass} />

            <div className="flex flex-column gap-16">
                <div className="flex jc-between">
                    <Skeleton width={35} height={20} />
                    <Skeleton width={20} height={20} />
                </div>
                <div className="flex flex-column gap-8">
                    {getFilterItems(3)}
                </div>
            </div>
            <div className={dividerClass} />

            <div className="flex flex-column gap-16">
                <div className="flex jc-between">
                    <Skeleton width={55} height={20} />
                    <Skeleton width={20} height={20} />
                </div>
                <div className="flex flex-column gap-8">
                    {getFilterItems(3)}
                    <Skeleton width={72} height={16} />
                </div>
            </div>
            <div className={dividerClass} />
            <div className="flex flex-column gap-16">
                <div className="flex jc-between">
                    <Skeleton width={46} height={20} />
                    <Skeleton width={20} height={20} />
                </div>
                <div className="flex flex-column gap-8">
                    {getFilterItems(3)}
                    <Skeleton width={72} height={16} />
                </div>
            </div>
            <div className={dividerClass} />
            <div className="flex flex-column gap-16">
                <div className="flex jc-between">
                    <Skeleton width={46} height={20} />
                    <Skeleton width={20} height={20} />
                </div>
                <div className="flex flex-column gap-8">
                    {getFilterItems(3)}
                </div>
            </div>
            <div className={dividerClass} />
        </div>
    );
};
