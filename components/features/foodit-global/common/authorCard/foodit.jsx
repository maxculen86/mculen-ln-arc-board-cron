import React from 'react';
import { Link } from '@ln/foodit-ui-link';
import { Text } from '@ln/common-ui-text';
import { Image } from '@ln/foodit-ui-image';

export const AuthorCard = ({ href, name, imageProps }) => {
    return (
        <Link
            href={href}
            className="card-author flex flex-column gap-16 pb-16 col-span-4"
        >
            <div className="border border-all border-thin p-16 p-24_md p-32_lg w-100 transition-regular">
                <Image {...imageProps} className="ratio-1-1 h-100" />
            </div>
            <Text className="text-center prumo prumo-medium text-24">
                {name}
            </Text>
        </Link>
    );
};

export default AuthorCard;
