import { FC } from "react";
import "./loading.css";

interface ILoadingProps {
  width?: number;
  height?: number;
}
const Loading: FC<ILoadingProps> = ({ width = 28, height = 28 }) => {
  return <div style={{ width, height }} className="loading-icon" />;
};

export default Loading;
