import React from 'react';
import Link from '../../../ui/ln/link/default';
import Icon from '../../../ui/ln/icon/default';
import Button from '../../../ui/ln/button/default';
import { WrapperBody } from '../wrapperBody/default';

const RECIRCULATION_ID = 'n_interstitial';

function Interstitial({ data = {} }) {
    const { url, content } = data;

    if (!url || !content) return null;

    return (
        <WrapperBody className="mb-64">
            <div className="flex jc-center items-center">
                <Button
                    asChild
                    variant="outline"
                    size="custom"
                    color="secondary"
                    className="py-12 px-16 ds-custom-interstitial"
                >
                    <Link
                        target="_blank"
                        href={url}
                        title={content}
                        data-mrf-recirculation={RECIRCULATION_ID}
                    >
                        {content}
                        <Icon name="arrow-right" size={20} />
                    </Link>
                </Button>
            </div>
        </WrapperBody>
    );
}

Interstitial.arcType = 'interstitial_link';
Interstitial.isStatic = true;

export default Interstitial;
