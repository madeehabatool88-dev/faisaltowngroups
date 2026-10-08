# GitHub / Pages CMS to Hostinger deployment

Pages CMS saves content to the GitHub `main` branch. Every push runs **Deploy live website**. The Pages CMS deployment action runs the same workflow; save CMS changes before using it.

The workflow builds all pages, connects over SSH, locates `domains/faisaltowngroups.com/public_html` in the hosting account, and uploads the static build. It refuses an unidentified document root and preserves hosting files outside the static build.

Required repository secrets: `SSH_HOST`, `SSH_PORT`, `SSH_USERNAME`, `SSH_PASSWORD`. These must belong to the hosting account containing faisaltowngroups.com. No credentials belong in CMS content or committed files.

Verification checks the exact Git commit through `deployment-version.txt`, compares the live homepage against the build, verifies homepage stylesheets byte-for-byte, and checks important pages. HTTP 200 alone is no longer treated as evidence that the new site is live.

If verification fails, inspect the failing workflow step. A directory error means the SSH account does not expose the expected domain folder. A version or content mismatch means the domain may point elsewhere or hosting cache is serving an older build. Correct the hosting configuration and rerun the workflow.
