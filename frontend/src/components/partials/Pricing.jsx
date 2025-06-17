import React from 'react'
import PlanCard from './PlanCard';

const Pricing = () => {
    const plans = [
        {
            type: "Basic",
            price: "Free",
            features: [ "Transaction tracking", "Basic budgeting", "Monthly reports" ],
            cta: "Get Started"
        },
        {
            type: "Pro",
            price: 9.99,
            features: [ "Everything in basic", "Investment tracking", "Goal management", "Advanced analytics" ],
            cta: "Start Free Trail"
        },
        {
            type: "Elite",
            price: 29.99,
            features: [ "Everything in pro", "Loan management", "Priority support", "Custom Categories" ],
            cta: "Upgrade to Elite"
        }
    ]
  return (
    <div className='bg-[#1f2937] py-5 text-white flex flex-col items-center gap-4'>
        <p className='font-bold text-4xl text-center'>Simple Pricing</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-6 w-[90%]">
                {plans.map((plan, index) => (
                    <PlanCard key={index} type={plan.type} price={plan.price} features={plan.features} cta = {plan.cta} />
                ))}
            </div>
    </div>
  )
}

export default Pricing
