# VibeOps Forum

Astro site for VibeOps Forum, a builder community for AI-native development, agent operations, A2A protocol work, and MCP tooling.

## Stack

- Astro
- Tailwind CSS
- Content collections for events, projects, and resources

## Local Development

```sh
npm install
npm run dev
```

The dev server runs at `http://localhost:4321/` by default.

## Build

```sh
npm run build
```

The production site is emitted to `dist/`.

## Content

- Events live in `src/content/events/`
- Projects live in `src/content/projects/`
- Resource articles live in `src/content/resources/`
- Community content (YouTube, podcasts, blogs) lives in `src/content/community-content/`
- Shared site metadata lives in `src/lib/site.ts`

## Submissions

Community members can suggest new listings through GitHub issue templates:

- [Project shelf submission](https://github.com/calcuttin/vibeopsforum/issues/new?template=project-shelf)
- [Community content submission](https://github.com/calcuttin/vibeopsforum/issues/new?template=community-content)

After review, approved submissions are added as JSON files in the matching content folder.
