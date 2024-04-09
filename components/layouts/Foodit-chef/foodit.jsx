import React from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import AuthorBiography from '../../features/foodit-global/common/authorBiography/foodit';
import { Text } from '@ln/common-ui-text';

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

    const authorBiography = {
        name: byline,
        imageProps: {
            src: imageUrl
        },
        description: longBio,
        socialNetworks: [
            {
                icon: 'instagram',
                name: instagram,
                href: `https://www.instagram.com/${instagram.replace('@', '')}/`
            },
            {
                icon: 'youtube',
                name: youtube,
                href: `https://www.youtube.com/${youtube}`
            },
            {
                icon: 'pinterest',
                name: pinterest,
                href: `https://www.pinterest.com/${pinterest.replace('@', '')}`
            },
            {
                icon: 'twitter',
                name: twitter,
                href: `https://twitter.com/${twitter.replace('@', '')}`
            }
        ].filter(social => Boolean(social.name))
    };

    return (
        <BaseLayout>
            <div className="flex flex-column gap-32">
                <AuthorBiography {...authorBiography} />
                <hr className="floating-button-sentinel" />
                <section className="flex flex-column gap-32">
                    <Text
                        as="h1"
                        className="prumo prumo-semibold text-28 text-40_md text-48_lg"
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
