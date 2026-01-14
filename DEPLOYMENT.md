# Deployment Guide

This guide covers multiple deployment options for your portfolio website.

## 🚀 Quick Deploy (Recommended)

### Option 1: Netlify (Easiest)

1. **Via Drag & Drop:**
   - Build the project: `npm run build`
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag your entire project folder
   - Done! Your site is live.

2. **Via Git (Recommended for updates):**
   ```bash
   # Initialize git repo if not already
   git init
   git add .
   git commit -m "Initial commit"
   
   # Push to GitHub/GitLab
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
   
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.` (root directory)
   - Deploy!

### Option 2: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /path/to/portfolio-test
vercel
```

Follow the prompts. Vercel will automatically detect your project and deploy.

### Option 3: GitHub Pages

1. Create a `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build CSS
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

2. Push to GitHub and enable Pages in repo settings.

## 🔧 Traditional Hosting

### Static File Hosting (Apache/Nginx)

1. Build the project:
```bash
npm run build
```

2. Upload these files to your web server:
   - `index.html`
   - `dist/output.css`
   - `src/main.js`
   - `assets/*` (all images)
   - `.gitignore` (optional)
   - `README.md` (optional)

3. Ensure your server serves `index.html` as the default page.

### AWS S3 + CloudFront

1. Build project: `npm run build`

2. Create S3 bucket:
```bash
aws s3 mb s3://charen-portfolio
aws s3 sync . s3://charen-portfolio --exclude "node_modules/*" --exclude ".git/*"
```

3. Enable static website hosting in S3 settings

4. (Optional) Set up CloudFront for CDN

## 🔐 Custom Domain Setup

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records as instructed

### Vercel
```bash
vercel domains add yourdomain.com
```

### GitHub Pages
1. Add `CNAME` file with your domain
2. Update DNS A records to GitHub's IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

## 📊 Performance Optimization

### Before Deployment

1. **Optimize Images:**
```bash
# Install imageoptim-cli (macOS) or similar
npm install -g imageoptim-cli
imageoptim ./assets/*.png
```

2. **Minify CSS:**
Already done with `npm run build`

3. **Enable Compression:**
Most hosting providers enable gzip/brotli by default.

### After Deployment

1. **Test with Lighthouse:**
```bash
# Install Lighthouse CLI
npm install -g @lhci/cli

# Run audit
lhci autorun --collect.url=https://yourdomain.com
```

2. **Enable CDN:**
- Netlify: Automatic
- Vercel: Automatic
- Others: Use Cloudflare

## 🔒 Security Headers (Optional)

Add these headers via your hosting provider:

```
Content-Security-Policy: default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Netlify
Create `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Vercel
Create `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 📝 Pre-Deployment Checklist

- [ ] Run `npm run build` for production CSS
- [ ] Update email link in footer (currently placeholder)
- [ ] Add actual resume link/file if needed
- [ ] Test all links work correctly
- [ ] Optimize images for web
- [ ] Test on multiple devices/browsers
- [ ] Run Lighthouse audit
- [ ] Set up Google Analytics (optional)
- [ ] Add favicon.ico (optional)
- [ ] Create Open Graph images (optional)

## 🎯 Post-Deployment

1. **Test the live site:**
   - Check all pages load
   - Verify responsive design
   - Test all interactive features
   - Verify links work

2. **Set up monitoring:**
   - Uptime Robot (free)
   - Google Analytics
   - Error tracking (Sentry)

3. **Share your portfolio:**
   - Update LinkedIn with site URL
   - Add to resume
   - Share on social media

## 🔄 Updating the Site

1. Make changes locally
2. Test: `npm run build && npm run serve`
3. Commit changes: `git commit -am "Update content"`
4. Push: `git push origin main`
5. Automatic deployment (if using Netlify/Vercel)

## 📱 Testing URLs

### Local Development
- http://localhost:8000

### Staging (if configured)
- https://staging.yourdomain.com

### Production
- https://yourdomain.com

---

Need help? Check the hosting provider's documentation:
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
