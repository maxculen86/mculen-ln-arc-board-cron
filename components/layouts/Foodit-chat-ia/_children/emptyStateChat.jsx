import React from 'react';
import { getVariantBarrier } from '../../../features/foodit-global/common/emptyState/helpers';
import Icon from '../../../features/ui/foodit/icon/default';
import { EmptyStateDS } from '../../../features/ui/foodit/emptyState/default';

export function EmptyStateChat() {
    return (
        <>
            <div
                className="flex flex-col md:flex-row gap-4 shrink-0 pt-4 relative overflow-hidden min-h-[40px] [mask-image:linear-gradient(to_bottom,#fefefe_calc(100%-2rem),transparent_100%)] ' +
                '[-webkit-mask-image:linear-gradient(to_bottom,#fefefe_calc(100%-3rem),transparent_100%)]"
            >
                <div className="flex gap-4">
                    <Icon
                        size={20}
                        className="pt-4"
                        fill="var(--proxy-accent-default)"
                        name="sprak"
                    />
                    <p className="roboto roboto-bold text-16">Foodit IA:</p>
                </div>
                <p>En foodit podes encontrar las recetas y tecnicas...</p>
            </div>
            <EmptyStateDS
                variant={getVariantBarrier('unlogged')}
                direction="horizontal"
                className="bg-brand-sal md:flex-row xl:gap-32 px-16 md:px-24 xl:px-32 py-16 md:py-24 xl:py-32 text-center md:text-left"
                comesFrom="ChatIA"
            />
        </>
    );
}
