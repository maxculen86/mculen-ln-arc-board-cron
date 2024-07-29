import React from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import AuthorBiography from '../../features/foodit-global/common/authorBiography/foodit';
import { Text } from '@ln/common-ui-text';
import transformSocial from '../../features/private-global/common/utils/transformSocial';

const pageBuilderSections = ['Notas'];

const ChefFoodit = props => {
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
            title: byline
        },
        description: longBio,
        socialNetworks
    };

    return (
        <BaseLayout>
            <div className="flex flex-column gap-40">
                <AuthorBiography {...authorBiography} />
                <hr className="floating-button-sentinel" />
                <section className="flex flex-column gap-24">
                    <Text
                        as="h1"
                        className="prumo prumo-light text-24 text-32_md text-36_lg"
                    >
                        Sus recetas
                    </Text>
                    {notas}
                </section>
            </div>
        </BaseLayout>
    );
};

ChefFoodit.sections = pageBuilderSections;

ChefFoodit.propTypes = {
    children: PropTypes.array,
    globalContent: PropTypes.object
};

export default Consumer(ChefFoodit);
