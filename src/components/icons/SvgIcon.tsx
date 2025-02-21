import { SvgIconProps } from '@/types/icon';

const SvgIcon = ({
  className,
  width,
  height,
  pathData,
  viewBox,
}: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox={viewBox}
      width={width}
      height={height}
      fillOpacity="1"
      className={className}
    >
      <path d={pathData} />
    </svg>
  );
};

export default SvgIcon;
