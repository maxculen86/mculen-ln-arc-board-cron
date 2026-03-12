import React from 'react';
import { Text } from '@ln/common-ui-text';

export function NutritionalInfoCard({ title, cant, udm }) {
    return (
        <article className="text-center border border-all border-thin border-light-300 px-4 pt-8 pb-4 px-8_md py-8_md w-100 h-100">
            <Text className="prumo prumo-medium text-16 pb-4">{title}</Text>
            <div className="bg-accent-vino-light py-4">
                <Text className="roboto roboto-bold text-20 text-light-800">
                    {cant}{' '}
                    <span className="text-light-700 roboto-regular text-12">
                        {udm}
                    </span>
                </Text>
            </div>
        </article>
    );
}
