import { Icon, ICONS } from "components/icon/icon"
import { FC } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./breadcrumbs.scss"

type Props = {
  routes: Array<{
    label: string,
    path: string,
  }>,
  className?: string,
}

export const Breadcrumbs: FC<Props> = ({ routes, className }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isCurrent = (path: string) => {
    return location.pathname.endsWith(path);
  }

  return <div className={`breadcrumbs ${className}`}>
    {routes.filter(route => location.pathname.includes(route.path))
      .map((route) => (
        <button
          key={route.label}
          className={`breadcrumb ${isCurrent(route.path) && 'active'}`}
          onClick={() => navigate(route.path)}
          type="button"
        >
          {route.label}
          {!isCurrent(route.path) && <span className="breadcrumb-separator">
            <Icon icon={ICONS.CHEVRON_RIGHT} size={3} />
          </span>}
        </button>
      ))}
  </div>
}
