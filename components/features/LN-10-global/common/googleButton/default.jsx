import React from 'react';
import { useAppContext } from 'fusion:context';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { cx } from '@ln/cva';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { openGoogleDiscoverFollow } from '../../../../private/LN/common/utils/shareHelper';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import { NOTICIA } from '../../../../private/common/utils/subtypes/subtypeHelper';

function GoogleButton({ className }) {
    const buttonClassName = cx('px-12 h-40', className);
    const { globalContent: { subtype } = {} } = useAppContext();
    const isNotaNoticia = subtype === NOTICIA;

    if (!isNotaNoticia) return null;

    return (
        <Button
            variant="secondary"
            dataEvent="LinkClick"
            dataSection="CompartirNotaLN"
            title="Seguir a LA NACION en Google"
            onClick={() => {
                openGoogleDiscoverFollow();
                addEventToDataLayerV2({
                    event: 'e_linkclick',
                    action: 'toolbard',
                    category: 'nota_ln9',
                    label: 'seguir_google'
                });
            }}
            className={buttonClassName}
            size="inherit"
            style={{
                borderColor: 'var(--neutral-light-100)',
                gap: '4px'
            }}
        >
            <Text
                style={{
                    textTransform: 'none',
                    fontWeight: '400'
                }}
                className="tracking-none text-14 text-neutral-light-900"
            >
                Seguir en
            </Text>
            <Icon color="inherit" height={26} width={26}>
                <IconSprite name="googleColor" color />
            </Icon>
        </Button>
    );
}

export default GoogleButton;
