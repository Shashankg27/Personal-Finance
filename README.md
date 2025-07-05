# Personal Finance Management

This project is a personal finance management tool designed to help users track their investments, incomes, and expenses. It provides an organized way to monitor financial activities, analyze spending habits, and make informed decisions for better financial health.

## Features

- Track multiple sources of income
- Record and categorize expenses
- Monitor and manage investments
- Generate financial summaries and reports

## Tech Stack

- MERN
- TailwindCSS

## Future Updates

🌐 Multi-Currency Support
Easily manage finances in different currencies. Add income, expenses, and categories in your preferred currency, and switch between them seamlessly.

🌗 Dark/Light Mode
Switch between dark and light themes based on your preference or system settings. Enjoy a more comfortable viewing experience anytime, anywhere.

⏰ Bill Reminders
Never miss a due date! Set reminders for upcoming bills and get notified before payments are due—helping you stay on top of your finances.

🔄 Smart Recurring Detection (Planned Feature)
In a future update, FinanceBuddy will include an intelligent auto-recurring detection system that simplifies category setup by identifying common income types and automatically configuring their recurrence frequency.

📌 Feature Overview:
When a user adds a new Income Category, the system will:

Analyze the Category Name (e.g., “Salary”, “Freelance”, “Rent”, etc.)

Match it against a predefined list of known income sources

Automatically assign a recurrence interval (e.g., every 30 days for “Salary”)

🧠 How it Works:
The system will include a smart rule-based engine or keyword matcher that:

Recognizes key terms like Salary, Stipend, Pension as Monthly Recurring

Recognizes terms like Freelance, Bonus, Dividend as Non-recurring or User-defined

Automatically toggles the "Recurring" checkbox and sets a default recurrence period, e.g., 30 days, if applicable

🔧 Example:
If a user creates a new category with:

Type: Income

Category Name: “Salary”

Then:

The Recurring checkbox is auto-enabled

The system sets the recurrence interval to every 30 days

⚙️ Planned Enhancements:
Users can still manually adjust the recurrence toggle and interval

Future implementation may include natural language processing (NLP) for smarter categorization

Optional user training model to improve predictions based on previous behavior

