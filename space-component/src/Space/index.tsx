import classNames from "classnames";
import React from "react";

export type SizeType = "small" | "middle" | "large" | number | undefined;

// 这样就可以传入div的各种属性
export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | [SizeType, SizeType];
  direction?: "horizontal" | "vertical";
  align?: "start" | "end" | "center" | "baseline";
  wrap?: boolean;
  split?: React.ReactNode;
}

const Space: React.FC<SpaceProps> = (props) => {
  const {
    className,
    style,
    children,
    size = "small",
    direction = "horizontal",
    align,
    split,
    wrap = false,
    ...otherProps
  } = props;

  const childNodes = React.Children.toArray(props.children);

  const mergedAlign =
    direction === "horizontal" && align === undefined ? "center" : align;

  const cn = classNames(
    "space",
    "space-${direction}",
    {
      [`space-align-${mergedAlign}`]: mergedAlign,
    },
    className
  );

  const nodes = childNodes.map((child: any, i) => {
    const key = (child && child.key) || `space-item-${i}`;
    return (
      <div className="space-item" key={key}>
        {child}
      </div>
    );
  });

  return (
    <div className={cn} style={style} {...otherProps}>
      {nodes}
    </div>
  );
};

export default Space;
