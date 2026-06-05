import React from 'react';
import { Link } from '@ln/contenidos-ui-link';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import InputSection from './searchInput';

function FirstSection() {
    return (
        <ul className="list flex flex-column gap-8 gap-0_l lg-none bg-light-100 --first-section">
            <li data-tw className="item mb-8 bg-white w-100">
                <div className="w-full">
                    <InputSection negative={false} />
                </div>
            </li>
            <li className="item border border-top border-thin border-light-300 bg-white">
                <Link
                    href="https://masmusica.lanacion.com.ar/"
                    target="_blank"
                    className="ai-center jc-between font-bold"
                    title="Ir a LN 104.9 + Música"
                >
                    <span className="inline-flex ai-center gap-8">
                        <Icon
                            hasWrapper
                            bgColor="var(--neutral-light-50)"
                            size={16}
                        >
                            <IconSprite
                                name="lnRadio"
                                fill="var(--neutral-light-800)"
                                critical
                            />
                        </Icon>
                        LN 104.9 + Música
                    </span>
                </Link>
            </li>
        </ul>
    );
}

export default FirstSection;
