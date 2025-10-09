# Repository Guidelines

## Project Structure & Module Organization
- **Root API**: `production-api-server-fixed.js` runs the Express divination gateway and relies on the shared calculator scripts in `lsspp-spring-boot`.
- **Frontend App**: `lsspp-divination-frontend/src` hosts the Vite + React TypeScript UI with reusable pieces split across `components/`, `pages/`, `hooks/`, `store/`, and `utils/`.
- **Spring Backend**: `lsspp-spring-boot/src/main/java/com/lsspp` implements the Java services; configuration lives under `resources/` and tests mirror packages in `src/test/java`.
- **Archive Mirror**: Treat `nj/` as a historical snapshot; only touch it when migrating assets intentionally.

## Build, Test, and Development Commands
- **Dependencies**: Run `npm install` at the repository root and inside `lsspp-divination-frontend`; run `mvn clean install` in `lsspp-spring-boot`.
- **Express API**: Start the Node service with `node production-api-server-fixed.js`; export `PORT` if you must override the default 8080.
- **Frontend Dev**: From `lsspp-divination-frontend`, use `npm run dev` for hot reload, `npm run build` for production bundles, and `npm run lint`.
- **Spring Service**: Within `lsspp-spring-boot`, run `mvn spring-boot:run` for local development and `mvn clean verify` before releasing artifacts.

## Coding Style & Naming Conventions
- **TypeScript**: ESLint enforces 2-space indentation; keep components in `PascalCase.tsx` files and hooks in `useCamelCase.ts`.
- **Styling**: Prefer `styled-components` colocated with the component they style, sharing tokens via `styles/theme.ts`.
- **Java**: Use 4-space indentation, packages beneath `com.lsspp`, and PascalCase class names.
- **Shared Logic**: Keep calculator utilities pure and synchronize algorithm changes between the Node and Java copies.

## Testing Guidelines
- **Java Tests**: Place specs in `lsspp-spring-boot/src/test/java`, mirroring package paths; execute `mvn test` or `mvn clean verify` before pushes.
- **Frontend Tests**: Add Vitest or Testing Library suites under `lsspp-divination-frontend/src/__tests__`.
- **API Checks**: Cover Express endpoints with curl or Postman collections stored in `tmp/` for regression comparison.
- **Coverage Goal**: Target at least 80% statement coverage on new logic or justify lower numbers directly in the pull request.

## Commit & Pull Request Guidelines
- **Commit Messages**: Follow the emoji-prefixed, present-tense summaries used in history, keeping the subject under 72 characters.
- **Scope Control**: Separate frontend, Java backend, and Node API edits into distinct commits whenever practical.
- **Pull Requests**: Provide a concise summary, linked issues, executed command logs, and screenshots or GIFs for UI-facing updates.
- **Reviewer Notes**: Flag API or schema changes early, update relevant docs, and request subject-matter reviewers before marking the PR ready.
