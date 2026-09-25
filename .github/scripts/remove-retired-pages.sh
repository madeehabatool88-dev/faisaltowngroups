#!/usr/bin/env bash
set -euo pipefail
root=$(readlink -f "$1")
case "$root" in
  /*/faisaltowngroups.com/public_html) ;;
  *) echo 'Refusing retirement outside this domain document root.' >&2; exit 1 ;;
esac
[ -f "$root/deployment-pages.txt" ] || exit 1
# Only the generated index files for deliberately retired routes are removed.
# No recursive removal, assets, or hosting-managed files are touched.
while IFS= read -r route; do
  [ -n "$route" ] || continue
  # A route recreated later in Pages CMS is no longer retired.
  grep -Fxq "$route/index.html" "$root/deployment-pages.txt" && continue
  file="$root/$route/index.html"
  [ -e "$file" ] || continue
  resolved=$(readlink -f "$file")
  case "$resolved" in
    "$root"/*/index.html) rm -f -- "$file" ;;
    *) echo 'Refusing a retired path outside the site.' >&2; exit 1 ;;
  esac
done <<'RETIRED'
articles/faisal-jewels-and-faisal-heights
articles/faisal-town-complete-guide
articles/faisal-town-ii-sector-p-guide
articles/faisal-town-living
articles/faisal-town-phase-1-and-faisal-hills
articles/living-near-rawalpindi-ring-road
articles/new-islamabad-living-guide
articles/sector-p-prices-explained
articles/why-choose-faisal-town
faisal-town-block-a
faisal-town-block-b
faisal-town-block-c
faisal-town-overseas-block
house-for-rent-faisal-town-islamabad
house-for-sale-faisal-town-islamabad
plots-for-sale-faisal-town-islamabad
RETIRED
