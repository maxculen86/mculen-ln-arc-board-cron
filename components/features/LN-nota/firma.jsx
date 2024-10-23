/* eslint-disable react/require-default-props */
import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';
import { Author } from '@ln/contenidos-ui-author';
import classNames from 'classnames';
import ComPartner from '../../private/common/com-partner';
import ComLink from '../../private/common/com-link';
import {
    place,
    filterByAuthor,
    getPropsBuilder,
    getPropsBuilderFromContentElements
} from '../../private/common/utils/firmaHelper';
import { compose } from '../../private/common/utils/functional';
import formatDistributorName from '../../private/LN/common/utils/formatDistributorName';
import AudioPlayer from '../../private/common/audioNews/AudioPlayer';
import isSSR from '../../private/LN/common/utils/isSSR';
import { AudioButton } from '../../private/common/audioNews/components/AudioButton';
import IconSprite from '../private-global/common/iconSprite/IconSprite';
import { useAudioPlayer } from '../../private/common/audioNews/hooks/useAudioPlayer';
import get from '../../private/common/utils/get';
import { isCustomVoice } from '../../../content/sources/utils/audioNews/helper';
import { getAuthorsNameAndLink } from '../../private/common/audioNews/helpers';

function FirmaFeature(props) {
    const {
        customFields: { withAudio, position },
        globalContent: {
            content_elements: contentElements,
            credits: { by: creditsBy },
            distributor = { name: 'LA NACION' },
            withFirmaDistributor,
            _id,
            isListenable
        }
    } = props;

    const { name } = distributor;
    if (name && name === 'lanacionar') return null;

    const dataAuthor = get(creditsBy, '[0].additional_properties.original', {});
    const customVoice = isCustomVoice(dataAuthor);

    const { audioPlayerProps = {} } = useAudioPlayer({ isListenable });
    const { thermicalAudio } = audioPlayerProps;

    const constructProps =
        creditsBy && creditsBy.length
            ? getPropsBuilder(position)
            : getPropsBuilderFromContentElements(position);

    const {
        photo,
        medio,
        authors = []
    } = creditsBy && creditsBy.length
        ? compose(constructProps, filterByAuthor)(creditsBy)
        : compose(constructProps)(contentElements);

    // TODO: repasar logica para que lo resuelva el componente de la lib Author
    const firmaDistributorHtml = nombre =>
        nombre === 'LA NACION' ? (
            <ComPartner size="--xs">{nombre}</ComPartner>
        ) : (
            <ComLink
                link={`${SITE_LANACION}/distributor/${formatDistributorName(
                    nombre
                )}/`}
            >
                <ComPartner size="--twoxs">{nombre}</ComPartner>
            </ComLink>
        );

    const showVariantIa = customVoice && thermicalAudio;
    const { author } = !withFirmaDistributor && getAuthorsNameAndLink(authors);

    const audioButton = (
        <AudioButton
            variant={showVariantIa ? 'ia' : 'default'}
            audioPlayerProps={audioPlayerProps}
            withAudio={withAudio}
            authorNames={author?.name}
            showTooltipVariantIA={showVariantIa}
        />
    );

    const content = withFirmaDistributor ? (
        <div className="flex flex-column gap-16 w-100 flex-row_m ai-center_m ai-start">
            {firmaDistributorHtml(name)}
            {audioButton}
        </div>
    ) : (
        <div className="row FirmaAutor">
            <div className="flex flex-column mb-16 gap-16 w-100 flex-row_m ai-center_m ai-start">
                <Author
                    key={author.name}
                    variant={showVariantIa ? 'ia' : 'default'}
                    size={16}
                    author={author.name || authors?.map(a => a.name)}
                    imageSrc={photo}
                    href={author.link || authors?.map(a => a.link)}
                    section={medio}
                    icon={
                        showVariantIa && <IconSprite name="ai" fill="#FEFEFE" />
                    }
                    prefix={
                        position === place.Bottom ||
                        (Array.isArray(authors) && authors.length > 1)
                    }
                />
                {audioButton}
            </div>
        </div>
    );

    const audioPlayer = !isSSR() ? (
        <AudioPlayer
            isListenable={isListenable}
            noteId={_id}
            className="--no-app"
            audioPlayerProps={audioPlayerProps}
            showVariantIa={showVariantIa}
        />
    ) : null;

    const classNameContainer = classNames(
        'flex flex-column',
        !showVariantIa && 'mb-16 mb-32_l'
    );

    return (
        <div className={classNameContainer}>
            {content}
            {withAudio && audioPlayer}
        </div>
    );
}

FirmaFeature.propTypes = {
    customFields: PropTypes.shape({
        position: PropTypes.oneOf([place.Top, place.Bottom]).tag({
            label: 'Ubicacion'
        }),
        withAudio: PropTypes.boolean.tag({ label: 'Con audio' })
    }),
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        isListenable: PropTypes.boolean,
        content_elements: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                type: PropTypes.string,
                additional_properties: PropTypes.shape({
                    nodeType: PropTypes.string
                }),
                content: PropTypes.string
            })
        ),
        credits: PropTypes.shape({
            by: PropTypes.arrayOf(
                PropTypes.shape({
                    image: PropTypes.shape({
                        url: PropTypes.string
                    }),
                    byline: PropTypes.string,
                    name: PropTypes.string,
                    slug: PropTypes.string,
                    type: PropTypes.string,
                    _id: PropTypes.string
                })
            )
        }),
        distributor: PropTypes.shape({
            name: PropTypes.string
        }),
        withFirmaDistributor: PropTypes.bool,
        subtype: PropTypes.string
    })
};

FirmaFeature.label = 'LN-Nota-Firma';

export default Context(FirmaFeature);
