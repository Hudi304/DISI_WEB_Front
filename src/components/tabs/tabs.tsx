import { Icon } from 'components/icon/icon';
import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./tabs.scss";

type TabsProps = {
  tabs: Array<{
    label: string | JSX.Element,
    path: string,
    icon?: any,
    disabled?: boolean,
  }>
  actions?: React.ReactNode,
}

export const Tabs: React.FC<TabsProps> = ({ tabs, actions }) => {
  const tabsRef = useRef([] as HTMLButtonElement[]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(null as number | null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabClick = (tabIndex: number) => {
    setSelectedTabIndex(tabIndex);
    navigate(tabs[tabIndex].path);
  }

  useEffect(() => {
    tabsRef.current = tabsRef.current.slice(0, tabs.length);
  }, [tabs]);

  useEffect(() => {
    if (location && tabs) {
      const tabIndex = tabs.findIndex(tab => location.pathname.endsWith(tab.path));
      setTimeout(() => {
        setSelectedTabIndex(tabIndex);
      }, 0);
    }
  }, [location, tabs]);

  return (
    <div className="tabs-container">
      <div className="tabs" style={{
        gridTemplateColumns: `repeat(${tabs.length}, auto) 1fr`,
      }}>
        {tabs.map((tab, index) => (
          <button
            ref={el => tabsRef.current[index] = el as HTMLButtonElement}
            key={index}
            disabled={tab.disabled}
            className={`tab-button ${selectedTabIndex === index && 'selected'} ${tab.disabled && 'disabled'}`}
            onClick={() => handleTabClick(index)}
            type="button"
          >
            {tab.label}
            {tab.icon && <Icon icon={tab.icon} className="tab-icon" />}
          </button>
        ))}
        {
          actions && <div className="tabs-actions">
            {actions}
          </div>
        }
      </div>
      {
        selectedTabIndex !== null && <span className='tab-slider' style={{
          width: tabsRef.current[selectedTabIndex || 0]?.offsetWidth || 0,
          left: tabsRef.current[selectedTabIndex || 0]?.offsetLeft || 0,
        }}></span>
      }
    </div>
  );
};