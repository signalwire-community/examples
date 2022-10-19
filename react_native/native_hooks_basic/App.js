import { SafeAreaView, View, Button, Text } from 'react-native';
import { Video } from '@signalwire-community/react-native';
import { useMembers, useStatus } from '@signalwire-community/react';
import { useState, useCallback } from 'react';

export default function DemoVideo() {
  const [roomSession, setRoomSession] = useState(null);
  const onRoomReady = useCallback((rs) => setRoomSession(rs), []);

  const { self, members } = useMembers(roomSession);
  const { active } = useStatus(roomSession);

  return (
    <SafeAreaView>
      <Video token="<Video Token Here>" onRoomReady={onRoomReady} />

      {/* Populating controls for self */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {['audio', 'video', 'speaker'].map((io) => (
          <Button
            onPress={self?.[io].toggle}
            disabled={!active}
            title={`${self?.[io].muted ? 'Unmute ' : 'Mute '} ${io}`}
          />
        ))}
      </View>

      {/* Displaying member list */}
      <Text style={{ fontWeight: 'bold' }}>Members:</Text>

      {members.map((member) => (
        <View>
          <Text>{member.name}</Text>
          <Text>{member.talking && '🗣'}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
}
