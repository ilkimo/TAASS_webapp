import React from 'react';
// nodejs library that concatenates classes

// react components for routing our app without refresh

// @material-ui/core components

// @material-ui/icons
// core components

import Header from '../../layout/MainLayout/Header';
import HomeSlider from './homeSlider';

export default function HomepageNotLogged(props) {
    const { ...rest } = props;
    return (
        <div>
            <main>
                <div className="section white">
                    <div className="row container">
                        <div>
                            <h2 className="header">Parallax</h2>
                            <p className="grey-text text-darken-3 lighten-3">
                                Parallax is an effect where the background content or image in this case, is moved at a different speed than
                                the foreground content while scrolling.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="parallax-container">
                    <div className="parallax">
                        <HomeSlider />
                    </div>
                </div>
                <div>
                    <div>
                        <h1>Why should you use DataHUB?</h1>
                        <h3>DataHUB is awesome.</h3>
                    </div>

                    <HomeSlider />
                </div>
            </main>

            <div>CIAO</div>
        </div>
    );
}
