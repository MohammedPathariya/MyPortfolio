# Portfolio Revamp Plan

## Objective

Improve the portfolio's maintainability, content consistency, chatbot accuracy, accessibility, performance, and user flow before changing its visual identity.

The visual redesign is intentionally the final phase. The existing deployments, public URLs, project links, resume, and working features should remain functional throughout the work.

## Phase 0: Baseline and safeguards

- Confirm the frontend production build succeeds.
- Confirm the backend starts and the chat endpoint responds.
- Verify the deployed frontend, custom domain, backend, resume, project demos, and social links.
- Record the current Git state before each implementation phase.
- Keep generated build output, local environment files, secrets, and other disposable artifacts out of Git.

Gate: current behavior and deployment endpoints are known before application changes begin.

## Phase 1: Repository and code cleanup

- Remove or archive unused components and assets after confirming they are not part of the deployed page.
- Review `frontend/all_code_dump.txt` and remove it if it is only a stale snapshot.
- Remove tracked `.DS_Store` files if present.
- Update the project README with accurate frontend, backend, environment, local development, and deployment instructions.
- Consolidate duplicate CSS rules and identify global styles that should have one owner.

Gate: the repository contains only active source, required public assets, documentation, and reproducible configuration.

## Phase 2: Canonical portfolio content

- Create a version-controlled structured content source, initially `content/portfolio.json`.
- Define stable IDs for projects, experience records, education records, and skills.
- Move personal information, links, project metadata, metrics, experience, education, and skills into that source.
- Preserve evidence-backed wording and avoid silently inventing or rounding metrics.
- Add schema validation for required fields, unique IDs, valid links, dates, and referenced asset paths.

Gate: one content update can represent the portfolio consistently without editing multiple UI files or prompts.

## Phase 3: Frontend content integration

- Make projects, filters, experience, education, skills, and contact links render from the canonical content source.
- Remove duplicated content from `ProjectsData.js` and `TimelineTabs.js`.
- Keep presentation logic in components and content in data files.
- Preserve the current feature behavior while changing the data path.
- Add a reproducible content preparation step if the CRA build needs a generated frontend copy of the shared JSON.

Gate: the deployed frontend can be rebuilt from the canonical content source and renders the expected records.

## Phase 4: Backend and chatbot integration

- Make the backend load the same canonical content source.
- Generate the chatbot's portfolio context from structured data instead of maintaining a manually duplicated prompt.
- Keep behavioral instructions, response boundaries, and fallback behavior separate from portfolio facts.
- Optionally expose a sanitized `GET /api/portfolio` endpoint for diagnostics and future integrations.
- Move the frontend backend URL into environment configuration instead of hardcoding it in `ChatWidget.js`.

Gate: changing one project or experience record updates both the frontend and chatbot knowledge after rebuild or restart.

## Phase 5: Reliability, security, and accessibility

- Add chatbot input length limits, request timeouts, loading states, retry behavior, and clear error handling.
- Restrict CORS to known frontend origins.
- Preserve rate limiting and keep the OpenAI key backend-only.
- Add accessible labels and keyboard behavior for chat, theme controls, forms, tabs, filters, and navigation.
- Add visible focus states, correct heading hierarchy, semantic landmarks, and meaningful image alt text.
- Handle backend-unavailable and empty-chat states clearly.

Gate: core interactions work with keyboard input, on mobile, in both themes, and when the chatbot backend is unavailable.

## Phase 6: Performance, testing, and deployment verification

- Resize and compress oversized images, especially the hero asset.
- Remove unused public assets and lazy-load below-the-fold images.
- Add lightweight checks for content validation, missing assets, project filtering, theme persistence, and production builds.
- Run frontend and backend locally.
- Verify the complete deployed flow after content and backend changes.
- Document environment variables and deployment responsibilities for Vercel and Render.

Gate: local checks pass and the deployed custom-domain experience matches the verified source state.

## Phase 7: Visual identity and interaction redesign

- Define the new typography, color system, spacing, layout, and component language.
- Redesign the header, hero, projects, experience, education, contact, footer, and chatbot surfaces.
- Improve visual hierarchy and page flow without reintroducing duplicated content.
- Add motion only where it improves comprehension or feedback.
- Re-run responsive, accessibility, performance, and production verification.

Gate: the new visual system is implemented on top of the stable content and application architecture.

## Working rules

- Keep each phase small and independently verifiable.
- Preserve unrelated user changes.
- Do not claim deployment or chatbot behavior without checking the relevant endpoint.
- Prefer the simplest architecture that solves the current portfolio's needs.
- Record major changes and their rationale in `DECISIONS.md`.
