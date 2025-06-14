import { Button, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import getStyles from '@/styles/SettingsScreen';
import { useColorScheme } from '@/components/useColorScheme';
import { useEffect, useState } from 'react';
import { useGlobal } from '@/Hooks/GlobalContext';

/*
  Mental Dump:
  * Handling null values for settings...
*/

export default function SettingsScreen() {
  const theme = useColorScheme() ?? 'dark';
  const styles = getStyles(theme);
  const { settings, setSettings } = useGlobal();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [editButtonText, setEditButtonText] = useState<string>("Edit Variables");

  const [folder, setFolder] = useState<string>(settings.folder);
  const [unsigned, setUnsigned] = useState<boolean>(settings.unsigned);

  const [cloud_name, setCloudName] = useState<string>(settings.cloud_name);
  const [upload_preset, setUploadPreset] = useState<string>(settings.upload_preset);
  const [resource_type, setResourceType] = useState<string>(settings.resource_type);
  const [tags, setTags] = useState<string[]>(settings.tags); 

  useEffect(() => {
    if(cloud_name && upload_preset && resource_type && tags.length > 0) {
      setSettings({
        cloud_name, upload_preset, resource_type, tags, folder, unsigned
      });
      setDisabled(false);
    }
    else{
      setDisabled(true)
    }

  }, [cloud_name, upload_preset, resource_type, tags]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cloud Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter cloud name"
        autoCapitalize="none"
        autoCorrect={false}
        defaultValue={cloud_name}
        keyboardType="default"
        editable={isEditing}
        returnKeyType="done"
        placeholderTextColor='grey'
        onSubmitEditing={(event) => {
          if (isEditing) {
            setCloudName(event.nativeEvent.text);
          }
        }}
      />
      
      <Text style={styles.title}>Upload Preset</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter upload preset"
        autoCapitalize="none"
        defaultValue={upload_preset}
        autoCorrect={false}     
        keyboardType="default"
        returnKeyType="done"
        editable={isEditing}
        placeholderTextColor='grey'
        onSubmitEditing={(event) => {
          if (isEditing) {
            setUploadPreset(event.nativeEvent.text);
          }
        }
        }
      />
      <Text style={styles.title}>Resource Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter resource type"  
        autoCapitalize="none"
        defaultValue={resource_type}
        autoCorrect={false}
        keyboardType="default"
        returnKeyType="done"
        editable={isEditing}
        placeholderTextColor='grey'
        onSubmitEditing={(event) => {
          if (isEditing) {
            setResourceType(event.nativeEvent.text);
          }
        }
        }
      />

      <Text style={styles.title}>Tags</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter tags (comma separated)"
        autoCapitalize="none"
        defaultValue={tags.join(', ')}
        autoCorrect={false}
        keyboardType="default"
        returnKeyType="done"
        placeholderTextColor='grey'
        editable={isEditing}
        onSubmitEditing={(event) => {
          if (isEditing) {
            const tagsArray = event.nativeEvent.text.split(',').map(tag => tag.trim());
            setTags(tagsArray);
          }
        }
        }
      />
      <Text style={styles.title}>Current Values:</Text>
      <View style={styles.separator}></View>
      <Text style={styles.text}>Cloud Name: {cloud_name}</Text>
      <Text style={styles.text}>Upload Preset: {upload_preset}</Text>
      <Text style={styles.text}>Resource Type: {resource_type}</Text>
      <Text style={styles.text}>Tags: {tags.join(', ')}</Text>



      <Button disabled={disabled} color="green" title={editButtonText} onPress={
        () => {
          setIsEditing(!isEditing);
          setEditButtonText(isEditing ? "Edit Variables" : "Save Variables");
        }
        } />
    </View>
  );
}


