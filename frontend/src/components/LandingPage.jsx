import React, { useState } from 'react';
import LandingNav from './partials/LandingNav';
import Hero from './partials/Hero';
import Features from './partials/Features';
import DashboardPreview from './partials/DashboardPreview';
import Pricing from './partials/Pricing';
import Promotion from './partials/Promotion';
import Footer from './partials/Footer';

const LandingPage = () => {
    const [popUp, setPopUp] = useState(false);

    return (
        <div className=''>
            <LandingNav />
            <Hero popUp={popUp} setPopUp={setPopUp}/>
            <Features />
            <DashboardPreview/>
            <Pricing  popUp={popUp} setPopUp={setPopUp}/>
            <Promotion  popUp={popUp} setPopUp={setPopUp}/>
            <Footer />
        </div>
    );
};

export default LandingPage;