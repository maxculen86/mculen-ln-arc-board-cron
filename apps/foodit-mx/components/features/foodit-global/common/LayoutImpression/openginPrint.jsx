import React from 'react';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Text } from '@ln/common-ui-text';
import { Badge } from '@ln/foodit-ui-badge';
import { cx } from '@ln/cva';

export function OpeningPrint({
    includePhotos,
    mainImage,
    imageCaption,
    titleRecipe,
    authorRecipe,
    badge
}) {
    const className = cx(
        'w-100 bg-light-1 border border-bottom border-thin border-light-100'
    );
    return (
        <div className="relative w-100">
            {includePhotos && (
                <Adaptableimage
                    className="w-100 ratio-3-2"
                    src={mainImage}
                    alt={imageCaption}
                />
            )}

            <section className={className}>
                <div className="w-100 flex flex-column jc-center ai-center px-32 py-40 gap-12">
                    {badge && <Badge>{badge}</Badge>}
                    <div className="flex flex-column gap-24">
                        <Text
                            className="prumo text-48 text-center"
                            text={titleRecipe}
                            as="h1"
                        />
                        {authorRecipe && (
                            <Text
                                className="text-14 text-center"
                                text={authorRecipe}
                                as="p"
                            />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
