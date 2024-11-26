import React from 'react';
import PropTypes from 'fusion:prop-types';
import Context from 'fusion:context';
import classNames from 'classnames';
import { place } from '../../../private/common/utils/firmaHelper';
import AudioPlayer from '../../../private/common/audioNews/AudioPlayer';
import { AudioButton } from '../../../private/common/audioNews/components/AudioButton';
import { useAudioPlayer } from '../../../private/common/audioNews/hooks/useAudioPlayer';
import { isCustomVoice } from '../../../../content/sources/utils/audioNews/helper';
import { getAuthorsNameAndLink } from '../../../private/common/audioNews/helpers';
import { SignatureContextProvider } from '../../../private/common/audioNews/hooks/SignatureContext';
import SignatureWithAuthors from './signatureWithAuthors';
import SignatureWithDistributor from './signatureWithDistributor';
import WithoutSignature from './withoutSignature';
import { useSignature } from './hook/useSignature';

function SignatureFeature(props) {
    const {
        customFields: { withAudio, position },
        globalContent: {
            content_elements: contentElements,
            credits: { by: creditsBy },
            distributor = { name: 'LA NACION' },
            withFirmaDistributor,
            _id,
            isListenable,
            subtype
        }
    } = props;

    const { name } = distributor;
    const showSignatureWithDistributor =
        withFirmaDistributor && name !== 'lanacionar';

    const { photo, medio, authors, dataAuthor } = useSignature({
        creditsBy,
        position,
        contentElements
    });

    const { audioPlayerProps = {} } = useAudioPlayer({ isListenable });
    const { thermicalAudio } = audioPlayerProps;
    const customVoice = isCustomVoice(dataAuthor);
    const showVariantIa = customVoice && thermicalAudio && authors.length <= 1;

    const { author } =
        !showSignatureWithDistributor && getAuthorsNameAndLink(authors);

    const hasAuthors = author || authors.length > 0;

    const notShowSignature =
        !showSignatureWithDistributor && !authors?.length && !author;

    if (!isListenable && notShowSignature) return null;

    const audioButton = (
        <AudioButton
            variant={showVariantIa ? 'ia' : 'default'}
            audioPlayerProps={audioPlayerProps}
            withAudio={withAudio}
            authorNames={author?.name}
            showTooltipVariantIA={showVariantIa}
        />
    );

    const audioPlayer = (
        <AudioPlayer
            isListenable={isListenable}
            noteId={_id}
            className="--no-app"
            audioPlayerProps={audioPlayerProps}
            showVariantIa={showVariantIa}
        />
    );

    const classNameContainer = classNames(
        'flex flex-column feature-firma',
        position === place.Top ? 'mb-16 mb-24_m' : 'mb-32'
    );

    return (
        <SignatureContextProvider>
            <div className={classNameContainer}>
                <SignatureWithDistributor
                    name={name}
                    audioButton={audioButton}
                    showSignatureWithDistributor={showSignatureWithDistributor}
                />
                <SignatureWithAuthors
                    showVariantIa={showVariantIa}
                    author={author}
                    authors={authors}
                    audioButton={audioButton}
                    position={position}
                    photo={photo}
                    medio={medio}
                    showSignatureWithAuthors={hasAuthors}
                    subtype={subtype}
                />
                <WithoutSignature
                    audioButton={audioButton}
                    showWithoutSignature={notShowSignature}
                />
                {withAudio && audioPlayer}
            </div>
        </SignatureContextProvider>
    );
}

SignatureFeature.propTypes = {
    customFields: PropTypes.shape({
        position: PropTypes.oneOf([place.Top, place.Bottom]).tag({
            label: 'Ubicacion'
        }),
        withAudio: PropTypes.boolean.tag({ label: 'Con audio' })
    }).isRequired,
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
    }).isRequired
};

SignatureFeature.label = 'LN-Nota-Firma-V2';

export default Context(SignatureFeature);
