FROM nvidia/cuda:12.8.1-cudnn-runtime-ubuntu24.04
ENV DEBIAN_FRONTEND=noninteractive PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1
RUN apt-get update && apt-get install -y git python3.12 python3.12-venv python3-pip ffmpeg curl && rm -rf /var/lib/apt/lists/*
WORKDIR /opt
RUN git clone --depth 1 https://github.com/ACE-Step/ACE-Step-1.5.git /opt/ACE-Step-1.5
RUN git clone --depth 1 https://github.com/Lightricks/LTX-2.git /opt/LTX-2
WORKDIR /opt/ACE-Step-1.5
RUN python3.12 -m pip install --break-system-packages -U pip && python3.12 -m pip install --break-system-packages -e .
WORKDIR /opt/LTX-2
RUN python3.12 -m pip install --break-system-packages -e packages/ltx-core -e packages/ltx-pipelines
COPY requirements.txt /opt/ising-engine/requirements.txt
RUN python3.12 -m pip install --break-system-packages -r /opt/ising-engine/requirements.txt
COPY app.py /opt/ising-engine/app.py
COPY start.sh /opt/ising-engine/start.sh
RUN chmod +x /opt/ising-engine/start.sh
WORKDIR /opt/ising-engine
EXPOSE 8080
CMD ["/opt/ising-engine/start.sh"]
