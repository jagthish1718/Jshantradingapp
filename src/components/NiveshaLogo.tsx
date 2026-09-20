import { Image } from 'react-native';

// The Nivesha mascot/logo — a close crop of the bull artwork used everywhere
// the app shows its logo (headers, profile). No animation, no hand-coded
// SVG shapes: just the app's own bull image.
export default function NiveshaLogo({ size = 64 }: { size?: number }) {
  return (
    <Image
      source={require('../../assets/bull-mascot-bust.png')}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}
