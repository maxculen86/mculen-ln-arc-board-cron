import React, { useId } from 'react';
import { useAppContext } from 'fusion:context';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import {
    mockBenefits,
    imgsIngredientsBackground,
    imgsPhoneFoodit
} from './helper';
import LoginSubscribeButtons from '../SubscribeLoginButton/foodit';
import { useNavigationData } from '../Header/hooks/useNavigationData';

export function SaleBox({ ...props }) {
    const { deployment, contextPath } = useAppContext();
    const { termicasData } = useNavigationData();

    const assetsPath = file =>
        deployment(
            `${contextPath}/resources/foodit/assets/images/saleBox/${file}`
        );

    return (
        <section className="bg-positive relative w-100vw as-center" {...props}>
            <div className="container relative pt-56 pb-0_md px-16 px-24_md px-32_lg grid grid-cols-12_md grid-cols-16_lg jc-center ai-center ai-start_md gap-24 gap-64_md">
                <div className="col-span-8 col-span-7_md col-span-9_lg flex flex-column gap-24 ai-center ai-start_md pb-56_md">
                    <Text
                        as="h2"
                        className="prumo prumo-semibold text-light-800 text-24 text-28_md text-center text-start_md"
                    >
                        Suscribite y empezá a cocinar con Foodit: fácil, rápido
                        y a tu manera.
                    </Text>
                    <div>
                        {mockBenefits.map(beneficts => (
                            <div
                                key={useId()}
                                className="flex ai-center roboto roboto-regular gap-4 mb-12 text-light-700"
                            >
                                <Icon className="text-light-700" size={20}>
                                    <IconSprite name="check" />
                                </Icon>
                                <Text as="p" className="text-16">
                                    <span
                                        // eslint-disable-next-line react/no-danger
                                        dangerouslySetInnerHTML={{
                                            __html: beneficts
                                        }}
                                    />
                                </Text>
                            </div>
                        ))}
                    </div>
                    <LoginSubscribeButtons
                        comesFrom="SaleBox"
                        termicasData={termicasData}
                    />
                </div>
                <div className="col-span-8 col-span-5_md col-span-7_lg js-center as-end">
                    <Adaptableimage
                        className="relative z-5"
                        sources={imgsPhoneFoodit(assetsPath)}
                        src={assetsPath('phone-foodit-mobile.webp')}
                        alt="Imagen celular con la app de Foodit abierta"
                        width={251}
                    />
                </div>
            </div>
            {imgsIngredientsBackground.map(({ className, asset }) => (
                <div key={useId()} className={className}>
                    <Adaptableimage
                        className="w-100"
                        src={assetsPath(asset)}
                        alt="Imagen de ingredientes para el fondo"
                    />
                </div>
            ))}
        </section>
    );
}
