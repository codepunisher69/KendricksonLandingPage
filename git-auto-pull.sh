#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="/websites/kendrickson/KendricksonLandingPage"
BRANCH="main"   # change to "master" if that’s your default branch
INTERVAL=300    # 300 seconds = 5 minutes

cd "$REPO_DIR"

while true; do
    echo "==> $(date) - pulling latest changes"
    git fetch --all --prune
    git reset --hard "origin/$BRANCH"
    echo "Sleeping for $INTERVAL seconds..."
    sleep "$INTERVAL"
done