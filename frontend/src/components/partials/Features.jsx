import React from 'react';
import Cards from './Cards';

const Features = () => {
    const CardsData = [
        {title: "Smart Dashboard",
         discription:"Get insights into your income, expenses, and balance with interactive charts and real-time data."
        },
        {title: "Transaction Management",
         discription:"Add, edit, and categorize transactions with advanced filtering and search capabilities."
        },
        {title: "Goal Tracking",
         discription:"Set financial goals and track your progress with visual indicators and milestones."
        },
        {title: "Investment tracking",
         discription:"Monitor your investments, track ROI, and manage your portfolio effectively."
        },
        {title: "Budget Management",
         discription:"Set category budgets, receive alerts, and maintain spending discipline."
        },
        {title: "Reports & Exports",
         discription:"Generate detailed reports and export data in CSV or PDF formats."
        }
    ]
    return (
        <div className='bg-[#1f2937] h-150 py-5 text-white text-center '>
            <p className='font-bold text-4xl'>Powerful Features</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-6">
      {CardsData.map((card, index) => (
        <Cards key={index} title={card.title} discription={card.discription} />
      ))}
    </div>
        </div>
    );
};

export default Features;