import React, { useState } from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Text } from '@ln/common-ui-text';
import { Icon } from '@ln/common-ui-icon';
import { useDisclosure } from '@ln/hooks';
import { Image } from '@ln/foodit-ui-image';
import { AnimatedIcons } from '@ln/contenidos-ui-animatedicons';
import useGetUserConfig from '../../hooks/useGetUserConfig';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { AudioFoodit } from '../AudioFoodit/foodit';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import { DialogFoodit } from '../DialogFoodit/foodit';

function AudioRecipe({ title, resizedUrl, url, article }) {
    const { isOpen, onOpen, onClose } = useDisclosure(false);
    const { userType, isSubscribed } = useGetUserConfig();
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const defaultText = 'Escuchar preparación';
    const text = isOpen ? 'Escuchando preparación' : defaultText;

    const handleClick = () => {
        onOpen();
        if (isSubscribed) {
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
        }
    };

    return (
        <>
            <div className="flex ai-center gap-8">
                <Button
                    style={{ padding: '8px 16px' }}
                    title="escuchar receta"
                    variant="secondary"
                    onClick={handleClick}
                    className="flex ai-center gap-8 min-h-40_lg"
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
            <DialogFoodit
                isOpen={isOpen}
                onClose={onClose}
                isSubscribed={isSubscribed}
                userType={userType}
            >
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
            </DialogFoodit>
        </>
    );
}

export default AudioRecipe;
