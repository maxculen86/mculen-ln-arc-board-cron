import React from 'react';
import { Tabs } from '@ln/ds-common-tabs';
import { Steps } from './steps';
import { Ingredients } from './ingredients';

export function TabsCookMode({ steps = [], ingredients = [], audio }) {
    const titleTabs = [
        { value: 'steps', label: 'Paso a paso' },
        { value: 'ingredients', label: 'Ingredientes' }
    ];
    return (
        <div className="flex flex-col flex-1 min-h-0 md:flex-row md:gap-24 md:pb-8 xl:pb-16 xl:gap-32">
            <aside className="hidden md:flex md:flex-col md:w-232 xl:w-208 md:shrink-0 md:overflow-y-auto md:border md:border-muted">
                <ul className="flex flex-col gap-16 p-12 font-secondary">
                    <p className="text-body-md font-bold">Ingredientes</p>
                    <Ingredients ingredients={ingredients} />
                </ul>
            </aside>
            <Tabs
                className="flex flex-col flex-1 min-h-0 gap-12 md:h-487"
                defaultValue="steps"
            >
                <Tabs.List className="md:hidden w-full font-bold border-b border-muted gap-16 uppercase text-base-default">
                    {titleTabs.map(({ value, label }) => (
                        <Tabs.Trigger
                            key={value}
                            className="uppercase [&.ds-tabs-trigger]:font-bold pb-8 border-b-2 border-transparent data-[active=true]:border-accent-default data-[active=true]:text-accent-default"
                            value={value}
                        >
                            {label}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                <Tabs.Content
                    className="flex flex-col flex-1 min-h-0 font-secondary"
                    value="steps"
                >
                    <Steps steps={steps} audio={audio} />
                </Tabs.Content>

                <Tabs.Content value="ingredients">
                    <ul className="flex flex-col gap-16 p-12 border border-muted font-secondary">
                        <Ingredients ingredients={ingredients} />
                    </ul>
                </Tabs.Content>
            </Tabs>
        </div>
    );
}
