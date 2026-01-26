#!/usr/bin/env bash
set -euo pipefail

# Customize these:
REMOTE_HOST="your-vps"
REMOTE_PATH="/var/www/blog.entazis.dev"

echo "Building…"
npm run build

echo "Syncing ./out → ${REMOTE_HOST}:${REMOTE_PATH}"
rsync -az --delete ./out/ "${REMOTE_HOST}:${REMOTE_PATH}/"

echo "Done."

