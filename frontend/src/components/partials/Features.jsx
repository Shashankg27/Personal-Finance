import React from 'react';
import Cards from './Cards';

const Features = () => {
    const CardsData = [
        {title: "Smart Dashboard",
        discription:"Get insights into your income, expenses, and balance with interactive charts and real-time data.",
        icon: "fa-solid fa-chart-pie",
        color: "#3b82f6"
        },
        {title: "Transaction Management",
        discription:"Add, edit, and categorize transactions with advanced filtering and search capabilities.",
        icon: "fas fa-right-left",
        color: "#22c55e"
    },
    {title: "Goal Tracking",
        discription:"Set financial goals and track your progress with visual indicators and milestones.",
        icon: "fas fa-bullseye",
        color: "#a78bfa"
        },
        {title: "Investment tracking",
        discription:"Monitor your investments, track ROI, and manage your portfolio effectively.",
        icon: "fas fa-chart-line",
        color: "#facc15"
        },
        {title: "Budget Management",
        discription:"Set category budgets, receive alerts, and maintain spending discipline.",
        icon: "fas fa-piggy-bank",
        color: "#f472b6"
        },
        {title: "Reports & Exports",
        discription:"Generate detailed reports and export data in CSV or PDF formats.",
        icon: "fas fa-file-export",
        color: "#f97316"
        }
    ]
    return (
        <div className='bg-[#1f2937] py-5 text-white flex flex-col items-center gap-4' id="features">
            <p className='font-bold text-4xl text-center'>Powerful Features</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6 w-[90%]">
                {CardsData.map((card, index) => (
                    <Cards key={index} title={card.title} discription={card.discription} icon={card.icon} color = {card.color} />
                ))}
            </div>
        </div>
    );
};

export default Features;