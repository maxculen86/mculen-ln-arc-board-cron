import React from 'react';
import Breadcrumb from '../../../ui/ln/breadcrumb/default';
import { BreadcrumbItem } from './components/BreadcrumbItem';

export function BreadcrumbBase({ sections, dataSection, lastLinked, host }) {
    const extraOpts = dataSection
        ? {
              'data-section': dataSection,
              'data-event': 'LinkClick'
          }
        : {};

    return (
        <Breadcrumb className="--no-app">
            <Breadcrumb.List>
                {sections.map(({ id, path, name }, i) => {
                    const isLastItem = i === sections.length - 1;

                    return (
                        <React.Fragment key={path}>
                            {i !== 0 && (
                                <Breadcrumb.Separator className="text-base-light text-label-sm font-normal" />
                            )}
                            <BreadcrumbItem
                                isLastItem={isLastItem}
                                lastLinked={lastLinked}
                                id={id}
                                path={path}
                                name={name}
                                host={host}
                                extraOpts={extraOpts}
                            />
                        </React.Fragment>
                    );
                })}
            </Breadcrumb.List>
        </Breadcrumb>
    );
}
