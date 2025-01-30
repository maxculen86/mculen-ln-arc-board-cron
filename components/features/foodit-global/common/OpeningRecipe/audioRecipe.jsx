import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@ln/common-ui-dialog';
import { Button } from '@ln/foodit-ui-button';
import { Text } from '@ln/common-ui-text';
import { Icon } from '@ln/common-ui-icon';
import { useDisclosure } from '@ln/hooks';
import { Image } from '@ln/foodit-ui-image';
import { cx } from '@ln/cva';
import { AnimatedIcons } from '@ln/contenidos-ui-animatedicons';
import useGetUserConfig from '../../hooks/useGetUserConfig';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import EmptyState from '../emptyState/foodit';
import { getVariantBarrier } from '../emptyState/helpers';
import { AudioFoodit } from '../AudioFoodit/foodit';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

function AudioRecipe({ title, resizedUrl, url, article }) {
    const { isOpen, onOpen, onClose } = useDisclosure(false);
    const { userType, isSubscribed } = useGetUserConfig();
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const classContainer = cx(
        'mx-auto',
        isSubscribed
            ? 'pt-16 pb-16 pb-24_md pb-32_lg px-16 px-24_md px-32_lg w-100 w-520_md shadow-up-md'
            : 'p-16 p-24_md p-32_lg w-360 min-w-720_md min-w-944_lg bg-positive'
    );

    const defaultText = 'Escuchar preparación';
    const text = isOpen ? 'Escuchando preparación' : defaultText;
    const position = isSubscribed ? 'bottom' : 'center';

    const handleClick = () => {
        onOpen();
        addEventToDataLayerV2({
            event: 'page_listened',
            origin: 'receta',
            title,
            rest: {
                autor_nombre: article?.credits?.by[0]?.name || 'N/A',
                nota_id_arc: article?._id || 'N/A',
                seccion: 'ficha_receta'
            }
        });
    };

    return (
        <>
            <div className="flex ai-center gap-8">
                <Button
                    style={{ padding: '8px 16px' }}
                    title="escuchar receta"
                    variant="secondary"
                    onClick={handleClick}
                    className="flex ai-center gap-8"
                >
                    {isOpen ? (
                        <AnimatedIcons
                            name="logo-listen"
                            height={20}
                            width={20}
                            fill="var(--secondary-positive)"
                            stopAnimation={!isAudioPlaying}
                        />
                    ) : (
                        <Icon size={16}>
                            <IconSprite name="play" />
                        </Icon>
                    )}
                    <Text as="p" className="roboto roboto-bold text-12">
                        {text}
                    </Text>
                </Button>
            </div>
            <Dialog
                isOpen={isOpen}
                onClose={onClose}
                position={position}
                classnames={{
                    base: classContainer,
                    wrapper: 'flex flex-column gap-12'
                }}
                overlay
                closeOnClickOutside
            >
                <Dialog.Header className="flex flex-column ai-end">
                    <Button
                        onClick={onClose}
                        variant="link"
                        title="Cerrar"
                        aria-label="Cerrar"
                    >
                        <Icon>
                            <IconSprite name="close" />
                        </Icon>
                    </Button>
                </Dialog.Header>
                <Dialog.Body>
                    {isSubscribed ? (
                        <>
                            <div className="flex ai-center gap-8">
                                <Image
                                    alt={title}
                                    src={resizedUrl || url}
                                    className="w-80 ratio-1-1"
                                    fetchPriority="high"
                                    loading="eager"
                                />
                                <Text
                                    className="prumo prumo-semibold text-18"
                                    text={title}
                                    as="p"
                                />
                            </div>
                            <AudioFoodit
                                setIsAudioPlaying={setIsAudioPlaying}
                                article={article}
                            />
                        </>
                    ) : (
                        <EmptyState
                            variant={getVariantBarrier(userType)}
                            className="pt-40 pt-48_md pt-56_lg"
                            direction="column"
                        />
                    )}
                </Dialog.Body>
            </Dialog>
        </>
    );
}

AudioRecipe.propTypes = {
    title: PropTypes.string.isRequired,
    resizedUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    article: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        credits: PropTypes.shape({
            by: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired
};

export default AudioRecipe;
