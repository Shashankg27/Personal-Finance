import React from 'react';
import LandingNav from './partials/LandingNav';
import Hero from './partials/Hero';
import Features from './partials/Features';
import Pricing from './partials/Pricing';

const LandingPage = () => {
    return (
        <div className=''>
            <LandingNav />
            <Hero />
            <Features />
            <Pricing />
        </div>
    );
};

export default LandingPage;