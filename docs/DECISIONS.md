# Architecture and Product Decisions

This file records major decisions for the portfolio revamp. Add new decisions rather than rewriting old rationale when the direction changes.

## D-001: Make visual redesign the final phase

- Status: Accepted
- Decision: Stabilize content ownership, code structure, chatbot integration, accessibility, and performance before changing the visual identity.
- Why: A visual redesign built on duplicated data and unused code would create rework and make it harder to distinguish presentation problems from application problems.

## D-002: Use one canonical portfolio content source

- Status: Accepted
- Decision: Store portfolio facts in a version-controlled structured source, initially `content/portfolio.json`.
- Why: The frontend and chatbot currently maintain separate copies of project and experience information. A shared source removes manual synchronization and makes updates reviewable.

## D-003: Keep portfolio facts separate from chatbot behavior

- Status: Accepted
- Decision: Generate the chatbot's portfolio context from canonical data, while keeping response rules and safety instructions in a separate prompt template.
- Why: Facts change more often than model behavior. Separating them makes content updates safer and prevents the system prompt from becoming a second undocumented database.

## D-004: Prefer structured data over RAG for the current portfolio

- Status: Accepted
- Decision: Use structured JSON context for the current chatbot rather than adding embeddings or a vector database.
- Why: The portfolio is small, structured, and mostly factual. Direct structured context is simpler, more auditable, and less operationally expensive. Retrieval can be reconsidered if the content becomes substantially larger.

## D-005: Preserve the current React and Express deployment model

- Status: Accepted
- Decision: Keep the Create React App frontend and Express backend during this revamp.
- Why: Both are already deployed and functional. A framework migration would expand scope without directly improving content consistency or portfolio quality.

## D-006: Use stable content IDs

- Status: Accepted
- Decision: Assign stable IDs to projects, experience records, education records, and skills.
- Why: Display names can change. Stable IDs prevent accidental mismatches between frontend rendering, chatbot context, validation, and future analytics.

## D-007: Keep the frontend statically renderable

- Status: Accepted
- Decision: The frontend should continue to build as a static site from the canonical content source.
- Why: The portfolio should not require the chatbot backend to be awake in order to render basic content. This preserves fast loading and reduces runtime coupling.

## D-008: Move deployment-specific URLs to environment configuration

- Status: Accepted
- Decision: The frontend chatbot API base URL should be configured per environment instead of hardcoded in a component.
- Why: Local, preview, and production environments need different endpoints. Configuration also makes deployment changes safer and easier to verify.

## D-009: Preserve evidence-backed portfolio claims

- Status: Accepted
- Decision: Content updates must use verified project and experience facts. Metrics must not be invented, rounded, or broadened for marketing effect.
- Why: The portfolio is a professional artifact. Consistency with source evidence is more important than making claims sound larger.

## D-010: Treat generated artifacts as disposable

- Status: Accepted
- Decision: Build output, local secrets, dependency directories, and other generated artifacts stay out of Git unless a later deployment requirement explicitly needs them.
- Why: These files are environment-specific, increase noise, and can expose secrets or create misleading source history.

## D-011: Remove confirmed-unused source and assets

- Status: Accepted
- Decision: Delete components and public assets with no active references in the rendered frontend, metadata, or manifest instead of keeping them in the application tree.
- Why: The old files were not part of the current page and increased maintenance cost. Reference audits were completed before removal.

## D-012: Assign global CSS ownership to `index.css`

- Status: Accepted
- Decision: Keep theme variables, document-level behavior, body reset, typography defaults, and global button typography in `index.css`. Component-specific rules stay with their component stylesheets.
- Why: The same global selectors were duplicated in `App.css`, `Projects.css`, and `ChatWidget.css`, making import-order behavior difficult to reason about.

## D-013: Use structured JSON as the canonical content source

- Status: Accepted
- Decision: Store portfolio facts in version-controlled `content/portfolio.json`, with stable IDs and explicit fields for metadata, metrics, links, dates, and public assets.
- Why: The portfolio content is small, factual, and shared by the frontend and chatbot. JSON keeps it portable, reviewable, and usable from both JavaScript and Node without adding a database.

## D-014: Validate content with a dependency-free repository script

- Status: Accepted
- Decision: Validate `content/portfolio.json` with `scripts/validate-portfolio-content.js` using Node's standard library.
- Why: The repository has separate frontend and backend package manifests and no root package manager configuration. A dependency-free validator keeps the content gate reproducible without introducing a new runtime dependency.

## D-015: Separate content modeling from consumer integration

- Status: Accepted
- Decision: Create and validate the canonical data before changing frontend rendering or backend prompt generation.
- Why: This isolates content-model errors from integration errors and makes the next phases easier to verify. Temporary duplicate consumers remain until they are migrated and removed.

## D-016: Generate a CRA-compatible frontend content module

- Status: Accepted
- Decision: Generate the ignored `frontend/src/data/portfolio.generated.js` module from `content/portfolio.json` before frontend start, test, and build commands.
- Why: Create React App does not support importing a repository-root JSON file from outside `frontend/src` without configuration changes. A deterministic generated module keeps the root JSON canonical while preserving synchronous static rendering.

## D-017: Build chatbot context from the canonical portfolio object

- Status: Accepted
- Decision: Load `content/portfolio.json` once at backend startup, expose its sanitized public fields through `/api/portfolio`, and serialize the same object into the chatbot's verified-facts context.
- Why: The backend should not maintain a second manually edited portfolio database. Loading once keeps each request consistent while a restart applies content changes predictably.

## D-018: Configure the frontend chatbot endpoint through environment variables

- Status: Accepted
- Decision: Read `REACT_APP_API_BASE_URL` from the frontend build environment and document the required local and Vercel configuration in `.env.example` and the README.
- Why: Local, preview, and production builds use different backend endpoints. The component should not contain deployment-specific URLs.

## D-019: Restrict chatbot CORS through an allowlist

- Status: Accepted
- Decision: Allow only configured frontend origins through `CORS_ORIGINS`, with the custom domain and local development origin as defaults.
- Why: The chatbot is a browser-facing API. Open CORS was unnecessary and allowed unrelated origins to make browser requests against the backend.

## D-020: Enforce bounded chatbot requests at both layers

- Status: Accepted
- Decision: Enforce a 1,000-character message limit, 15-second OpenAI request timeout, no SDK retries, and frontend abort/retry behavior.
- Why: The frontend should fail quickly and communicate clearly, while the backend must bound request size and upstream spend even if a client bypasses the UI.

## D-021: Prefer native semantics and visible focus behavior

- Status: Accepted
- Decision: Use semantic landmarks, labeled form controls, native buttons/forms, ARIA state for tabs, filters, and toggles, keyboard tab navigation, and `:focus-visible` styles.
- Why: These changes improve keyboard and assistive-technology access without coupling accessibility to the future visual redesign.

## D-022: Optimize the hero image for its rendered role

- Status: Accepted
- Decision: Replace the oversized hero JPEG with a 1600px-wide WebP and keep the hero eager-loaded with high fetch priority while lazy-loading below-the-fold images.
- Why: The hero is above the fold, so it should load promptly, but the original 8736px image was far larger than its display size. The optimized file preserves the role while reducing transfer size from about 3.1 MB to about 65 KB.

## D-023: Keep automated checks focused on high-risk behavior

- Status: Accepted
- Decision: Add lightweight tests for project filtering and theme persistence, plus standalone validators for canonical content and referenced public assets. Keep production build verification as an explicit command.
- Why: These checks cover the current data-driven and stateful behavior without creating a large test framework for a small static portfolio.

## D-024: Treat deployment parity as a separate Phase 6 gate

- Status: Accepted
- Decision: Require the deployed frontend and backend to be checked against the same canonical source state before Phase 6 is considered complete.
- Why: A successful local build does not prove that Vercel and Render rebuilt from the same commit or include the same content and assets. The first deployment check found a live optimized hero asset but an older backend payload and a stale JPEG, so those differences must remain visible rather than being reported as a passing deployment.

## D-025: Animate the hero as a rigged vector illustration

- Status: Accepted
- Decision: Use one inline SVG character with independently animated arm, hands, head, and eyes instead of generated bitmap frame sequences.
- Why: Generated frame sheets changed scale, crop, and character details between frames. A vector rig keeps every static element aligned, renders smoothly at browser frame rate, blends with both themes, and removes the bitmap-frame payload.

## D-026: Preserve the original hero character direction

- Status: Accepted
- Decision: Keep the polished manga-style male character, layered dark hair, large expressive eyes, henley placket, rolled sleeves, laptop, and mug as the visual reference while retaining the SVG rig.
- Why: The first vector pass solved frame drift but simplified the character too far. Motion quality and illustration quality are separate concerns, so the rig stays while its artwork is redrawn to match the approved character direction.
