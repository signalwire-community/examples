import { useCallback, useState } from 'react';
import { Video } from '@signalwire-community/react';
const TOKEN = '<Insert Token Here';

export default function DemoVideo() {
  const [roomSession, setRoomSession] = useState(null);
  const onRoomReady = useCallback((rs) => setRoomSession(rs), []);
  const [memberId, setMemberId] = useState(null);
  const [settings, setSettings] = useState({
    audioMuted: false,
    videoMuted: false,
  });

  return (
    <div style={{ maxWidth: 700 }}>
      <Video
        token={TOKEN}
        onRoomReady={onRoomReady}
        onRoomJoined={(details) => {
          setMemberId(details.member_id);
        }}
        onMemberUpdated={(details) => {
          if (details.member.id === memberId) {
            console.log('Your settings were updated', details.member);
            const newSettings = {
              audioMuted: details.member.audio_muted ?? settings.audioMuted,
              videoMuted: details.member.video_muted ?? settings.videoMuted,
            };
            setSettings(newSettings);
          }
        }}
      />
      <button
        onClick={(e) => {
          roomSession?.leave();
        }}
      >
        Leave!
      </button>
      <button
        onClick={(e) => {
          settings.audioMuted
            ? roomSession?.audioUnmute()
            : roomSession?.audioMute();
        }}
        style={{ background: settings.audioMuted ? 'red' : 'green' }}
      >
        {settings.audioMuted ? 'Unmute Audio' : 'Mute Audio'}
      </button>
      <button
        onClick={(e) => {
          settings.videoMuted
            ? roomSession?.videoUnmute()
            : roomSession?.videoMute();
        }}
        style={{ background: settings.videoMuted ? 'red' : 'green' }}
      >
        {settings.videoMuted ? 'Unmute Video' : 'Mute Video'}
      </button>
    </div>
  );
}
