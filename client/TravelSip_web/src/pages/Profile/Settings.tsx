import React from "react";
import { CollapseMenu } from "../../component";
import { IoLanguageOutline } from "react-icons/io5";
import usFlag from "../../assets/images/usa.png";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { GiEarthAmerica } from "react-icons/gi";
import { MdCurrencyExchange,MdOutlineRateReview } from "react-icons/md";

const Settings = () => {
  return (
    <div className="mx-12 p-12 rounded-2xl bg-white">
      <h2 className="text-xLarge font-bold border-l-[10px] border-solid border-blue pl-8 ">
        Account Settings
      </h2>
      <section className="my-20">
        <CollapseMenu
          label="Language"
          value="English"
          icon={<IoLanguageOutline />}
          list={["Vietnamese", "English (United States)"]}
        />
        <CollapseMenu
          label="Country"
          value="United States"
          img={usFlag}
          icon={<GiEarthAmerica />}
          list={["Vietnamese", "English (United States)"]}
        />
        <CollapseMenu
          label="Currency"
          value="USD"
          icon={<MdCurrencyExchange />}
          list={["VND(Vietnam dong)", "USD (United States Dollar)"]}
        />
      </section>
      <h2 className="text-xLarge my-20 font-bold border-l-[10px] border-solid border-green pl-8 ">
        Help Center
      </h2>
      <section className="my-20">
        <CollapseMenu
          label="Get Help"
          value="See more..."
          icon={<IoIosHelpCircleOutline />}
          list={["Report with center", "Refund booking", "Hiring"]}
        />
        <CollapseMenu
          label="Give a feedback"
          value="See more..."
          icon={<MdOutlineRateReview />}
          list={["Send feedback on our central website https://abc.com/feedback/ "]}
        />
      </section>
    </div>
  );
};

export default Settings;
