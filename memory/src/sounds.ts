import { Howl } from 'howler';

const Sounds = {
  cardClic: new Howl({
    src: ['/sounds/card-clic.mp3'],
    volume: 0.5,
  }),
  error: new Howl({
    src: ['/sounds/error-sound.mp3'],
    volume: 0.5,
  }),
  success: new Howl({
    src: ['/sounds/success-sound.mp3'],
    volume: 0.5,
  }),
  victory: new Howl({
    src: ['/sounds/victory-sound.mp3'],
    volume: 0.5,
  }),
  bip: new Howl({
    src: ['/sounds/bip-countdown.mp3'],
    volume: 0.5,
  }),
  countdown: new Howl({
    src: ['/sounds/321countdown.mp3'],
    volume: 0.5,
  }),
  gong: new Howl({
    src: ['/sounds/gong.mp3'], // Il file accorciato
    volume: 0.5,
  }),
  backgroundMusic: new Howl({
    src: ['/sounds/background-music.mp3'],
    volume: 0.3,
    loop: true, // Riproduce la musica in loop
  }),
};
// da spostare il sound background su data.json



export default Sounds;