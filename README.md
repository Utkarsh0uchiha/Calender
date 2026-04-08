# Interactive Wall Calendar

A fully responsive, interactive React wall calendar component heavily inspired by physical wall calendars. Built entirely with React, Vite, and Vanilla CSS.

## Features

1. **Wall Calendar Aesthetic**: Features a beautiful "flip page" 3D animation when changing months, a CSS-rendered spiral binding, and stunning CSS gradients mapped to each of the 12 months.
2. **Day Range Selector**: Lightweight custom implementation using `date-fns`. Click any date to select a start date. Click another to select an end date. The grid intelligently highlights the interval in between.
3. **Integrated Notes Section**: Allows users to take notes directly on the calendar interface. Implements strict persistence to tracking notes on a month-by-month basis using `localStorage`. 
4. **Mobile First & Fully Responsive**: Implements dynamic element stacking and scalable, highly fluid Typography (`clamp()`) to ensure no element is ever clipped, regardless of standard phone or desktop sizes.

## Design Choices

- **Vanilla CSS over Tailwind**: As per constraints, this project uses Vanilla CSS to demonstrate complete grasp over layouts, flex properties, native CSS variables (CSS logical properties), and advanced features like `perspective` and `transform-style: preserve-3d` without relying on bloated atomic utility classes.
- **Robust Network Fallback Gradients**: Using 12 unique month-specific CSS Gradients guarantees layout integrity even under restrictive proxy or VPN environments where remote hero images (e.g Unsplash) get blocked.
- **Vite & strict TypeScript**: Gives the project a blazing fast execution environment with type-safe operations.

## Running the Project Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Instructions

1. **Install Dependencies**
   Run the following command at the root of the project to install all required dependencies (React, Vite, date-fns, lucide-react):
   ```bash
   npm install
   ```
   *(Note: if you are behind a corporate proxy, append `--legacy-peer-deps` or use `npm config set strict-ssl false`)*

2. **Start the Development Server**
   Start your local Vite server:
   ```bash
   npm run dev
   ```

3. **View the Application**
   Open your browser and navigate to the localhost port provided in the terminal, which usually defaults to:
   ```
   http://localhost:5173
   ```
