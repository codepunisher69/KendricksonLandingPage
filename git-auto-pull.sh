#!/usr/bin/env bash
set -euo pipefail

# go to repo dir
cd /websites/kendrickson/KendricksonLandingPage

echo "==> $(date) - pulling latest changes"
git fetch --all --prune
git reset --hard origin/master
