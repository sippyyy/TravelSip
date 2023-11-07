import React from "react";

const Footer = () => {
  return (
    <footer className="bg-red text-white py-4 mt-40">
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
          <h3 className="text-lg font-semibold">Column 1</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
          <h3 className="text-lg font-semibold">Column 2</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md-w-1/4 lg:w-1/4 xl:w-1/4 p-4">
          <h3 className="text-lg font-semibold">Column 3</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md-w-1/4 lg:w-1/4 xl:w-1/4 p-4">
          <h3 className="text-lg font-semibold">Column 4</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
