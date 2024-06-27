import { PropsWithChildren, forwardRef } from "react";
import cs from "classnames";
import "./index.scss";

type BaseIconProps = {
  className?: string;
  style?: React.CSSProperties;
  size?: string | string[];
  spin?: boolean;
};

// Omit<T, K|k|k>; T是继承的类型 K是想要去除的属性键
// Pick 选取某些属性
// Exclude 排除某些类型
export type IconProps = BaseIconProps &
  Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>;

export const getSize = (size: IconProps["size"]) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[];
  }
  const width = (size as string) || "1em";
  const height = (size as string) || "1em";

  return [width, height];
};

// forwardRef 转发出去
// SVGSVGElement 表示svg容器元素
export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>(
  (props, ref) => {
    // 1em 是font-size的大小
    const { style, className, spin, size = "1em", children, ...rest } = props;
    const [width, height] = getSize(size);
    const cn = cs(
      "icon",
      {
        "icon-spin": spin,
      },
      className
    );

    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        className={cn}
        style={style}
        fill="currentColor"
        {...rest}
      >
        {children}
      </svg>
    );
  }
);
