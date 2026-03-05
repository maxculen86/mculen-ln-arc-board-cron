import React from 'react';
import PropTypes from 'fusion:prop-types';
import Context from 'fusion:context';
import { cx } from '@ln/cva';
import { place } from '../../../private/common/utils/firmaHelper';
import AudioPlayer from '../../../private/common/audioNews/AudioPlayer';
import { AudioButton } from '../../../private/common/audioNews/components/AudioButton';
import { useAudioPlayer } from '../../../private/common/audioNews/hooks/useAudioPlayer';
import { isCustomVoice } from '../../../../content/sources/utils/audioNews/helper';
import { getAuthorsNameAndLink } from '../../../private/common/audioNews/helpers';
import { SignatureContextProvider } from '../../../private/common/audioNews/hooks/SignatureContext';
import SignatureWithAuthors from './signatureWithAuthors';
import SignatureWithDistributor from './signatureWithDistributor';
import get from '../../../private/common/utils/get';
import WithoutSignature from './withoutSignature';
import { useSignature } from '../../LN/DS-Signature/hooks/useSignature';
import isExternalDistributor from '../../../private/common/utils/isExternalDistributor';
import { signatureClasses } from './styles';
import GoogleButton from '../../LN-10-global/common/googleButton/default';
import useTermica from '../../../private/common/hooks/useTermica';

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
    const showListenButton =
        !useTermica('hide_listening_articles') && isListenable;

    const { name, mode, category } = distributor;

    const { photo, medio, authors, dataAuthor } = useSignature({
        creditsBy,
        position,
        contentElements
    });

    const authorId = get(creditsBy, '[0]._id', '');

    const showSignatureWithDistributor =
        (withFirmaDistributor && Boolean(name) && name !== 'lanacionar') ||
        (isExternalDistributor(name, category, authorId) && position === 'Top');

    const { audioPlayerProps = {} } = useAudioPlayer({ isListenable });
    const { thermicalAudio } = audioPlayerProps;
    const customVoice = isCustomVoice(dataAuthor);
    const showVariantIa = customVoice && thermicalAudio && authors.length <= 1;

    const { author } =
        !showSignatureWithDistributor && getAuthorsNameAndLink(authors);

    const hasAuthors =
        author || (authors.length > 0 && !showSignatureWithDistributor);

    const notShowSignature =
        !showSignatureWithDistributor && !authors?.length && !author;

    const hasVisibleContent =
        showSignatureWithDistributor || hasAuthors || showListenButton;
    const googleButtonClassName = cx('l-only', {
        'mb-24_m': !hasVisibleContent
    });
    const googleButton = <GoogleButton className={googleButtonClassName} />;

    const audioButton = (
        <AudioButton
            variant={showVariantIa ? 'ia' : 'default'}
            audioPlayerProps={audioPlayerProps}
            withAudio={withAudio}
            authorNames={author?.name}
            showTooltipVariantIA={showVariantIa}
            showListenButton={showListenButton}
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

    const classNameContainer =
        hasVisibleContent && signatureClasses({ position, subtype });

    return (
        <SignatureContextProvider>
            <div className={classNameContainer}>
                <div className="flex jc-between ai-center">
                    <SignatureWithDistributor
                        name={name}
                        mode={mode}
                        audioButton={audioButton}
                        showSignatureWithDistributor={
                            showSignatureWithDistributor
                        }
                        classNameSignature={cx(
                            position === place.Bottom && 'mb-32'
                        )}
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
                        showListenButton={showListenButton}
                        audioButton={audioButton}
                        showWithoutSignature={notShowSignature}
                    />
                    {googleButton}
                </div>
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
            name: PropTypes.string,
            mode: PropTypes.string
        }),
        withFirmaDistributor: PropTypes.bool,
        subtype: PropTypes.string
    }).isRequired
};

SignatureFeature.label = 'LN-Nota-Firma-V2';

export default Context(SignatureFeature);
