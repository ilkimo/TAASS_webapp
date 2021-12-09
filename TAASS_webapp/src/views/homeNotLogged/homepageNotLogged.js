import React from 'react';
// nodejs library that concatenates classes

// react components for routing our app without refresh

// @material-ui/core components

// @material-ui/icons
// core components

import Header from '../../layout/MainLayout/Header';
import HomeSlider from './homeSlider';

export default function HomepageNotLogged(props) {
    const componentsStyle = {
        container: {
            overflow: 'auto',
            paddingTop: '100px'
        },
        body: {
            backgroundColor: '#FFFFFF'
        },
        brand: {
            color: '#4b4b4b'
        },
        title: {
            fontSize: '4.2rem',
            fontWeight: '600',
            display: 'inline-block'
        },
        subtitle: {
            fontSize: '1.313rem',
            textAlign: 'center'
        },
        main: {
            background: '#FFFFFF',
            position: 'relative',
            zIndex: '3'
        },
        mainRaised: {
            margin: '-60px 30px 0px',
            borderRadius: '6px',
            boxShadow: '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
            '@media (max-width: 830px)': {
                marginLeft: '10px',
                marginRight: '10px'
            }
        },
        link: {
            textDecoration: 'none'
        },
        textCenter: {
            textAlign: 'center'
        }
    };

    const { ...rest } = props;
    return (
        <div className={componentsStyle.body}>
            <main>
                <div className={componentsStyle.container}>
                    <div className={componentsStyle.textCenter}>
                        <h1 className={componentsStyle.title}>Why should you use DataHUB?</h1>
                        <h3 className={componentsStyle.subtxitle}>DataHUB is awesome.</h3>
                    </div>

                    <HomeSlider />
                </div>
            </main>

            <div className={componentsStyle.mainRaised}>CIAO</div>
        </div>
    );
}
