"""iSing AI neural music model scaffold.
This is an in-house Transformer architecture. It requires trained weights before
production-quality audio can be generated.
"""
import torch
from torch import nn

class IcingMusicTransformer(nn.Module):
    def __init__(self, vocab_size=8192, d_model=512, nhead=8, layers=12, max_tokens=4096):
        super().__init__()
        self.token = nn.Embedding(vocab_size, d_model)
        self.pos = nn.Embedding(max_tokens, d_model)
        block = nn.TransformerEncoderLayer(d_model, nhead, dim_feedforward=d_model*4, batch_first=True, activation="gelu")
        self.encoder = nn.TransformerEncoder(block, layers)
        self.head = nn.Linear(d_model, vocab_size)

    def forward(self, ids):
        b, t = ids.shape
        p = torch.arange(t, device=ids.device).unsqueeze(0)
        x = self.token(ids) + self.pos(p)
        mask = torch.triu(torch.ones(t, t, device=ids.device, dtype=torch.bool), diagonal=1)
        x = self.encoder(x, mask=mask)
        return self.head(x)
