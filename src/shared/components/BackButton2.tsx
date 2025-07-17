import { useUserStore } from '@/store/userStore';
import clsx from 'clsx';
import React, { FC } from 'react';
interface BackButtonProps {
  onClick: () => void;
  title?: string;
  width?: string;
  height?: string;
  className?: string;
}
const BackButton2: FC<BackButtonProps> = ({ onClick, className }) => {
  const beneficio = useUserStore((s) => s.selectedBeneficioData);
  return (
    <button onClick={onClick}>
      <div className="relative !hidden">
        <img
          src="/assets/arrow2.png"
          alt=""
          className="fixed left-0 top-0 z-0"
        />
        <div className="absolute z-10 -top-2 left-[15px]">
          {beneficio?.promocion === 'MIREGA' && (
            <img
              src={`/assets/arrowMirega.png`}
              alt=""
              className="w-[40px] min-w-[40px] h-[40px]"
            />
          )}
          {beneficio?.promocion === 'DOREGA' && (
            <img
              src={`/assets/arrowDorega2.png`}
              alt=""
              className="w-[40px] min-w-[40px] h-[40px]"
            />
          )}
          {beneficio?.promocion !== 'MIREGA' &&
            beneficio?.promocion !== 'DOREGA' && (
              <svg
                className="w-[40px] min-w-[40px] h-[40px]"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="40"
                  height="40"
                  rx="20"
                  fill="white"
                  fillOpacity="0.2"
                />
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
            )}
        </div>
      </div>

      <svg
        className={clsx(className, ``)}
        width="72"
        height="240"
        viewBox="0 0 72 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <foreignObject x="-81" y="-81" width="206" height="402">
          <div
            style={{
              backdropFilter: 'blur(40px)',
              clipPath: 'url(#bgblur_0_1396_4743_clip_path)',
              height: '100%',
              width: '100%',
            }}
          />
        </foreignObject>

        <path
          data-figma-bg-blur-radius="80"
          d="M27.4746 -0.157228L27.4756 -0.154298C27.4761 -0.15261 27.4774 -0.149705 27.4785 -0.146486C27.4806 -0.140017 27.4833 -0.130472 27.4873 -0.118165C27.4956 -0.0927544 27.5082 -0.0549124 27.5244 -0.00488402C27.5569 0.0953956 27.6054 0.244919 27.668 0.442382C27.7931 0.837496 27.9759 1.42566 28.209 2.19726C28.6751 3.74042 29.3405 6.01978 30.1387 8.96875C31.735 14.8671 33.8628 23.4448 35.9902 34.168C40.245 55.6137 44.5 85.6474 44.5 120C44.5 154.353 40.245 184.386 35.9902 205.832C33.8628 216.555 31.735 225.133 30.1387 231.031C29.3405 233.98 28.6751 236.26 28.209 237.803C27.9759 238.574 27.7931 239.163 27.668 239.558C27.6054 239.755 27.5569 239.905 27.5244 240.005C27.5082 240.055 27.4956 240.093 27.4873 240.118C27.4833 240.13 27.4806 240.14 27.4785 240.146C27.4775 240.15 27.4761 240.153 27.4756 240.154L27.4746 240.156L27.3613 240.5H-0.5V-0.5H27.3613L27.4746 -0.157228Z"
          fill="#292344"
          stroke="url(#paint0_radial_1396_4743)"
        />

        <rect
          x="16"
          y="16"
          width="40"
          height="40"
          rx="20"
          fill="white"
          fillOpacity="0.2"
        />
        <rect
          x="16.5"
          y="16.5"
          width="39"
          height="39"
          rx="19.5"
          stroke="white"
          strokeOpacity="0.2"
        />
        <path
          d="M41.8337 35.1666H32.5254L36.5921 31.0999C36.9171 30.7749 36.9171 30.2416 36.5921 29.9166C36.2671 29.5916 35.7421 29.5916 35.4171 29.9166L29.9254 35.4083C29.6004 35.7333 29.6004 36.2583 29.9254 36.5833L35.4171 42.0749C35.7421 42.3999 36.2671 42.3999 36.5921 42.0749C36.9171 41.7499 36.9171 41.2249 36.5921 40.8999L32.5254 36.8333H41.8337C42.2921 36.8333 42.6671 36.4583 42.6671 35.9999C42.6671 35.5416 42.2921 35.1666 41.8337 35.1666Z"
          fill="white"
        />

        <defs>
          <clipPath id="bgblur_0_1396_4743_clip_path">
            <path d="M27.4746 -0.157228L27.4756 -0.154298C27.4761 -0.15261 27.4774 -0.149705 27.4785 -0.146486C27.4806 -0.140017 27.4833 -0.130472 27.4873 -0.118165C27.4956 -0.0927544 27.5082 -0.0549124 27.5244 -0.00488402C27.5569 0.0953956 27.6054 0.244919 27.668 0.442382C27.7931 0.837496 27.9759 1.42566 28.209 2.19726C28.6751 3.74042 29.3405 6.01978 30.1387 8.96875C31.735 14.8671 33.8628 23.4448 35.9902 34.168C40.245 55.6137 44.5 85.6474 44.5 120C44.5 154.353 40.245 184.386 35.9902 205.832C33.8628 216.555 31.735 225.133 30.1387 231.031C29.3405 233.98 28.6751 236.26 28.209 237.803C27.9759 238.574 27.7931 239.163 27.668 239.558C27.6054 239.755 27.5569 239.905 27.5244 240.005C27.5082 240.055 27.4956 240.093 27.4873 240.118C27.4833 240.13 27.4806 240.14 27.4785 240.146C27.4775 240.15 27.4761 240.153 27.4756 240.154L27.4746 240.156L27.3613 240.5H-0.5V-0.5H27.3613L27.4746 -0.157228Z" />
          </clipPath>

          <radialGradient
            id="paint0_radial_1396_4743"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(45.5 120) rotate(-180) scale(91 71.4703)"
          >
            <stop stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </button>
  );
};

export default BackButton2;
