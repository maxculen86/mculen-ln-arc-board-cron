import React from 'react';

// TODO: investigar componte de ARC "social link"
export default function html() {
    return (
        <div className="externo">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/zIY87vU33aA"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
            <blockquote className="twitter-tweet">
                <p lang="und" dir="ltr">
                    ᵒᵒᶠ{' '}
                    <a href="https://t.co/WslAeSvMFg">
                        pic.twitter.com/WslAeSvMFg
                    </a>
                </p>
                &mdash; 🥖 Kéké 🥖 (@Kekeflipnote){' '}
                <a href="https://twitter.com/Kekeflipnote/status/1193619442636337158?ref_src=twsrc%5Etfw">
                    November 10, 2019
                </a>
            </blockquote>{' '}
            <script
                async
                src="https://platform.twitter.com/widgets.js"
                charset="utf-8"
            ></script>
        </div>
    );
}
