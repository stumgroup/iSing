#!/bin/sh
set -e
cd /opt/ising-ai
exec python -m uvicorn app:app --host 0.0.0.0 --port "${PORT:-8001}"
