# dhriti.dev — Portfolio Website

A terminal/dev-log themed personal portfolio built with plain HTML, CSS and JavaScript — no framework, no build step.

## Tech stack

- HTML5, CSS3 (custom properties, CSS Grid/Flexbox, no framework)
- Vanilla JavaScript (ES6+)
- [Devicon](https://devicon.dev/) for skill icons
- Netlify Forms for the contact form backend
- Deployed on [Netlify](https://www.netlify.com/)

## Project structure

```
.
├── index.html      # All page markup/sections
├── style.css       # All styling
├── script.js       # Nav, scroll reveal, typing effect, contact form handling
└── assets/         # Images (profile photo, project thumbnails, resume PDF)
```

## Running locally

No build tools or dependencies required.

1. Clone the repo
   ```
   git clone https://github.com/dhriti09/<repo-name>.git
   cd <repo-name>
   ```
2. Open `index.html` directly in a browser, or serve it locally:
   ```
   npx serve .
   ```

> Note: the contact form only works when served by Netlify (it depends on Netlify's form-detection and submission handling). Locally it will attempt the submission and show a "failed" state.

## Deployment

The site is deployed on Netlify:

1. Push changes to the connected Git branch
2. Netlify auto-builds (static site, no build command needed) and detects the `<form data-netlify="true">` in `index.html` at deploy time
3. Enable email notifications for form submissions under **Site settings → Forms → Form notifications** in the Netlify dashboard

## Author

**Dhriti Yadav**
Final-year B.Tech CSE student, United Institute of Technology, Prayagraj
- GitHub: [@dhriti09](https://github.com/dhriti09)
- LinkedIn: [dhriti-yadav](https://www.linkedin.com/in/dhriti-yadav-6614002a5)
- Email: dhritiyadav0919@gmail.com

## License

This project is personal portfolio source code. Feel free to reference it, but please don't republish it as your own portfolio content.
