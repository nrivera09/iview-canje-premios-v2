import clsx from 'clsx';
import React, { FC } from 'react';

interface BackButtonProps {
  onClick: () => void;
  title?: string;
  width?: string;
  height?: string;
  className?: string;
}

const BackButton: FC<BackButtonProps> = ({
  onClick,
  title,
  width = 40,
  height = 40,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        `flex items-center justify-center gap-2 pl-[16px]`,
        className
      )}
    >
      <svg
        width={`35px`}
        height={`35px`}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="white" fillOpacity="0.2" />
        <rect
          x="0.5"
          y="0.5"
          width="39"
          height="39"
          rx="19.5"
          stroke="white"
          strokeOpacity="0.2"
        />
        <path
          d="M27 18.9997H15.83L20.71 14.1197C21.1 13.7297 21.1 13.0897 20.71 12.6997C20.32 12.3097 19.69 12.3097 19.3 12.6997L12.71 19.2897C12.32 19.6797 12.32 20.3097 12.71 20.6997L19.3 27.2897C19.69 27.6797 20.32 27.6797 20.71 27.2897C21.1 26.8997 21.1 26.2697 20.71 25.8797L15.83 20.9997H27C27.55 20.9997 28 20.5497 28 19.9997C28 19.4497 27.55 18.9997 27 18.9997Z"
          fill="white"
        />
      </svg>
      <p className="text-white font-semibold text-[20px]">{title}</p>
    </button>
  );
};

export default BackButton;
