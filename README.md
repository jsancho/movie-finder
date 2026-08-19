# Movie Finder 🕵️‍♀️🍿

Movie Finder helps you decide what to watch next. Discover recent theatrical and streaming releases, explore recommendations shaped by your favourite genres, films, actors, and directors, and save titles to personal lists so past decisions stay easy to revisit.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

The app uses [React Navigation](https://reactnavigation.org/) with code-configured routes. The root navigator lives in `src/navigation`, and screens are organized under `src/features`.

The web build is a single-page app so `/` and `/explore` remain navigable URLs. When deploying it, configure the host to rewrite unknown routes to `index.html`.
