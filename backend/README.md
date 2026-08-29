```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

## CI/CD (GitHub Actions)

The repository now includes a single CI/CD workflow at [ci-cd.yml](/home/ravi/workspace/projects/medium.worktrees/pasted-text-processing/.github/workflows/ci-cd.yml):

- **CI** runs on push + pull requests for changes under [backend/](/home/ravi/workspace/projects/medium.worktrees/pasted-text-processing/backend) and [common/](/home/ravi/workspace/projects/medium.worktrees/pasted-text-processing/common), installs dependencies, generates Prisma client, and typechecks both packages.
- **CD** deploys to Cloudflare Workers only when code is pushed to `main` and CI passes.

Required GitHub secrets:

- `CLOUDFLARE_API_TOKEN` (required)
- `CLOUDFLARE_ACCOUNT_ID` (optional, but recommended)
