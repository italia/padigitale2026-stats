#!/usr/bin/env bash

set -eou pipefail

declare \
  WAI_SITE_ID \
  WAI_TOKEN

curl "https://webanalytics.italia.it/matomo/index.php?module=API&format=json&idSite=${WAI_SITE_ID}&period=day&date=last30&method=API.get&token_auth=${WAI_TOKEN}" \
  -o data.json
