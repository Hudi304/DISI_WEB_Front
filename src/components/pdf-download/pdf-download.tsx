import { FC } from "react";
import "./pdf-download.scss";
import { downloadPdf } from "utils";
import { Icon, ICONS } from "components/icon/icon";

type DownloadPDFProps = {
  className?: string;
  documentUrl: string | undefined;
  documentTitle: string | undefined;
  iconSize?: number;
};

//TODO add on hover filename (not designed as of the date of this commit)

export const DownloadPDF: FC<DownloadPDFProps> = ({ className, documentTitle, documentUrl, iconSize = 7 }: DownloadPDFProps) => {
  const fileName = (documentTitle?.replaceAll(" ", "_") || "unknown").concat(".pdf");

  return (
    <button
      className={`download-pdf-button ${className}`}
      onClick={() => {
        downloadPdf(documentUrl || "", fileName);
      }}
    >
      <Icon size={iconSize} className="text-fuchsia-900" icon={ICONS.DOCUMENT_DOWNLOAD}></Icon>
    </button>
  );
};
