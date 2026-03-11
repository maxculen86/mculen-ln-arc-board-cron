import React from 'react';
import Static from 'fusion:static';
import Consumer from 'fusion:consumer';
import { Text } from '@ln/common-ui-text';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { AuthorBiography } from '../../features/foodit-global/common/authorBiography/foodit';
import { transformSocial } from '../../features/private-global/common/utils/transformSocial';

const pageBuilderSections = ['Notas'];

function ChefFoodit(props) {
    const { children, globalContent = {} } = props;

    const {
        byline = '',
        longBio = '',
        image: { url: imageUrl = '' } = {},
        instagram = '',
        youtube = '',
        pinterest = '',
        twitter = ''
    } = globalContent;
    const [notas] = children;

    const socialNetworks = [
        transformSocial('instagram', instagram),
        transformSocial('youtube', youtube),
        transformSocial('pinterest', pinterest),
        transformSocial('twitter', twitter)
    ].filter(social => Boolean(social.name));

    const authorBiography = {
        name: byline,
        imageProps: {
            src: imageUrl,
            alt: byline,
            title: byline,
            fetchPriority: 'high',
            loading: 'eager'
        },
        description: longBio,
        socialNetworks
    };

    return (
        <BaseLayout>
            <div className="grid gap-40">
                <Static id="Foodit-chef">
                    <AuthorBiography {...authorBiography} />
                </Static>
                <hr className="floating-button-sentinel" />
                <section className="grid gap-24_md">
                    <div className="roof-sticky py-12 py-0_md">
                        <Text
                            as="h1"
                            className="roof-text-sticky pl-16 pl-0_md"
                        >
                            Sus recetas
                        </Text>
                    </div>
                    {notas}
                </section>
            </div>
        </BaseLayout>
    );
}

ChefFoodit.sections = pageBuilderSections;

export default Consumer(ChefFoodit);
