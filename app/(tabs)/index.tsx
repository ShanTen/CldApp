import { Button, StyleSheet , ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { Toast } from 'toastify-react-native';
import * as ImagePicker from 'expo-image-picker';

import { Text, View } from '@/components/Themed';
import { upload } from 'cloudinary-react-native';
import { useCloudinaryConfig } from '@/Hooks/CloudinaryConfig';
import ImageGrid from '@/components/ImageGrid';
import { useGlobal } from '@/Hooks/GlobalContext';
import getStyles  from "@/styles/UploadScreen";
import { useColorScheme } from '@/components/useColorScheme';

export default function Upload() {
  const theme = useColorScheme() ?? 'dark';
  const styles = getStyles(theme);
  const cld = useCloudinaryConfig();
  
  const { settings } = useGlobal();

  /*
    Sanity Check: uploadToggle is the variable that actually invokes the uploading of the images 
    It is turned out when the "uploadImages" button is pressed 

    uploadToggle = true = upload shit 
    uploadToggle = false = do not upload shit 
  */ 
  const [uploadToggle, setUploadToggle] = useState<boolean>(false);

  const [uploading, setUploading] = useState<boolean>(false);

  // disable upload when there are a) no images selected b) during an upload 
  const [disableUpload, setDisableUpload] = useState<boolean>(true);
  const [disableClear, setDisableClear] = useState<boolean>(true);

  const [images, setImages] = useState<string[]>([]);
  const [options] = useState<any>(settings);
  const [error, setError] = useState<any>(null);
  

  const getImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });

    
    if (!result.canceled) {
      setImages(result.assets.map(asset => asset.uri));
    }    

  }
  
  const uploadImages = useCallback(async (images : string[])=> {
    if (images.length === 0) {
      setError({message: "No images to upload, what are you trying to do lil bro?"})
      setUploading(false);
      setDisableUpload(true);
      setDisableClear(true);
      return;
    }

    const handleReq = (err: any, res: any) => {
      if(err){
        console.error('Upload failed:', err);
        setError(err);
        return;
      }
    }

    try {
      for (const img of images) {

        await upload(cld, {
          file: img,
          options: options,
          callback: handleReq
        });

      }

      Toast.success("Images uploaded", "top")
    }
    catch (err){
      console.error("An error occurred when uploading images.")
      setError(err)
    }

    setUploading(false);
    setImages([]); 
  }, [])

  useEffect(() => {
    if (uploadToggle) {
      setUploading(true);
      setDisableUpload(true);
      setDisableClear(true);
      uploadImages(images);
      setUploadToggle(false);
    }
  }, [uploadToggle]);

  useEffect(() => {
    if (images.length === 0) {
      setUploadToggle(false);
      setDisableClear(true);
      setDisableUpload(true);
    }
    else{
      setDisableClear(false);
      setDisableUpload(false)
    }
  }, [images]);

  useEffect(() => {
    if (error) {
      Toast.error(error.message || "An error occurred")      
    } 
  }, [error]);

  return (
    <View style={styles.container}>
      <Button title="Select images" onPress={getImage} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.buttonContainer}>
        <Button title="Upload images" onPress={() => {setUploadToggle(true)}} disabled={disableUpload} />
        <Button color="red" title="Clear Selection" onPress={() => setImages([])} disabled={disableClear} />
      </View>
      { uploading && <ActivityIndicator size="large" color="rgb(251, 242, 242)" animating={uploading} /> }
      { images.length > 0 && <ImageGrid images={images.map(uri => ({ uri }))} /> }
      { uploading && <Text>Uploading...</Text> }
    </View>
  );
}