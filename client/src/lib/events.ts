export interface EventPhotoAlbum {
  label: string;
  url: string;
  description?: string;
}

export interface TrustEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  category: "Certificate Distribution" | "Celebration" | "Sabha" | "Pariksha";
  description: string;
  youtubeLiveUrl?: string;
  youtubeEmbedId?: string;
  photoAlbums?: EventPhotoAlbum[];
}

export const TRUST_EVENTS: TrustEvent[] = [
  {
    id: "chennai-certificate-distribution-2026",
    title: "Chennai Varshika Veda Poorthi Pariksha Certificate Distribution",
    date: "21 October 2026",
    location: "Chennai, Tamil Nadu",
    category: "Certificate Distribution",
    description:
      "Annual Varshika Veda Poorthi Pariksha Certificate Distribution Ceremony of Veda Rakshana Nidhi Trust. Successful Vidyarthis who completed their Vedic examinations were felicitated with Sambhavana and certificates of proficiency in the presence of revered Vidwans and Trust dignitaries.",
    youtubeLiveUrl: "https://www.youtube.com/live/a65wf_XNxzY?si=4EO2kKJuxsV6xe2p",
    youtubeEmbedId: "a65wf_XNxzY",
    photoAlbums: [
      {
        label: "Event Photos - Album 1",
        url: "https://drive.google.com/drive/folders/1dLwCpLlx5iBFwxEppiFUEmRlCjmVX0I3?usp=sharing",
        description: "Ceremony proceedings, Vidyarthi felicitation, and stage photographs.",
      },
      {
        label: "Event Photos - Album 2",
        url: "https://drive.google.com/drive/folders/1N_FIwOe3tUgpqPf54kobFDl-GiLROiqi?usp=drive_link",
        description: "Group photos, certificate presentations, and Sabha moments.",
      },
    ],
  },
];