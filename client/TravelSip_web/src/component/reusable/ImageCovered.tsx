import React from "react";
import cameraPng from "../../assets/images/camera.png";

interface ImageCoveredProps {
  width: string;
  height: string;
  src: string;
  width2: string;
  height2: string;
  radius: string;
}

const ImageCovered: React.FC<ImageCoveredProps> = (props) => {
  const { width, height, src, width2, height2, radius } = props;
  return (
    <div
      className={`relative ${width} ${height} object-cover ${radius} overflow-hidden`}
    >
      <img className="w-full h-full object-cover  " src={src} />
      <div className="w-full h-full flex justify-center items-center absolute left-0 opacity-0 top-0 hover:bg-gray hover:opacity-70 cursor-pointer transition-opacity duration-300">
        <img className={`${width2} ${height2}`} src={cameraPng} />
      </div>
    </div>
  );
};

export default ImageCovered;
