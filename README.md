# Mohammed Pathariya Portfolio

Personal portfolio website for Mohammed Pathariya, focused on machine learning, AI engineering, data science, and full-stack project work.

Live site: [mjpathariya.com](https://mjpathariya.com)

## Repository structure

```text
frontend/   React static site deployed on Vercel
backend/    Express API for the portfolio chatbot, deployed separately
docs/       Revamp plan, decisions, and implementation status
```

The frontend and backend currently use separate deployments. The chatbot backend is not required for the portfolio page itself to render.

## Frontend setup

```bash
cd frontend
npm install
npm start
```

The development site runs at `http://localhost:3000`.

Create a production build with:

```bash
npm run build
```

The generated `frontend/build/` directory is disposable and should not be committed.

For local chatbot requests, copy `frontend/.env.example` to `frontend/.env.local` and set `REACT_APP_API_BASE_URL` to the backend URL you want to use. Vercel must have the same `REACT_APP_API_BASE_URL` value configured for production builds.

## Portfolio content validation

The canonical portfolio data lives in `content/portfolio.json`. Validate its required fields, stable IDs, dates, links, and referenced public assets with:

```bash
node scripts/validate-portfolio-content.js
```

Validate referenced frontend assets with:

```bash
node scripts/validate-frontend-assets.js
```

The frontend generator and backend loader both consume this source. Run the validators after content changes, then rebuild the frontend and restart the backend to apply them.

## Backend setup

```bash
cd backend
npm install
npm start
```

The backend runs on port `5000` by default. Set `PORT` to use another port.

Create `backend/.env` locally with:

```text
OPENAI_API_KEY=your_key_here
PORT=5000
# Optional when the deployed content file is not at ../content/portfolio.json.
# PORTFOLIO_CONTENT_PATH=/absolute/path/to/portfolio.json
```

`backend/.env` is ignored by Git and must never be committed.

The available backend routes are:

- `GET /ping` for a health check
- `GET /api/portfolio` for the sanitized canonical portfolio data
- `POST /api/chat` for chatbot requests

Backend runtime configuration is documented in `backend/.env.example`, including allowed frontend origins, message length, and chatbot timeout settings.

## Deployment

The deployed frontend is hosted on Vercel with the custom domain `mjpathariya.com`. The chatbot backend is hosted separately on Render.

Deployment settings are managed by the hosting platforms and are not stored as repository configuration files.

- Vercel: build from the repository root with the frontend project configuration, and set `REACT_APP_API_BASE_URL` to the Render API origin before rebuilding.
- Render: deploy the `backend` service with `OPENAI_API_KEY`, `CORS_ORIGINS`, and the runtime limits from `backend/.env.example`. The service must also include the root `content/portfolio.json`, or set `PORTFOLIO_CONTENT_PATH` to its deployed location.
- After either deployment, check `/ping`, `/api/portfolio`, the custom-domain page, and the chatbot request. A content change is not complete until both consumers report the same updated records.
- Never commit `.env` files, API keys, generated frontend content, or build output.

## Documentation

- [Revamp plan](docs/PLAN.md)
- [Architecture and product decisions](docs/DECISIONS.md)
- [Current status](docs/STATUS.md)

## License

MIT
