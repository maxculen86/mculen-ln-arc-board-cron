import React from 'react';
import { useAppContext } from 'fusion:context';
import { Skeleton } from '@ln/common-ui-skeleton';
import classNames from 'classnames';

function SkeletonCard({
    className = '',
    variant = 'recipe',
    isResultdata = false
}) {
    const { layout, siteProperties } = useAppContext();
    const { layoutsName = {} } = siteProperties || {};
    const isLayoutRecetario = layout === layoutsName.FooditRecetario;

    const containerClassName = classNames(
        'border border-all border-thin border-light-100 flex flex-column pb-16',
        { 'bg-positive p-16': variant === 'note' },
        className
    );
    const bodyClassName = classNames(
        'body flex flex-column jc-between gap-16 pt-20',
        { 'flex-grow-1 px-16': variant === 'recipe' },
        { 'px-16': variant !== 'note' }
    );

    return (
        <div className={containerClassName}>
            <div className="foodit-placeholder ratio-3-2" />
            <div className={bodyClassName}>
                <Skeleton className="rounded-4" width="100%" height={48} />
                <div
                    className={classNames(
                        'jc-between',
                        variant === 'acu' ? 'none' : 'flex',
                        isResultdata ? 'sm-none w-100 gap-16' : ''
                    )}
                >
                    <div
                        className={classNames(
                            'flex flex-column gap-8',
                            isResultdata && 'w-100'
                        )}
                    >
                        <Skeleton
                            className={classNames(
                                'rounded-4',
                                isResultdata ? 'w-100' : 'w-194',
                                isLayoutRecetario && 'w-194 w-160_md w-194_lg'
                            )}
                            height={14}
                        />
                        <Skeleton
                            className={classNames('rounded-4', {
                                none: variant === 'note'
                            })}
                            width={58}
                            height={10}
                        />
                    </div>
                    <div>
                        <Skeleton
                            className="rounded-4"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SkeletonCard;
