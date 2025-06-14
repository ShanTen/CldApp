import { Cloudinary } from "@cloudinary/url-gen";
import settings from "@/constants/DefaultSettings";

export function useCloudinaryConfig() {
  const cld = new Cloudinary({
    cloud: { cloudName: settings.cloud_name, },
    url: {
      secure: true
    },
  });

  return cld
}