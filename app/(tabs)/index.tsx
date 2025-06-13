import { Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from '@/components/Themed';
import { upload } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";
import React, { useEffect, useState, useCallback } from 'react';

export default function TabOneScreen() {

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dulkatxpm',
        },
        url: {
            secure: true // Use HTTPS
        },
        
    });

    const options = {
      unsigned: true,
      upload_preset: 'eventPics',
      resourceType: "image",
      tags: ["eventPics"],
    }

  const [image, setImage] = useState<string | null>(null);
  const [uploadToggle, setUploadToggle] = useState<boolean>(false);

  const yoinkImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // base64: true,
      allowsMultipleSelection: true,
      // allowsEditing: true,    
      quality: 1,
    });

    console.log("Image selected?");
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }    

  }
  

  useEffect(() => {
    if (uploadToggle) {
      upload(cld, {
        file: image,
        options: options,
        callback: (err, res) => {
          if(err){
            console.error('Upload failed:', err);
            return;
          }
          console.log('Upload successful:', res);
        }})
      setUploadToggle(false);
    }
  }, [uploadToggle]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload To Cloudinary</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Pick an image from camera roll" onPress={yoinkImage} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Upload the image" onPress={() => {setUploadToggle(true)}}/>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
