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

## Portfolio content validation

The canonical portfolio data lives in `content/portfolio.json`. Validate its required fields, stable IDs, dates, links, and referenced public assets with:

```bash
node scripts/validate-portfolio-content.js
```

The frontend and backend are not wired to this source yet. That integration is the next phase so the migration can be verified independently from the data model.

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
```

`backend/.env` is ignored by Git and must never be committed.

The available backend routes are:

- `GET /ping` for a health check
- `POST /api/chat` for chatbot requests

## Deployment

The deployed frontend is hosted on Vercel with the custom domain `mjpathariya.com`. The chatbot backend is hosted separately on Render.

Deployment settings are managed by the hosting platforms and are not stored as repository configuration files. Keep the frontend and backend environment values configured in their respective deployment dashboards.

## Documentation

- [Revamp plan](docs/PLAN.md)
- [Architecture and product decisions](docs/DECISIONS.md)
- [Current status](docs/STATUS.md)

## License

MIT
