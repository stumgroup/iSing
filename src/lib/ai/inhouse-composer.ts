import crypto from "node:crypto";
import { pruneTasks, tasks } from "@/lib/ai/inhouse-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NOTE: Record<string, number> = {
  C: 261.63, "C#": 277.18, D: 293.66, "D#": 311.13, E: 329.63,
  F: 349.23, "F#": 369.99, G: 392.00, "G#": 415.30, A: 440.00,
  "A#": 466.16, B: 493.88
};

function hash(s: string) {
  let h = 2166136261;
  for (let i=0;i<s.length;i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
function rng(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}
function midi(n: number) { return 440 * Math.pow(2, (n - 69) / 12); }
function env(t:number, a:number, d:number, s:number, r:number, dur:number) {
  if (t < a) return t/a;
  if (t < a+d) return 1-(1-s)*(t-a)/d;
  if (t < dur-r) return s;
  return Math.max(0, s*(1-(t-(dur-r))/r));
}
function kick(t:number) {
  if (t<0 || t>0.32) return 0;
  const f=115*Math.pow(42/115,t/0.32);
  return Math.sin(2*Math.PI*f*t)*Math.exp(-11*t)*0.9;
}
function snare(t:number, r:()=>number) {
  if (t<0 || t>0.22) return 0;
  const noise=(r()*2-1)*Math.exp(-18*t);
  return noise*0.45 + Math.sin(2*Math.PI*190*t)*Math.exp(-20*t)*0.2;
}
function hat(t:number, r:()=>number) {
  if (t<0 || t>0.08) return 0;
  return (r()*2-1)*Math.exp(-55*t)*0.16;
}
function bass(t:number, f:number, dur:number) {
  if(t<0||t>dur) return 0;
  return (Math.sin(2*Math.PI*f*t)+0.35*Math.sin(4*Math.PI*f*t))*env(t,.015,.08,.7,.08,dur)*.32;
}
function tone(t:number, f:number, dur:number, amp:number) {
  if(t<0||t>dur) return 0;
  return (Math.sin(2*Math.PI*f*t)+.22*Math.sin(2*Math.PI*2*f*t)+.08*Math.sin(2*Math.PI*3*f*t))*env(t,.02,.12,.7,.12,dur)*amp;
}
function benga(t:number, f:number, dur:number, amp:number) {
  if(t<0||t>dur) return 0;
  const x=Math.sin(2*Math.PI*f*t)+.35*Math.sin(2*Math.PI*1.5*f*t)+.15*Math.sin(2*Math.PI*2.01*f*t);
  return x*env(t,.01,.08,.55,.06,dur)*amp;
}
function wav(samples:Int16Array, sampleRate:number) {
  const bytes=44+samples.length*2, out=Buffer.alloc(bytes);
  out.write("RIFF",0); out.writeUInt32LE(36+samples.length*2,4); out.write("WAVE",8);
  out.write("fmt ",12); out.writeUInt32LE(16,16); out.writeUInt16LE(1,20); out.writeUInt16LE(1,22);
  out.writeUInt32LE(sampleRate,24); out.writeUInt32LE(sampleRate*2,28); out.writeUInt16LE(2,32); out.writeUInt16LE(16,34);
  out.write("data",36); out.writeUInt32LE(samples.length*2,40);
  for(let i=0;i<samples.length;i++) out.writeInt16LE(samples[i],44+i*2);
  return out;
}
function chooseStyle(genre:string, prompt:string) {
  const s=(genre+" "+prompt).toLowerCase();
  return {
    amapiano: /amapiano|piano|log drum/.test(s),
    benga: /benga|kenyan guitar|guitar/.test(s),
    afro: /afro|afrobeats|afrobeat/.test(s),
    gospel: /gospel|worship/.test(s),
    tempo: /slow|ballad|romantic/.test(s) ? 78 : /fast|energetic|dance/.test(s) ? 112 : /amapiano/.test(s) ? 108 : 100
  };
}

function compose(request:any) {
  const duration=Math.min(Math.max(Number(request.durationSeconds)||30,15),60);
  const sr=11025, n=Math.floor(duration*sr), out=new Int16Array(n);
  const style=chooseStyle(request.genre||"", request.prompt||"");
  const beat=60/style.tempo, bar=beat*4;
  const rootName = ["A","C","D","E","G"][hash((request.language||"")+"|"+(request.prompt||""))%5];
  const root=NOTE[rootName];
  const rand=rng(hash(JSON.stringify(request)));
  const scale=[0,2,3,5,7,10,12,14];
  const chords=[0,3,5,7].map(x=>root*Math.pow(2,x/12));
  for(let i=0;i<n;i++){
    const t=i/sr, beatPos=t/beat, barPos=t/bar, barIndex=Math.floor(barPos), inBeat=beatPos-Math.floor(beatPos);
    let v=0;
    // kick / log drum pattern
    const kickHits = style.amapiano ? [0,1.5,2.75,3.5] : [0,2];
    for(const h of kickHits) { const dt=t-(barIndex*bar+h*beat); if(dt>=0) v+=kick(dt)*(style.amapiano?1.0:.75); }
    if (style.amapiano) {
      for(const h of [0.75,1.75,2.5,3.25]) { const dt=t-(barIndex*bar+h*beat); if(dt>=0) v+=kick(dt*.92)*.72; }
    }
    // snare/clap
    for(const h of [1,3]) { const dt=t-(barIndex*bar+h*beat); if(dt>=0) v+=snare(dt,rand); }
    // hats
    for(let h=0.5;h<4;h+=0.5) { const dt=t-(barIndex*bar+h*beat); if(dt>=0) v+=hat(dt,rand); }
    // bass ostinato
    const bassPattern=style.amapiano ? [0,0,7,5,0,3,7,5] : [0,7,5,7];
    const step=beat/2, bi=Math.floor((t%bar)/step), note=bassPattern[bi%bassPattern.length];
    const bf=root*Math.pow(2,note/12), bt=(t%(step));
    v+=bass(bt,bf,step*.9);
    // chords
    const chord=chords[barIndex%chords.length];
    const chordNotes=[chord,chord*Math.pow(2,4/12),chord*Math.pow(2,7/12)];
    for(const cf of chordNotes) v+=tone((t%(beat*2)),cf,beat*1.8,.055);
    // melodic phrase, deterministic per bar
    const mi=Math.floor((t%bar)/(beat/2));
    const mn=scale[(mi+barIndex*2+Math.floor(rand()*2))%scale.length];
    v+=tone((t%(beat/2)), root*Math.pow(2/1,mn/12), beat*.42, .075);
    // benga guitar offbeat picking
    if(style.benga) {
      const gh=[.5,1.25,2.0,2.75,3.5];
      for(const h of gh){const dt=t-(barIndex*bar+h*beat);if(dt>=0)v+=benga(dt,root*Math.pow(2,(scale[(barIndex+Math.floor(h*2))%scale.length])/12),.22,.10);}
    }
    // afro/gospel pad
    if(style.afro||style.gospel) v+=tone(t%bar,chord,bar,.025);
    // intro/outro fade
    const fade=Math.min(1,t/1.5,(duration-t)/2);
    out[i]=Math.max(-32767,Math.min(32767,Math.round(v*fade*28000)));
  }
  return wav(out,sr);
}

export async function createInHouseTask(body: any) {
  try {
    if (!body?.prompt?.trim()) {
      return { ok: false, message: "Prompt is required." };
    }

    pruneTasks();
    const id = crypto.randomUUID();

    const task = {
      id,
      status: "processing" as const,
      createdAt: Date.now(),
      audio: Buffer.alloc(0),
      duration: Number(body.durationSeconds) || 30,
      progress: 0,
      request: body,
    };

    tasks.set(id, task);

    // Generate asynchronously so the caller receives a task ID immediately.
    setImmediate(() => {
      try {
        const audio = compose(body);
        const current = tasks.get(id);

        if (current) {
          current.audio = audio;
          current.progress = 1;
          current.status = "completed";
        }
      } catch (error) {
        console.error("iSing AI music generation failed:", error);
        const current = tasks.get(id);

        if (current) {
          current.status = "failed";
          current.progress = 0;
        }
      }
    });

    return {
      ok: true,
      taskId: id,
      providerJobId: id,
      status: "processing",
      message: "iSing AI is composing your music.",
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "iSing AI music generation failed.",
    };
  }
}
