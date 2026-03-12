import React from 'react';
import { Badge } from '@ln/contenidos-ui-badge';
import { Text } from '@ln/contenidos-ui-text';
import { cx } from '@ln/cva';

function OpeningDescription({ data = {} }) {
    if (!data || !data.title) return null;

    const { subheadline, title, badge } = data;

    return (
        <div className="grid-col-1-7_md grid-col-1-6_md grid-col-1-8_lg grid-row-1_md">
            <div className="flex flex-column ai-start jc-center px-16 gap-16 h-100 px-0_m">
                {badge && <Badge text="en vivo" type="live" />}
                <div
                    className={cx(
                        'flex flex-column text-neutral-light-1 gap-16',
                        { 'pt-16 pt-0_m': !badge }
                    )}
                >
                    <Text
                        as="h1"
                        font="prumo"
                        weight="bold"
                        className="prumo text-28 text-32_md text-40_lg text-48_xl"
                    >
                        {title}
                    </Text>
                    <Text as="p" className="text-18">
                        {subheadline}
                    </Text>
                </div>
            </div>
        </div>
    );
}

export default OpeningDescription;
