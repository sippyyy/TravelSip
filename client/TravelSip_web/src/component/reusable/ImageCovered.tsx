import React from "react";
import cameraPng from "../../assets/images/camera.png";

interface ImageCoveredProps {
  width: string;
  height: string;
  src: string;
  width2: string;
  height2: string;
  radius: string;
  id:string;
  setValue: React.Dispatch<React.SetStateAction<File | undefined>>;
  img:File | undefined
}

const ImageCovered: React.FC<ImageCoveredProps> = (props) => {
  const { width, height, src, width2, height2, radius, setValue,img,id } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      setValue(e?.target?.files?.[0]);
    }
  };
  return (
    <div>
      <input onChange={handleChange} type="file" id={id} hidden />
      <label htmlFor={id}>
        <div
          className={`relative ${width} ${height} object-cover ${radius} overflow-hidden`}
        >
          <img className="w-full h-full object-cover  " src={img? URL.createObjectURL(img) : src} />
          <div className="w-full h-full flex justify-center items-center absolute left-0 opacity-0 top-0 hover:bg-gray hover:opacity-70 cursor-pointer transition-opacity duration-300">
            <img className={`${width2} ${height2}`} src={cameraPng} />
          </div>
        </div>
      </label>
    </div>
  );
};

export default ImageCovered;
