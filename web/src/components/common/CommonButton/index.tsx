"use client";
import { useRouter } from "next/navigation";
import { CSSProperties, FC, PropsWithChildren, useMemo } from "react";

type CommonButtonType = "regular" | "primary" | "disable" | "outline";
export interface ICommonButtonProps extends PropsWithChildren {
  link?: string;
  onClick?: () => void;
  type?: CommonButtonType;
  style?: CSSProperties;
}
const CommonButton: FC<ICommonButtonProps> = (props) => {
  const router = useRouter();

  const styleByType: CSSProperties = useMemo(() => {
    const style: CSSProperties = {
      padding: "6px 12px",
      borderRadius: 4,
      fontSize: 15,
    };
    switch (props.type) {
      case "disable": {
        style.color = "gray";
        style.opacity = 0.4;
        break;
      }
      case "primary": {
        style.background = "var(--primary-color)";
        style.color = "white";
        break;
      }
      case "regular": {
        style.border = "1px solid var(--primary-color)";
        style.color = "var(--primary-color)";
        break;
      }
    }

    return style;
  }, [props.type]);

  const handleOnClick = () => {
    if (props.link) {
      router.replace(props.link);
    } else if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      className="active:opacity-70 transition-all inline-flex items-center justify-center gap-x-1"
      onClick={handleOnClick}
      style={{ ...styleByType, ...props.style }}
    >
      {props.children}
    </button>
  );
};

export default CommonButton;
