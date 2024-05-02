import React from 'react';

export const FalsePlaceHolderAudioPlayer = ({ isListenable }) =>
    isListenable && (
        <div className="btn-container l-only flex w-100 mb-32 ai-center transition transition-all transition-ease-in transition-duration-1000 min-h-56">
            <button
                className="button ln-button font-bold border border-thin rounded-4 gap-8 bg-blue-500 text-light-0 h-40 px-16 py-12 mr-16 --no-app --primary"
                title="Escuchar nota"
                type="button"
                disabled
            >
                <i className="icon --icon-24 --inherit">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <use href="/pf/resources/images/la-nacion-ar-sprite-default.svg?d=%24LATEST#headphone" />
                    </svg>
                </i>
                <span className="text ln-text">Escuchar</span>
            </button>
        </div>
    );
