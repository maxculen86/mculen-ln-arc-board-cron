import React from 'react';
import { Text } from '@ln/common-ui-text';
import RenderIcon from './RenderIcon';

export const RenderPlans = ({ plan, iconClubLn, iconFoodit }) => {
    if (!plan) return <></>;
    return (
        <div className="flex flex-column">
            <Text className="block text-12 text-light-600">Plan</Text>
            <div className="flex">
                <Text className="prumo prumo-semibold text-light-800 mr-8">
                    {plan}
                </Text>
                {(iconFoodit?.element || iconClubLn?.element) && (
                    <div className="pl-8 border border-left border-thin border-light-100 flex gap-8">
                        <RenderIcon iconData={iconFoodit} />
                        <RenderIcon iconData={iconClubLn} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RenderPlans;
