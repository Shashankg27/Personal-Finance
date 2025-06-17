import React from 'react'
import PlanCard from './PlanCard';
import PopUp from './PopUp';

const Pricing = ( {popUp, setPopUp} ) => {
    const plans = [
        {
            type: "Basic",
            price: "Free",
            features: [ "Transaction tracking", "Basic budgeting", "Monthly reports" ],
            cta: "Get Started",
            mp: false
        },
        {   
            type: "Pro",
            price: 9.99,
            features: [ "Everything in basic", "Investment tracking", "Goal management", "Advanced analytics" ],
            cta: "Start Free Trail",
            mp: true
        },
        {
            type: "Elite",
            price: 19.99,
            features: [ "Everything in pro", "Loan management", "Priority support", "Custom Categories" ],
            cta: "Upgrade to Elite",
            mp: false
        }
    ]
  return (
    <div className='bg-[#1f2937] py-5 text-white flex flex-col items-center gap-4' id='pricing'>
        {popUp && <PopUp  popUp={popUp} setPopUp={setPopUp} />}
        <p className='font-bold text-4xl text-center'>Simple Pricing</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-6 w-[90%]">
                {plans.map((plan, index) => (
                    <PlanCard key={index} type={plan.type} price={plan.price} features={plan.features} cta = {plan.cta} mp={plan.mp} popUp={popUp} setPopUp={setPopUp} />
                ))}
            </div>
    </div>
  )
}

export default Pricing
