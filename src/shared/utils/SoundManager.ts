// shared/utils/SoundManager.ts

import pinSound from '@/shared/assets/sounds/1_PinHit.mp3';
import errorSound from '@/shared/assets/sounds/2_ErrorBeep.mp3';
import buttonSound from '@/shared/assets/sounds/3_ButtonHit.mp3';
import { SoundEffectType } from '@/shared/types/audio.types';

class SoundManager {
  private sounds: Record<SoundEffectType, HTMLAudioElement> = {
    pin: new Audio(pinSound),
    error: new Audio(errorSound),
    button: new Audio(buttonSound),
  };

  public play(type: SoundEffectType) {
    const audio = this.sounds[type];
    if (!audio) return;

    // Reiniciar si el audio aún está reproduciendo
    audio.currentTime = 0;
    audio.play().catch((e) => console.warn(`Error al reproducir sonido: ${e}`));
  }
}

// Exportamos una única instancia
export const soundManager = new SoundManager();
