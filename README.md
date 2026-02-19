# Bridge Remit

A modern remittance web application for sending money to Ethiopia. Built with Next.js, React, and Tailwind CSS.

## Features

### Core Features
- **Send Money** - Bank transfers and cash pickup to Ethiopia
- **Bill Payment** - Pay utilities, medical bills, school fees, and donations
- **Gift Packages** - Send thoughtful gift packages to loved ones in Ethiopia
- **Exchange Rates** - Real-time exchange rates from multiple Ethiopian banks

### User Management
- **Sign Up** - Create an account to save recipients
- **Sign In** - Access your account securely
- **Guest Mode** - Continue without creating an account (limited features)
- **Language Support** - English and Amharic languages

### Transaction Features
- **Bank Selection** - Choose from 6 Ethiopian banks
- **Account Lookup** - Verify recipient account details
- **Transaction History** - View all past transactions
- **Transaction Details** - Detailed view with receipt options

### Dashboard
- **Bank Exchange Rates** - Compare rates across different banks
- **Gift Package Management** - Admin can manage gift packages
- **Terms & Conditions** - Legal documentation
- **Privacy Policy** - Data protection policy
- **Help & Support** - FAQ and contact options

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context
- **Animations**: CSS transitions

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
cd bridge-remit

# Install dependencies
npm install

# Run development server
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── welcome/           # Welcome after signup
│   ├── signin/            # Sign in page
│   ├── signup/            # Sign up page
│   ├── send-money/        # Send money flow
│   ├── bill-payment/      # Bill payment flow
│   ├── gift-packages/     # Gift packages
│   ├── transactions/     # Transaction history
│   ├── notifications/     # Notifications
│   ├── settings/         # User settings
│   ├── dashboard/         # Admin dashboard
│   └── api/              # API routes
├── components/            # React components
├── lib/                  # Utilities and context
│   └── context/          # App and Language contexts
├── public/                # Static assets
└── tailwind.config.js     # Tailwind configuration
```

## Environment Variables

Create a `.env.local` file with the following:

```env
# Cybersource (for payment processing)
CYBERSOURCE_MERCHANT_ID=your_merchant_id
CYBERSOURCE_API_KEY=your_api_key
CYBERSOURCE_SECRET_KEY=your_secret_key

# AI Gateway (optional)
AI_GATEWAY_API_KEY=your_ai_gateway_key
```

## Supported Features

### Ethiopian Banks
- Commercial Bank of Ethiopia
- Dashen Bank
- Awash Bank
- Bank of Abyssinia
- United Bank
- Cooperative Bank of Ethiopia

### Bill Payment Categories
- Utilities (Electricity, Water, Telecom)
- Medical Bills
- School Fees
- Donations

### Gift Packages
- Birthday Surprise
- Holiday Joy
- Wedding Blessing
- New Baby Celebration
- Anniversary Special
- Custom Gift

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

Or connect your GitHub repository to Vercel for automatic deployments.
```
### View
https://bridge-bin-remit.vercel.app/


## License

This project is proprietary software for BiniSOG.
