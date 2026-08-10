// Web Audio API ambient romantic music generator for the wedding experience
// No external mp3 required - lightweight, pure audio synthesis!

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;

  private notes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
  ];

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (this.isPlaying) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

      // Lowpass filter for dreamy soft tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      this.masterGain.connect(filter);
      filter.connect(this.ctx.destination);

      this.isPlaying = true;
      this.playRomanticChord();

      this.intervalId = window.setInterval(() => {
        if (this.isPlaying && this.ctx) {
          this.playRandomNote();
        }
      }, 2400);
    } catch (e) {
      console.warn('Audio Synthesis not supported or blocked:', e);
    }
  }

  private playRomanticChord() {
    if (!this.ctx || !this.masterGain) return;
    const chordNotes = [261.63, 329.63, 392.00, 523.25]; // C Major 7 chord feel
    
    chordNotes.forEach((freq) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 3);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 8);
    });
  }

  private playRandomNote() {
    if (!this.ctx || !this.masterGain) return;
    const freq = this.notes[Math.floor(Math.random() * this.notes.length)];
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 4.5);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        if (this.ctx && this.ctx.state !== 'closed') {
          this.ctx.close();
        }
        this.ctx = null;
      }, 600);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
