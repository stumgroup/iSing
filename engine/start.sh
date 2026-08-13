#!/usr/bin/env bash
set -e
cd /opt/ACE-Step-1.5
python3.12 -m acestep.api_server --host 127.0.0.1 --port 8001 --api-key "${ACESTEP_API_KEY:-ising-internal}" &
ACE_PID=$!
for i in $(seq 1 120); do curl -sf http://127.0.0.1:8001/health >/dev/null && break; sleep 2; done
cd /opt/ising-engine
exec python3.12 -m uvicorn app:app --host 0.0.0.0 --port 8080
