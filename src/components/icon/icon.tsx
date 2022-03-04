import { FC, memo } from "react";
import "./icon.scss";
import {
  ExclamationIcon,
  SaveIcon,
  ClipboardCheckIcon,
  BellIcon,
  UserIcon,
  HomeIcon,
  PlusCircleIcon,
  ChevronRightIcon,
  ChartSquareBarIcon,
  DocumentSearchIcon,
  ClipboardListIcon,
  StatusOnlineIcon,
  HeartIcon,
  CursorClickIcon,
  FlagIcon,
  FireIcon,
  KeyIcon,
  PhotographIcon,
  ThumbUpIcon,
  CheckIcon,
  XIcon,
  CogIcon,
  EyeIcon,
  TrashIcon,
  ClipboardCopyIcon,
  PencilIcon,
  ArrowRightIcon,
  FilterIcon,
  ViewBoardsIcon,
  SearchIcon,
  SaveAsIcon,
  TagIcon,
  DownloadIcon,
  ShareIcon,
  StarIcon,
  DocumentDuplicateIcon,
  PaperAirplaneIcon,
  PlusIcon,
  ChevronLeftIcon,
  // ChevronUpIcon,
  MenuIcon,
  MenuAlt4Icon,
  DocumentDownloadIcon,
  ClockIcon,
} from "@heroicons/react/outline";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { StarFull, StarEmpty } from "../../assets/icons/rating-stars";

export const ICONS = {
  SAVE: SaveIcon,
  BELL: BellIcon,
  USER: UserIcon,
  HOME: HomeIcon,
  CLIPBOARD_CHECK: ClipboardCheckIcon,
  CHART_SQUARE_BAR: ChartSquareBarIcon,
  DOCUMENT_SEARCH: DocumentSearchIcon,
  EXCLAMATION: ExclamationIcon,
  PLUS_CIRCLE: PlusCircleIcon,
  PLUS: PlusIcon,
  CLIPBOARD_LIST: ClipboardListIcon,
  STATUS_ONLINE: StatusOnlineIcon,
  HEARTH: HeartIcon,
  CURSOR_CLICK: CursorClickIcon,
  FLAG: FlagIcon,
  CHEVRON_RIGHT: ChevronRightIcon,
  CHEVRON_LEFT: ChevronLeftIcon,
  EQUALS: MenuAlt4Icon,
  CHEVRON_DOWN: ChevronDownIcon,
  CHEVRON_UP: ChevronUpIcon,
  VIEW: EyeIcon,
  PENCIL: PencilIcon,
  DELETE: TrashIcon,
  CANCEL: XIcon,
  CHECK: CheckIcon,
  COPY: ClipboardCopyIcon,
  FIRE: FireIcon,
  PHOTOGRAPH: PhotographIcon,
  THUMBS_UP: ThumbUpIcon,
  KEY: KeyIcon,
  COG: CogIcon,
  ARROW_RIGHT: ArrowRightIcon,
  FILTER: FilterIcon,
  VIEW_BOARDS: ViewBoardsIcon,
  SEARCH: SearchIcon,
  SAVE_AS: SaveAsIcon,
  TAG: TagIcon,
  DOWNLOAD: DownloadIcon,
  SHARE: ShareIcon,
  FEATURED: StarIcon,
  DOCUMENT_DUPLICATE: DocumentDuplicateIcon,
  PAPER_AIRPLANE: PaperAirplaneIcon,
  STAR_FULL: StarFull,
  STAR_EMPTY: StarEmpty,
  MENU: MenuIcon,
  DOCUMENT_DOWNLOAD: DocumentDownloadIcon,
  CLOCK: ClockIcon,
};

type Props = {
  icon: any;
  className?: string;
  size?: number;
};

export const Icon: FC<Props> = memo(({ icon, className, size = 5 }: Props) => {
  const IconComp = icon;
  if (!icon) return null;
  return <IconComp className={`h-${size} w-${size} ${className}`} />;
});
