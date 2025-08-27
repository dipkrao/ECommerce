# PowerFuel Supplements - Ecommerce Website

A modern, responsive React.js ecommerce website for premium supplement products targeting gym enthusiasts, athletes, and sports people.

## 🚀 Features

### Core Functionality
- **User Authentication**: Complete login/signup system with form validation
- **Product Catalog**: Comprehensive product browsing with categories and search
- **Shopping Cart**: Full cart management with quantity updates and persistence
- **Checkout Process**: Secure checkout with shipping and payment forms
- **User Profiles**: Account management with order history and preferences

### Product Management
- **Product Categories**: Protein, Pre-workout, Vitamins, Amino Acids, Creatine, and more
- **Advanced Filtering**: Category, price range, and search functionality
- **Product Details**: Comprehensive product information with tabs and related products
- **Quick View**: Modal product preview for faster browsing

### User Experience
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Search & Navigation**: Intuitive navigation with search capabilities
- **Wishlist**: Save favorite products for later
- **Order Tracking**: View order history and status

## 🛠️ Technology Stack

- **Frontend**: React.js 18
- **Routing**: React Router DOM v6
- **State Management**: React Context API with useReducer
- **Styling**: CSS3 with CSS Variables and Flexbox/Grid
- **Icons**: React Icons (Font Awesome)
- **Responsive Design**: Mobile-first CSS with media queries

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation bar with search and cart
│   ├── Footer.js       # Site footer with links and info
│   ├── ProductCard.js  # Product display component
│   └── ...
├── contexts/           # React Context for state management
│   ├── AuthContext.js  # User authentication state
│   └── CartContext.js  # Shopping cart state
├── data/              # Mock data and utilities
│   └── products.js    # Product catalog data
├── pages/             # Main application pages
│   ├── Home.js        # Landing page with hero and features
│   ├── Products.js    # Product catalog with filters
│   ├── ProductDetail.js # Individual product page
│   ├── Cart.js        # Shopping cart management
│   ├── Checkout.js    # Checkout process
│   ├── Login.js       # User authentication
│   ├── Signup.js      # User registration
│   └── Profile.js     # User account management
└── styles/            # CSS files for components
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd supplement-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue (#2563eb) - Trust and professionalism
- **Secondary**: Orange (#f59e0b) - Energy and vitality
- **Accent**: Green (#10b981) - Health and wellness
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font Family**: Inter - Modern, readable sans-serif
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scalable typography across devices

### Layout
- **Grid System**: CSS Grid for responsive layouts
- **Flexbox**: Flexible component layouts
- **Breakpoints**: Mobile-first responsive design
- **Spacing**: Consistent spacing using CSS variables

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 0px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Large Desktop**: 1025px+

### Mobile Features
- Collapsible navigation menu
- Touch-friendly buttons and forms
- Optimized layouts for small screens
- Swipe gestures for mobile users

## 🔐 Authentication System

### Features
- **User Registration**: Email, password, and name validation
- **Password Strength**: Real-time password strength indicators
- **Form Validation**: Client-side validation with error messages
- **Session Management**: Persistent login with localStorage
- **Protected Routes**: Authentication-required pages

### Security
- Password hashing (simulated)
- Form validation and sanitization
- Secure session management
- Protected checkout process

## 🛒 Shopping Cart

### Features
- **Add/Remove Items**: Full cart management
- **Quantity Updates**: Increment/decrement quantities
- **Price Calculation**: Real-time total and shipping costs
- **Persistence**: Cart saved to localStorage
- **Cart Badge**: Visual indicator of cart items

### Cart Operations
- Add products to cart
- Update quantities
- Remove items
- Clear entire cart
- Calculate totals and shipping

## 💳 Checkout Process

### Steps
1. **Cart Review**: Review items and quantities
2. **Shipping Information**: Address and contact details
3. **Payment Details**: Credit card information
4. **Order Confirmation**: Success page and email

### Features
- Form validation
- Shipping cost calculation
- Payment processing simulation
- Order confirmation
- Email notifications (simulated)

## 📊 Product Management

### Categories
- **Protein**: Whey, Casein, Plant-based
- **Pre-Workout**: Energy blends and performance enhancers
- **Vitamins**: Multivitamins and supplements
- **Amino Acids**: BCAA, Glutamine, etc.
- **Creatine**: Performance and strength
- **Weight Gain**: Mass gainers and bulking
- **Hydration**: Electrolytes and recovery
- **Joint Health**: Support and recovery

### Product Information
- High-quality product images
- Detailed descriptions
- Key features and benefits
- Nutritional information
- Customer reviews and ratings
- Related products

## 🔍 Search & Filtering

### Search Features
- **Text Search**: Product name and description
- **Category Filtering**: Browse by supplement type
- **Price Range**: Filter by price brackets
- **Sorting Options**: Price, rating, name, featured

### Filter Options
- Category selection
- Price range sliders
- Search queries
- Sort preferences
- Reset filters

## 👤 User Profiles

### Profile Management
- **Personal Information**: Name, email, contact details
- **Address Management**: Shipping and billing addresses
- **Order History**: View past orders and status
- **Wishlist**: Saved products for later
- **Account Settings**: Password and preferences

### Features
- Edit profile information
- View order history
- Manage wishlist items
- Update account settings
- Change password

## 🎯 Target Audience

### Primary Users
- **Gym Enthusiasts**: Regular fitness center members
- **Athletes**: Professional and amateur athletes
- **Sports People**: Active individuals in various sports
- **Fitness Professionals**: Trainers and coaches

### User Needs
- High-quality supplement products
- Reliable product information
- Easy ordering and delivery
- Trusted brand reputation
- Competitive pricing

## 🚚 Shipping & Delivery

### Shipping Options
- **Free Shipping**: Orders over $50
- **Standard Shipping**: $5.99 (5-7 business days)
- **Express Shipping**: $12.99 (2-3 business days)

### Features
- Real-time shipping cost calculation
- Order tracking capabilities
- International shipping support
- Delivery notifications

## 🔒 Security & Privacy

### Data Protection
- Secure form submissions
- Protected user information
- Secure checkout process
- Privacy policy compliance

### Features
- SSL encryption (simulated)
- Secure payment processing
- User data protection
- Privacy controls

## 🧪 Testing

### Test Coverage
- Component functionality
- User interactions
- Form validation
- Responsive design
- Cross-browser compatibility

### Testing Tools
- React Testing Library
- Jest testing framework
- User interaction testing
- Responsive design testing

## 🚀 Deployment

### Build Process
1. **Production Build**: `npm run build`
2. **Static Files**: Generated in `build/` directory
3. **Hosting**: Deploy to any static hosting service

### Hosting Options
- **Netlify**: Easy deployment with Git integration
- **Vercel**: React-optimized hosting
- **AWS S3**: Scalable cloud hosting
- **GitHub Pages**: Free hosting for open source

## 🤝 Contributing

### Development Guidelines
- Follow React best practices
- Maintain consistent code style
- Write meaningful commit messages
- Test changes thoroughly
- Update documentation

### Code Standards
- ESLint configuration
- Prettier formatting
- Component documentation
- CSS organization
- Responsive design principles

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **Font Awesome**: For the icon library
- **Unsplash**: For product images
- **CSS Grid & Flexbox**: For modern layouts

## 📞 Support

For support and questions:
- **Email**: support@powerfuel.com
- **Documentation**: Check the code comments
- **Issues**: Report bugs via GitHub issues

---

**PowerFuel Supplements** - Fuel Your Performance! 💪
