import React from 'react';
import LandingNav from './partials/LandingNav';
import Hero from './partials/Hero';
import Features from './partials/Features';
import DashboardPreview from './partials/DashboardPreview';
import Pricing from './partials/Pricing';
import Promotion from './partials/Promotion';
import Footer from './partials/Footer';

const LandingPage = () => {
    return (
        <div className=''>
            <LandingNav />
            <Hero />
            <Features />
            <DashboardPreview/>
            <Pricing />
            <Promotion />
            <Footer />
        </div>
    );
};

export default LandingPage;