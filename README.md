# Malladhi Motors Website

**Live URL (after deploy):** https://www.malladhimotors.com  
**Stack:** Pure HTML + CSS + JS — no build tools, no frameworks  

---

## 📁 File Structure

```
malladhi-motors-v2/
├── index.html        ← Home page
├── services.html     ← Services page
├── gallery.html      ← Before/After gallery
├── cars.html         ← Pre-owned cars listings
├── about.html        ← About us page
├── contact.html      ← Contact + booking form
├── style.css         ← All shared styles
├── shared.js         ← All shared JavaScript
├── logo.png          ← Your logo (already embedded in HTML too)
└── images/           ← Put your real photos here (create this folder)
    ├── gallery/
    │   ├── before-01.jpg
    │   ├── after-01.jpg
    │   └── ...
    └── cars/
        ├── skoda-slavia.jpg
        └── ...
```

---

## 🖼️ How to Replace Images with Real Photos

### Gallery (Before/After cards)

Open `gallery.html` and find each gallery card. The emoji placeholders look like:
```html
<div class="gallery-before" style="background:#122D3D;">🔨</div>
<div class="gallery-after"  style="background:#1A3D57;">✨</div>
```

Replace with your real photos:
```html
<div class="gallery-before">
  <img src="images/gallery/before-01.jpg" alt="Before repair" style="width:100%;height:230px;object-fit:cover;"/>
</div>
<div class="gallery-after">
  <img src="images/gallery/after-01.jpg" alt="After repair" style="width:100%;height:230px;object-fit:cover;"/>
</div>
```

### Car Listings

Open `cars.html` and find each car card. Replace the emoji:
```html
<div class="car-img" style="background:#1A2E45;">🚗</div>
```
With a real photo:
```html
<div class="car-img" style="background:#1A2E45;">
  <img src="images/cars/skoda-slavia.jpg" alt="Skoda Slavia" style="width:100%;height:144px;object-fit:cover;"/>
</div>
```

### Recommended image sizes
- Gallery before/after: **600 x 460px** (or similar landscape ratio)
- Car listing photo: **640 x 290px** (wide landscape)
- General tip: Compress all photos at https://squoosh.app before uploading

---

## 📧 Contact Form — Make it Actually Send Emails

The form currently shows a success message but doesn't send emails.  
To make it work, use **Formspree** (free, no backend needed):

1. Go to https://formspree.io and create a free account
2. Create a new form — you'll get an endpoint like `https://formspree.io/f/xabc1234`
3. Open `shared.js` and find the `contactForm` submit handler
4. Replace the simulated submit with:

```javascript
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const msg = document.getElementById('formMsg');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const data = new FormData(form);
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      msg.textContent = '✓ Thank you! We\'ll call you back shortly.';
      msg.style.color = '#2ECC71';
      btn.textContent = 'Message Sent ✓';
      form.reset();
    } else {
      msg.textContent = '✗ Something went wrong. Please call us directly.';
      msg.style.color = '#FF6B6B';
      btn.textContent = 'Try Again';
      btn.disabled = false;
    }
  });
}
```

---

## 📊 Google Analytics Setup

1. Go to https://analytics.google.com
2. Create an account → Create Property → Web → get your `G-XXXXXXXXXX` ID
3. Open `index.html` and find the commented-out Analytics block near the top `<head>`
4. Uncomment it and replace `G-XXXXXXXXXX` with your real ID:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

5. Copy the same block to all other pages (services.html, gallery.html, etc.)

---

## 🚀 Deployment — Vercel + GitHub

### Step 1: Push to GitHub
```bash
# In terminal, inside this folder
git init
git add .
git commit -m "Initial Malladhi Motors website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/malladhi-motors.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com → Sign in with GitHub
2. Click **"Add New Project"** → Import your `malladhi-motors` repo
3. Leave all settings as default (no build command needed — it's static HTML)
4. Click **Deploy** → you get a URL like `malladhi-motors.vercel.app`

### Step 3: Connect your domain (malladhimotors.com)
1. In Vercel: Go to your project → **Settings** → **Domains**
2. Add `www.malladhimotors.com` and `malladhimotors.com`
3. Vercel gives you DNS records to add
4. In your domain registrar (GoDaddy/Hostinger): Add those DNS records
5. Wait 10–30 minutes → your site is live at **www.malladhimotors.com** 🎉

---

## 🔧 How to Add or Update Car Listings

Open `cars.html` and copy-paste any car card block, then update the details:

```html
<div class="car-card reveal">
  <div class="car-img" style="background:#1A2E45;">
    <img src="images/cars/YOUR-CAR.jpg" alt="Car Name" style="width:100%;height:144px;object-fit:cover;"/>
    <div class="car-price-badge">₹XX.XL</div>
  </div>
  <div class="car-body">
    <div class="car-name">Car Name</div>
    <div class="car-meta"><span>Year</span><span>KM</span><span>Fuel</span><span>Transmission</span></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
      <a href="tel:8886378789" class="car-btn">📞 Call</a>
      <a href="https://wa.me/918886378789?text=Hi%2C+interested+in+Car+Name" target="_blank" class="car-btn" style="background:rgba(37,211,102,.15);color:#25D366;border-color:rgba(37,211,102,.3);">💬 WhatsApp</a>
    </div>
  </div>
</div>
```

---

## 📱 SEO Tips
- Update `<meta name="description">` on each page with specific, local keywords
- Add your business to **Google Business Profile** (maps.google.com/business)
- Register on **JustDial** and **IndiaMART** with your website URL
- Ask satisfied customers to leave Google Reviews

---

*Built for Malladhi Motors Pvt. Ltd. — Autonagar, Guntur, Andhra Pradesh*  
*GSTIN: 37AVEPM4666M1ZY*
