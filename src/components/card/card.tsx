import { Loader } from 'components/loader/loader';
import React from 'react';
import "./card.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
};

export const Card: React.FC<Props> = ({ children, className = '', loading }) => {
  return (
    <div className={`card ${className}`}>
      {children}
      {loading && <div className="card-loading">
        <Loader size={16} className='text-primary-' />
      </div>}
    </div>
  );
}