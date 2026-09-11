# GitHub to Hostinger deployment

Pages CMS saves to GitHub. Every push to `main` now starts **Deploy live website**, which installs dependencies, builds Astro, uploads changed files over encrypted FTPS, and compares representative live pages with the build. A failed build stops the upload. The workflows use the same deployment action as petlifetimecost.com, with this site's own hosting settings.

You can also choose **Deploy live website** or **Check saved content** in Pages CMS. Save your edits first. Deployment always uses `main`. GitHub Actions also provides a manual Run workflow button.

## One-time connection setup

In this repository's **Settings → Secrets and variables → Actions**, add these repository secrets using the FTP account for **faisaltowngroups.com**:

| Secret | Value |
| --- | --- |
| `FTP_SERVER` | The direct FTP server hostname shown by Hostinger; its TLS certificate must match this hostname. |
| `FTP_USERNAME` | The FTP account username for this website. |
| `FTP_PASSWORD` | That FTP account's password, not your Google login password. |
| `FTP_SERVER_DIR` | The website's `public_html` directory relative to this FTP account. Use `./` only if the FTP account is already rooted in this site's `public_html`; otherwise use the exact site directory. Must end in `/`. |

Do not use the petlifetimecost.com connection: it is on a different hosting provider. Do not put passwords in the repository or CMS content. Confirm that the FTP directory belongs to faisaltowngroups.com before running the workflow.

The workflow reports missing settings without printing credentials. It does not clear the hosting account or upload source files. It tracks the files it publishes so later runs transfer only changes. Files outside its deployment state are left alone.

After the secrets are configured, run **Deploy live website** once. Check its GitHub Actions result before considering setup complete. Future CMS saves to `main` deploy automatically; the extra deployment button is useful for retrying a failed run.

If Pages CMS requests GitHub Actions access, authorize the repository's workflow integration in your own account. A successful CMS save alone does not mean hosting deployment succeeded; check the workflow status.
