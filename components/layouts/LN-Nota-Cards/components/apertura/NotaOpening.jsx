import React from 'react';
import OpeningContent from './OpeningContent';
import OpeningMeta from './OpeningMeta';

function NotaOpening({ children }) {
    return (
        <div>
            <div className="bg-neutral-dark-1 w-100 h-65 -mt-65 h-86_md -mt-87_m h-56_l mt-0_l" />
            <div className="lay">
                <div className="grid grid-cols-12_m grid-cols-16_lg">
                    <div className="grid-col-2-12_m grid-col-3-15_lg">
                        <section
                            data-tw
                            className="flex flex-column jc-center ai-center pt-48 gap-16 pt-64_m"
                        >
                            {children}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

NotaOpening.Content = OpeningContent;
NotaOpening.Meta = OpeningMeta;

export default NotaOpening;
