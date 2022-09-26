import { useCallback, useState } from 'react';
import {
  VideoConference,
  useMembers,
  useStatus,
  useLayouts,
  useScreenShare,
} from '@signalwire-community/react';

export default function DemoVideo() {
  const [roomSession, setRoomSession] = useState(null);
  const onRoomReady = useCallback((rs) => setRoomSession(rs), []);

  const { self, members } = useMembers(roomSession);
  const { active } = useStatus(roomSession);
  const { layouts, setLayout, current_layout } = useLayouts(roomSession);
  const { toggle, active: screenShareActive } = useScreenShare(roomSession);

  return (
    <div style={{ maxWidth: 700 }}>
      <VideoConference
        token="vpt_78f91a752d4d9c685e47bd4a19fe72c1"
        onRoomReady={onRoomReady}
      />

      {/* Populating controls for self */}
      {['audio', 'video', 'speaker'].map((io) => (
        <button onClick={() => self?.[io].toggle()} disabled={!active}>
          {self?.[io].muted ? 'Unmute ' : 'Mute '} {io}
        </button>
      ))}
      <button disabled={!active} onClick={toggle}>
        {screenShareActive ? 'Stop screen share' : 'Start screen share'}
      </button>
      <button onClick={() => self?.remove()} disabled={!active}>
        Leave
      </button>

      {/* Creating a Layout Selector */}
      {active && (
        <select
          value={current_layout}
          onChange={(e) => {
            setLayout({ name: e.target.value });
          }}
        >
          {layouts.map((l) => (
            <option value={l} key={l}>
              {l}
            </option>
          ))}
        </select>
      )}

      {/* Populating members and their controls */}
      <div>
        <b>Members: </b>
        <ul>
          {members.map((member) => (
            <li>
              {member.name}
              {member.talking && '🗣'}

              {['audio', 'video', 'speaker'].map((io) => (
                <button onClick={member[io].toggle}>
                  {member[io].muted ? 'Unmute ' : 'Mute '} {io}
                </button>
              ))}
              <button onClick={member.remove}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
