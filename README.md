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

## TMDB setup

Create a local `.env.local` file from `.env.example` and set `EXPO_PUBLIC_TMDB_BEARER_TOKEN` to your TMDB API Read Access Token. The Home tab uses it to load the ten trending movies for the week.

`EXPO_PUBLIC_*` values are embedded in the client app and are not secrets at runtime. This direct TMDB integration is temporary and must be replaced by a backend proxy before the token can be treated as secret.
