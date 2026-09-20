import { Image } from 'react-native';

// The AI Coach avatar. Two crops of the same Nivesha bull mascot: the
// full-body pose for the big onboarding welcome moment, and a closer bust
// crop for small header/chat-sized avatars (lesson headers, Ask Doubt).
// Static image, no animation, per request.
export default function CoachAvatar({ size = 48 }: { size?: number }) {
  const source =
    size >= 80
      ? require('../../assets/bull-mascot-full.png')
      : require('../../assets/bull-mascot-bust.png');
  return (
    <Image
      source={source}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}
