import { SafeAreaView, View, Button, Text, ScrollView } from 'react-native';
import { Video } from '@signalwire-community/react-native';
import { useMembers, useStatus, useLayouts } from '@signalwire-community/react';
import { useState, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';

const TOKEN = '<Insert Video Token Here>';

export default function App() {
  const [roomSession, setRoomSession] = useState(null);
  const onRoomReady = useCallback((rs) => setRoomSession(rs), []);

  const { self, members } = useMembers(roomSession);
  const { active } = useStatus(roomSession);
  const { currentLayout, setLayout, layouts } = useLayouts(roomSession);

  return (
    <SafeAreaView>
      <Video token={TOKEN} onRoomReady={onRoomReady} />
      <ScrollView
        style={{ margin: '2%', width: '96%' }}
        currentContainerStyle={{ flex: 1 }}
      >
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
          <View style={{ marginTop: 5 }}>
            <Button onPress={self?.remove} disabled={!active} title="Leave" />
          </View>
          <Picker
            selectedValue={currentLayout}
            style={{ height: 50, width: 250 }}
            onValueChange={(itemValue) => setLayout({ name: itemValue })}
          >
            {layouts.map((layout) => (
              <Picker.Item label={layout} value={layout} />
            ))}
          </Picker>
        </View>

        {/* Populating controls for Members */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Members:</Text>
        </View>
        {members.map((member) => (
          <View>
            <Text>{member.name}</Text>
            <Text>{member.talking && '🗣'}</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              {['audio', 'video', 'speaker'].map((io) => (
                <Button
                  onPress={member?.[io].toggle}
                  disabled={!active}
                  title={`${member?.[io].muted ? 'Unmute ' : 'Mute '} ${io}`}
                />
              ))}
              <View style={{ marginTop: 5 }}>
                <Button
                  onPress={member?.remove}
                  disabled={!active}
                  title="Remove"
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
