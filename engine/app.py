import os, uuid, asyncio, subprocess, pathlib, shutil
from fastapi import FastAPI, Header, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
import httpx

app=FastAPI(title="iSing AI Engine", version="1.0.0")
ROOT=pathlib.Path(os.getenv("ISING_ENGINE_WORKDIR","/data")); ROOT.mkdir(parents=True,exist_ok=True)
ACESTEP_URL=os.getenv("ACESTEP_URL","http://127.0.0.1:8001").rstrip("/")
ENGINE_KEY=os.getenv("ISING_ENGINE_API_KEY","")
LTX_ROOT=pathlib.Path(os.getenv("LTX_ROOT","/opt/LTX-2"))
LTX_CHECKPOINT=os.getenv("LTX_CHECKPOINT_PATH","")
LTX_UPSAMPLER=os.getenv("LTX_UPSAMPLER_PATH","")
LTX_GEMMA=os.getenv("LTX_GEMMA_ROOT","")
LTX_DISTILLED_LORA=os.getenv("LTX_DISTILLED_LORA_PATH","")
tasks={}

class Music(BaseModel):
    prompt:str; language:str="English"; genre:str="Afrobeats"; mood:str|None=None; gender:str="male"; voiceType:str="ai"; voiceId:str|None=None; durationSeconds:int=60
class Video(BaseModel):
    songId:str; audioUrl:str; prompt:str|None=None

def auth(value):
    if ENGINE_KEY and value != f"Bearer {ENGINE_KEY}": raise HTTPException(401,"Invalid engine key")

@app.get('/health')
def health(): return {"ok":True,"engine":"iSing AI","music":"ACE-Step 1.5","video":"LTX-2"}

@app.post('/v1/music')
async def music(req:Music, authorization:str|None=Header(default=None)):
    auth(authorization)
    task=str(uuid.uuid4()); tasks[task]={"type":"music","status":"processing","progress":0}
    asyncio.create_task(run_music(task,req))
    return {"taskId":task,"status":"processing"}

async def run_music(task,req):
    try:
        payload={"prompt":f"{req.genre}, {req.mood or ''}, {req.language} vocal, {req.gender} singer, {req.prompt}","thinking":True,"use_format":True,"audio_duration":req.durationSeconds,"model":"acestep-v15-turbo"}
        if req.voiceId: payload["vocal_id"]=req.voiceId
        async with httpx.AsyncClient(timeout=120) as c:
            r=await c.post(f"{ACESTEP_URL}/release_task",json=payload); r.raise_for_status(); data=r.json()
        provider=data.get("data",data); provider_task=provider.get("task_id")
        if not provider_task: raise RuntimeError(f"ACE-Step did not return task_id: {data}")
        for _ in range(600):
            await asyncio.sleep(3)
            async with httpx.AsyncClient(timeout=60) as c: q=(await c.post(f"{ACESTEP_URL}/query_result",json={"task_id_list":[provider_task]})).json()
            item=(q.get("data") or [{}])[0]; status=item.get("status")
            if status==1:
                result=item.get("result")
                if isinstance(result,str):
                    import json; result=json.loads(result)
                track=(result or [{}])[0]
                path=track.get("file") or track.get("audio_path")
                if not path: raise RuntimeError("ACE-Step returned no audio path")
                url=path if str(path).startswith("http") else f"{ACESTEP_URL}/v1/audio?path={pathlib.Path(str(path)).as_posix()}"
                out=ROOT/f"{task}.mp3"
                async with httpx.AsyncClient(timeout=300) as c:
                    rr=await c.get(url); rr.raise_for_status(); out.write_bytes(rr.content)
                tasks[task]={"type":"music","status":"completed","audioUrl":f"/v1/files/{task}.mp3","metadata":track.get("metas",{})}; return
            if status==2: raise RuntimeError(str(item))
        raise RuntimeError("ACE-Step timed out")
    except Exception as e: tasks[task]={"type":"music","status":"failed","error":str(e)}

@app.post('/v1/video')
async def video(req:Video, authorization:str|None=Header(default=None)):
    auth(authorization)
    task=str(uuid.uuid4()); tasks[task]={"type":"video","status":"processing","progress":0}
    asyncio.create_task(run_video(task,req))
    return {"taskId":task,"status":"processing"}

async def run_video(task,req):
    try:
        if not LTX_CHECKPOINT or not LTX_UPSAMPLER or not LTX_GEMMA: raise RuntimeError("LTX-2 model paths are not configured.")
        audio=ROOT/f"{task}.mp3"
        async with httpx.AsyncClient(timeout=300) as c:
            rr=await c.get(req.audioUrl); rr.raise_for_status(); audio.write_bytes(rr.content)
        out=ROOT/f"{task}.mp4"
        frames=121
        cmd=["python","-m","ltx_pipelines.a2vid_two_stage","--checkpoint-path",LTX_CHECKPOINT,"--distilled-lora",LTX_DISTILLED_LORA,"0.8","--spatial-upsampler-path",LTX_UPSAMPLER,"--gemma-root",LTX_GEMMA,"--audio-path",str(audio),"--num-frames",str(frames),"--output-path",str(out),"--prompt",req.prompt or "A cinematic African music video, energetic movement, beautiful lighting, expressive performers, rich Kenyan visual atmosphere"]
        subprocess.run(cmd,cwd=LTX_ROOT,check=True,timeout=3600)
        tasks[task]={"type":"video","status":"completed","videoUrl":f"/v1/files/{task}.mp4"}
    except Exception as e: tasks[task]={"type":"video","status":"failed","error":str(e)}

@app.get('/v1/tasks/{task_id}')
def status(task_id:str, authorization:str|None=Header(default=None)):
    auth(authorization)
    if task_id not in tasks: raise HTTPException(404,"Task not found")
    return tasks[task_id] | {"taskId":task_id}

@app.get('/v1/files/{name}')
def file(name:str, authorization:str|None=Header(default=None)):
    auth(authorization)
    p=ROOT/name
    if not p.exists(): raise HTTPException(404,"File not found")
    media='video/mp4' if p.suffix=='.mp4' else 'audio/mpeg'
    return FileResponse(p,media_type=media,filename=p.name)
