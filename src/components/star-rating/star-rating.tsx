import { Icon, ICONS } from "components/icon/icon";
import { range } from "utils";

import "./star-rating.scss";
//prettier-ignore
type Props = { 
  rating: number; 
  iconSize?: number; 
  iconClassName?: string; 
  containerClassName?: string 
};

export const StarRating = ({ rating, iconSize, iconClassName, containerClassName }: Props) => {
  let auxRating = rating;
  const icons = range(0, 5).map(() => ICONS.STAR_FULL);

  return (
    <div className={`container ${containerClassName}`}>
      {icons.map((icon, index) => {
        auxRating--;
        return (
          <div className={auxRating >= 0 ? "text-yellow-500" : " text-gray-300"} key={index}>
            <Icon className={` h-${iconSize} w-${iconSize} ${iconClassName} `} icon={icon} />
          </div>
        );
      })}
    </div>
  );
};
