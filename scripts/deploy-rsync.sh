#!/usr/bin/env bash
set -euo pipefail

# Customize these:
REMOTE_HOST="your-vps"
REMOTE_PATH="/var/www/blog.entazis.dev"

echo "Building…"
npm run build

echo "Syncing build to ${REMOTE_HOST}:${REMOTE_PATH}"
rsync -az --delete \
  --exclude node_modules \
  --exclude .git \
  ./.next \
  ./public \
  ./package.json \
  ./package-lock.json \
  ./next.config.ts \
  "${REMOTE_HOST}:${REMOTE_PATH}/"

echo "Installing production deps on remote..."
ssh "${REMOTE_HOST}" "cd ${REMOTE_PATH} && npm ci --omit=dev"

echo "Restart your Node process (systemd/pm2/etc)."

echo "Done."

