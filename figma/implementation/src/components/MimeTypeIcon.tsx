import { Icons } from "../contexts/Icons";
import { cn } from "../lib/utils";

export default function MimeTypeIcon({
  mimeType,
  classes,
}: {
  mimeType: string;
  classes?: string;
}) {
  return (
    <Icons.Consumer>
      {({
        UnknownFileTypeIcon,
        MusicFileTypeIcon,
        VideoFileTypeIcon,
        ImageFileTypeIcon,
        PdfFileTypeIcon,
      }) => {
        let IconComponent;
        switch (mimeType) {
          case "audio/mpeg":
            IconComponent = MusicFileTypeIcon;
            break;
          case "application/pdf":
            IconComponent = PdfFileTypeIcon;
            break;
          case "video/mp4":
            IconComponent = VideoFileTypeIcon;
            break;
          case "image/jpeg":
          case "image/png":
            IconComponent = ImageFileTypeIcon;
            break;
          default:
            IconComponent = UnknownFileTypeIcon;
        }
        return <IconComponent fill="black" className={cn(classes)} />;
      }}
    </Icons.Consumer>
  );
}
