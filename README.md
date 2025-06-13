# Cloudinary Upload 

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).


## Purpose

- Pick some images from gallery (image picker)  
- upload picked image/images to cloudinary cloud with tag 
- success / failure page (time out) 
- back to main page (upload side)

## Tabs
- Upload 
- Meta Data 

## Decisions Made 
- Go ahead with react native sdk and expo sdk v50 (deprecated version)
   - Too much effort to make a fix for something that is effectively a side project 


## Wrap Up 
- Global Context to store 
   - cloud name 
   - uploadPreset
   - tags 
- Processing Multiple Images 
- Something to invoke github action to redeploy backend (sep. button to activate)



