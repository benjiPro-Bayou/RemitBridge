# Bridge Remit - Remittance Application Specification

## 1. Project Overview

**Project Name**: Bridge Remit  
**Type**: Progressive Web App (PWA)  
**Deployment**: Vercel  
**Core Functionality**: Remittance application for sending money to Ethiopia with bill payment, gift packages, bank transfer, and cash pickup options.  
**Target Users**: Ethiopian diaspora sending money to family and friends in Ethiopia.

## 2. UI/UX Specification

### Color Palette
- **Primary Blue**: #1E40AF (Deep Blue)
- **Primary Green**: #059669 (Emerald Green)
- **Secondary Blue**: #3B82F6
- **Secondary Green**: #10B981
- **Background**: #F8FAFC
- **Surface**: #FFFFFF
- **Text Primary**: #1E293B
- **Text Secondary**: #64748B
- **Border**: #E2E8F0
- **Error**: #EF4444
- **Success**: #22C55E
- **Warning**: #F59E0B

### Typography
- **Font Family**: "DM Sans", sans-serif
- **Headings**: DM Sans Bold
- **Body**: DM Sans Regular
- **Sizes**:
  - H1: 32px
  - H2: 24px
  - H3: 20px
  - Body: 16px
  - Small: 14px
  - Caption: 12px

### Layout Structure
- Mobile-first design
- Bottom navigation with 3 tabs
- Card-based UI components
- Responsive breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### Bottom Navigation
1. **Home** (house icon) - Exchange rates, gift cards, promotional ads
2. **Transaction** (swap icon) - All transaction types as cards
3. **Settings** (gear icon) - Profile, password, language, terms

## 3. Page Specifications

### 3.1 Home Page
**Components**:
- Welcome banner with user greeting
- Exchange rate widget (ETH to various currencies)
- Quick action buttons (Send Money, Bill Pay, Gift)
- Featured gift packages carousel
- Promotional ads section
- Recent transactions preview (3 items)

### 3.2 Transaction Page
**Transaction Cards**:
1. **Bank Transfer** - Card with bank icon, "Send to Bank Account"
2. **Cash Pickup** - Card with location icon, "Cash Pickup Locations"
3. **Utility Payment** - Card with lightning icon, "Pay Utilities (Electricity, Water, Telecom)"
4. **Medical Payment** - Card with medical icon, "Medical Bills"
5. **School Fee** - Card with graduation cap, "School Fees"
6. **Donation** - Card with heart icon, "Donations to Charities"

### 3.3 Settings Page
**Sections**:
- Profile section (avatar, name, email)
- Edit profile button
- Change password
- Language selector (English, Amharic)
- Terms and conditions link
- Privacy policy link
- Logout button
- App version

### 3.4 Send Money Flow
**Steps**:
1. Select recipient from saved list or add new
2. Enter amount (sender currency)
3. Select delivery method (Bank/Cash Pickup)
4. Review exchange rate and fees
5. Payment via Cybersource
6. Confirmation with transaction ID

### 3.5 Bill Payment Flow
**Categories**:
- Utilities (Electricity, Water)
- Telecom (Ethio Telecom)
- Medical bills
- School fees
- Rent payments

**Steps**:
1. Select biller
2. Enter account/ID number
3. Enter amount
4. Confirm and pay via Cybersource

### 3.6 Gift Packages
**Categories**:
- Birthday gifts
- Holiday gifts
- Wedding gifts
- New baby gifts
- Custom amount gifts

## 4. Functionality Specification

### 4.1 Exchange Rate System
- Real-time rates display (mock data for demo)
- Rate history chart (7 days)
- Rate alerts subscription
- Multiple currency support (USD, EUR, GBP, AED)

### 4.2 Transaction Management
- Transaction history list
- Filter by type, date, status
- Transaction details view
- Download receipt (PDF)

### 4.3 Payment Processing (Cybersource Integration)
- Credit/Debit card payment
- Secure payment form
- Payment confirmation
- Error handling and retry

### 4.4 GL Account System
- Sender payment → Company GL account
- Settlement to local Ethiopian bank GL
- Receiver withdrawal from local bank
- Balance tracking

### 4.5 PWA Features
- Service worker for offline capability
- App manifest
- Install prompt
- Push notifications (optional)
- Offline transaction queue

## 5. Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Context + useState
- **PWA**: next-pwa
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion

## 6. File Structure

```
bridge-remit/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── home/
│   ├── transactions/
│   ├── settings/
│   ├── send-money/
│   ├── bill-payment/
│   ├── gift-packages/
│   └── api/
├── components/
│   ├── layout/
│   ├── ui/
│   ├── home/
│   ├── transactions/
│   └── settings/
├── lib/
│   ├── context/
│   ├── utils/
│   └── data/
├── public/
│   ├── manifest.json
│   └── icons/
└── package.json
```

## 7. AI Gateway Integration

- Already configured on Vercel
- API route for AI-powered features
- Smart recipient suggestions
- Fraud detection (future)
- Rate prediction (future)

## 8. Acceptance Criteria

1. ✅ PWA installable on mobile and desktop
2. ✅ Bottom navigation works correctly
3. ✅ All transaction types accessible from Transaction page
4. ✅ Exchange rates displayed on home page
5. ✅ Gift packages section available
6. ✅ Settings page with all options
7. ✅ Responsive design works on all devices
8. ✅ Blue and Green color scheme applied consistently
9. ✅ Cybersource payment form UI ready
10. ✅ Deployable to Vercel with PWA support
