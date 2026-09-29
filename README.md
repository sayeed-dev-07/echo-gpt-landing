# EchoGPT Landing Page

## Project overview

EchoGPT is a responsive, single-page landing page concept for an AI platform. It introduces the brand, showcases a rotating image gallery and a selection of AI models, and includes testimonials, an FAQ accordion, a call to action, and footer navigation.

## Setup instructions

### Requirements

- Node.js compatible with the installed Next.js version
- npm

### Install and run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Edit files under `sections/` to update the landing page sections; the page composition is in `app/page.tsx`.

### Other commands

```bash
npm run lint   # Run ESLint
npm run build  # Create a production build
npm run start  # Serve the production build
```

Run `npm run build` before `npm run start`.

## Technologies used

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- GSAP, including ScrollTrigger, SplitText, and `@gsap/react`, for animations
- Lenis for smooth scrolling
- Lucide React for icons
- `next/font` with Outfit and Righteous fonts

## Assumptions

- This is a visual landing page prototype. Model descriptions, testimonials, FAQ answers, and footer links are static content in the source code.
- The page does not include account management, model APIs, billing, contact submissions, or a content management system.
- The hero and call-to-action links point to the EchoGPT web app at `https://echo-gpt-six.vercel.app/`.
- Gallery artwork is loaded from external Pinterest image URLs, so those images depend on third-party availability and network access.
- Footer links currently use placeholder `#` destinations.

## Additional features implemented

- Intro animation that plays once per browser session when session storage is available
- Responsive hero typography that adjusts to its container size
- GSAP entrance, scroll-triggered, and text-splitting animations
- Three continuously moving gallery rows
- Smooth scrolling with Lenis, including a scroll-dimension refresh after FAQ items expand or collapse
- Animated FAQ accordion with synchronized ScrollTrigger refresh
- Responsive model, testimonial, call-to-action, and footer layouts
