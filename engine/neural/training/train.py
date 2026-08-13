import argparse, json, os
import torch
from torch.utils.data import Dataset, DataLoader
from model.ising_music_transformer import IcingMusicTransformer

class TokenDataset(Dataset):
    def __init__(self, path, seq=1024):
        self.rows=[]
        with open(path, encoding='utf-8') as f:
            for line in f:
                r=json.loads(line)
                self.rows.append(r['tokens'][:seq])
        self.seq=seq
    def __len__(self): return len(self.rows)
    def __getitem__(self,i):
        x=torch.tensor(self.rows[i],dtype=torch.long)
        if len(x)<self.seq: x=torch.nn.functional.pad(x,(0,self.seq-len(x)))
        return x

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--data',required=True); ap.add_argument('--out',default='checkpoints'); ap.add_argument('--epochs',type=int,default=1); ap.add_argument('--batch',type=int,default=2); ap.add_argument('--lr',type=float,default=3e-4)
    a=ap.parse_args(); os.makedirs(a.out,exist_ok=True)
    ds=TokenDataset(a.data); dl=DataLoader(ds,batch_size=a.batch,shuffle=True)
    device='cuda' if torch.cuda.is_available() else 'cpu'; model=IcingMusicTransformer().to(device); opt=torch.optim.AdamW(model.parameters(),lr=a.lr)
    loss_fn=torch.nn.CrossEntropyLoss()
    model.train()
    for epoch in range(a.epochs):
        for x in dl:
            x=x.to(device); logits=model(x[:,:-1]); loss=loss_fn(logits.reshape(-1,logits.size(-1)),x[:,1:].reshape(-1)); opt.zero_grad(); loss.backward(); torch.nn.utils.clip_grad_norm_(model.parameters(),1.0); opt.step()
        torch.save(model.state_dict(),f'{a.out}/ising_music_epoch_{epoch+1}.pt'); print('epoch',epoch+1,'loss',float(loss))
if __name__=='__main__': main()
