# Charen's Product Design Portfolio

A fully responsive, modern portfolio website showcasing product design work with a focus on AI-powered access management solutions.

## 🚀 Features

- **Fully Responsive**: Optimized for mobile (320px+), tablet (768px+), and desktop (1024px+) viewports
- **Modern Design**: Clean, minimal aesthetic matching Figma design specifications
- **Custom Typography**: Source Serif Pro and Source Code Pro fonts from Google Fonts
- **Smooth Interactions**: Hover effects, smooth scrolling, and subtle animations
- **Semantic HTML**: Proper accessibility with ARIA labels and semantic elements
- **Fast Performance**: Optimized CSS with Tailwind purging and lazy-loaded images

## 📁 Project Structure

```
portfolio-test/
├── index.html              # Main HTML file
├── tailwind.config.js      # Tailwind configuration with custom design tokens
├── package.json            # Dependencies and build scripts
├── src/
│   ├── input.css          # Tailwind directives and custom CSS
│   └── main.js            # Interactive functionality
├── dist/
│   └── output.css         # Compiled CSS (generated)
└── assets/                # Images
    └── *.png              # Project and profile images
```

## 🛠️ Setup & Development

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Build the CSS (production):
```bash
npm run build
```

3. Development mode (watch for changes):
```bash
npm run dev
```

4. Start local server:
```bash
npm run serve
```
Then open http://localhost:8000 in your browser.

## 🎨 Design System

### Color Palette
- **Accent Magenta**: #AB0782
- **Accent Blue**: #0034AD
- **Accent Yellow**: #6E660A
- **Accent Purple**: #5F00AD
- **Divider Grey**: #4F4F4F
- **Background**: #FFFFFF
- **Text Primary**: #000000

### Typography Scale
- **Heading**: 50px / Light (300) / 1.2 line-height / -2.25px letter-spacing
- **Body**: 24px / Regular (400) / 1.52 line-height / -1.08px letter-spacing
- **Caption**: 16px / Medium (500) / 1.03 line-height / -0.72px letter-spacing

### Responsive Breakpoints
- **Mobile**: 320px - 767px (single column, scaled typography)
- **Tablet**: 768px - 1023px (adjusted spacing)
- **Desktop**: 1024px+ (two-column project layout)

## 📱 Responsive Features

- Navigation collapses to mobile menu on small screens
- Project cards stack vertically on mobile, side-by-side on desktop
- Typography scales down on mobile (50px → 32px for headings)
- Padding reduces from 50px/80px to 20px/40px on mobile
- Images maintain aspect ratios across all viewports

## ✨ Interactive Features

- **Smooth Scrolling**: Anchor links scroll smoothly to sections
- **Mobile Menu**: Toggle navigation on mobile devices
- **Hover Effects**: Buttons and links have smooth transitions
- **Fade-in Animations**: Project sections fade in on scroll
- **Button Transforms**: Subtle scale effect on hover

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Content Sections

1. **Navigation**: Fixed header with profile image and links
2. **Hero**: Introduction and professional background
3. **Projects**: Three featured projects with distinct color themes
4. **Footer**: Contact links and copyright

## 🔧 Customization

To customize the design:

1. **Colors**: Edit `tailwind.config.js` → `theme.extend.colors`
2. **Typography**: Modify `tailwind.config.js` → `theme.extend.fontSize`
3. **Spacing**: Adjust `tailwind.config.js` → `theme.extend.spacing`
4. **Custom Styles**: Add to `src/input.css`

## 📦 Production Build

For production deployment:

```bash
npm run build
```

This generates optimized, minified CSS in `dist/output.css`.

## 📄 License

MIT License - feel free to use this template for your own portfolio!

---

Built with ❤️ using Vanilla HTML/JavaScript and Tailwind CSS
