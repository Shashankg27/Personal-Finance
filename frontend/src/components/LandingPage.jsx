import React from 'react';
import LandingNav from './partials/LandingNav';
import Hero from './partials/Hero';
import Features from './partials/Features'

const LandingPage = () => {
    return (
        <div className=''>
            <LandingNav />
            <Hero />
            <Features />
        </div>
    );
};

export default LandingPage;