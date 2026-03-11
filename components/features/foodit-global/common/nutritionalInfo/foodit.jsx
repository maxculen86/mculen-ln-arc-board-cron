import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Tooltip } from '@ln/common-ui-tooltip';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { NutritionalInfoCard } from './component/cardInfo';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { Carousel } from '../../../../chains/foodit-global/common/Carousel/foodit';
import { useNavigationData } from '../Header/hooks/useNavigationData';

export function NutritionalInfo({ globalContent = {} }) {
    const {
        termicasData: { show_nutritional_info: showNutritionalInfo } = {}
    } = useNavigationData();

    const {
        promo_items: {
            nutritional_information: {
                embed: {
                    config: {
                        items: {
                            calories: cal,
                            carbohydrates: carbs,
                            totalFat: fat,
                            protein: prot,
                            sodium: sod,
                            fiber: fib
                        } = {}
                    } = {}
                } = {}
            } = {}
        } = {},
        label: { info_nutricional: { text = '' } = {} } = {}
    } = globalContent;

    const visibilityMap = new Map([
        ['true', true],
        ['false', false]
    ]);
    const shouldShowNutritionalInfo =
        visibilityMap.get(showNutritionalInfo) ??
        (!text || text?.toLowerCase()?.trim() !== 'ocultar');

    const nutritionalValues = [cal, carbs, fat, prot, sod, fib];
    const allValuesAreValid = nutritionalValues.every(
        value => value !== null && value !== undefined && value !== ''
    );

    const nutritionalInfo = [
        {
            title: 'Calorías',
            cant: cal?.toString() || null,
            udm: 'kcal'
        },
        {
            title: 'Carbohidratos',
            cant: carbs?.toString() || null,
            udm: 'g'
        },
        {
            title: 'Grasa total',
            cant: fat?.toString() || null,
            udm: 'g'
        },
        {
            title: 'Proteína',
            cant: prot?.toString() || null,
            udm: 'g'
        },
        {
            title: 'Sodio',
            cant: sod?.toString() || null,
            udm: 'mg'
        },
        {
            title: 'Fibra',
            cant: fib?.toString() || null,
            udm: 'g'
        }
    ];
    if (!allValuesAreValid || !shouldShowNutritionalInfo) return null;

    return (
        <div className="flex flex-column gap-24">
            <div
                className="flex ai-center gap-24 roof-sticky py-12 py-0_md"
                style={{ position: 'static' }}
            >
                <Text className="roof-text-sticky pl-16 pl-0_md">
                    Información nutricional por porción
                </Text>
                <Tooltip
                    position="top-center"
                    toggleOn="click"
                    style={{ maxWidth: '198px' }}
                    content={
                        <span className="text-12 flex">
                            La información mostrada es una estimación en base a
                            los ingredientes y la preparación disponibles. No
                            debe considerarse un sustituto del consejo de un
                            nutricionista profesional.
                        </span>
                    }
                    classnames={{
                        container: 'flex',
                        tooltip:
                            'bg-secondary-positive text-light-1 text-12 border border-all border-thin border-light-100'
                    }}
                >
                    <Button variant="link" title="Mostrar tooltip">
                        <Icon size={24}>
                            <IconSprite name="info" fill="#B3B3B3" />
                        </Icon>
                    </Button>
                </Tooltip>
            </div>
            <Carousel type="nutritional">
                {nutritionalInfo.map(({ title, cant, udm }) => (
                    <NutritionalInfoCard
                        key={title}
                        title={title}
                        cant={cant}
                        udm={udm}
                    />
                ))}
            </Carousel>
        </div>
    );
}
