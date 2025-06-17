import React from 'react';
import LandingNav from './partials/LandingNav';
import Hero from './partials/Hero';
import Features from './partials/Features';
import DashboardPreview from './partials/DashboardPreview';

const LandingPage = () => {
    return (
        <div className=''>
            <LandingNav />
            <Hero />
            <Features />
            <DashboardPreview/>
        </div>
    );
};

export default LandingPage;