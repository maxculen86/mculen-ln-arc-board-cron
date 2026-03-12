import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Image } from '@ln/foodit-ui-image';
import { SocialNetwork } from './components/SocialNetwork';

export function AuthorBiography({
    name,
    description,
    socialNetworks = [],
    imageProps
}) {
    return (
        <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-16 gap-24_lg pb-16">
            <div className="col-span-3-center col-span-5-center_md col-span-7-center_lg border border-all border-thin p-16 p-24_md p-32_lg w-100 text-light-200">
                <Image {...imageProps} className="ratio-1-1 w-100" />
            </div>
            <div className="col-span-8 col-span-12_md col-span-4-center_lg flex flex-column gap-16 gap-24_lg text-center">
                <Text className="text-center prumo prumo-medium text-28 text-40_md text-48_lg">
                    {name}
                </Text>
                {description && (
                    <Text className="text-16 text-18_md">{description}</Text>
                )}
                {socialNetworks?.length > 0 && (
                    <div className="flex jc-center flex-wrap gap-24 gap-16_md">
                        {socialNetworks?.map((socialNetwork, i) => (
                            <React.Fragment key={`${socialNetwork.name}`}>
                                <SocialNetwork {...socialNetwork} />
                                {i < socialNetworks.length - 1 && (
                                    <hr className="h-100 max-h-24 sm-none" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthorBiography;
