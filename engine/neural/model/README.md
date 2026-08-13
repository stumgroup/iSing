# iSing AI Neural Music Core

This directory contains the proprietary model architecture for iSing AI's in-house neural music system.

The model is intentionally not initialized from a third-party music model. It must be trained on properly licensed/owned training data before production inference.

Target pipeline:

prompt/lyrics/controls -> text/control encoder -> music-token Transformer -> neural audio decoder -> stereo audio

The current Transformer is the first trainable component. Production quality requires a learned audio tokenizer/codec and substantial training.
