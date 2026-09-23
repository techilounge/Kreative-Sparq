import { ImageResponse } from "next/og";
import {
  SocialImageArtwork,
  socialImageAlt,
  socialImageSize,
} from "./social-image";

export const alt = socialImageAlt;
export const size = socialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<SocialImageArtwork />, size);
}
