# Tracking 

Tracking, because I have really bad working memory and a tendency to not complete projects as I forget their purpose/painful implementation

## Purpose
- Pick some images from gallery (image picker) on my phone
- upload picked image/images to cloudinary cloud with tag 
- success / failure page (time out) 
- back to main page (upload side)

## Tabs
- Upload 
- Meta Data 

## Decisions Made 
- Go ahead with react native sdk and expo sdk v50 (deprecated version)
   - Too much effort to make a fix for something that is effectively a side project 
- Add a global context 

## Wrap Up 
- Global Context to store 
   - cloud name 
   - uploadPreset
   - tags 
- Processing Multiple Images [done]
- Something to invoke github action to redeploy backend (sep. button to activate)

## To Do 
1. Get initial version uploading [done]
2. Get multi-image select working [done]
3. Style bottom page icons for Upload and Meta Data Tabs [done]
4. Style buttons in Pages [Skip!]
5. Figure out items to put in meta page [done]
6. Implement global context [done]
7. Preview Grid [done]
8. Toast Implementation [done]
9. Loading Spinner Implementation [done]
11. Abstract all config data to hooks [done]
10. Configure Auto Deployment of Github Actions [done - manual trigger]

