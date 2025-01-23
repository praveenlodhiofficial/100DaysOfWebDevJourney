import { useState } from "react";
import { Cards } from "../components/Card";
import CreateContentModel from "../components/CreateContentModel";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { useContent } from "../hooks/useContent";

export const Dashboard = () => {
  const [createContent, setCreateContent] = useState(false);
  const contents = useContent(); // Destructure loading and error states

  const handleOpenModel = () => setCreateContent(true);
  const handleCloseModel = () => setCreateContent(false);

  return (
    <>
      {createContent && <CreateContentModel onClose={handleCloseModel} />}

      <div className="flex">
        {/* SideBar */}
        <SideBar />

        {/* Main Content */}
        <div className="flex flex-col gap-5 w-full h-full px-10 pt-8 ml-[20vw] bg-slate-100">
          <Header open={handleOpenModel} />

          <div className="grid grid-cols-3 gap-5">
            {contents && contents.map(({ type, link, title, description }) => (
              `${<Cards
                brainTitle={title}
                brainLink={link}
                brainType={type}
                brainDescription={description}
              />
              }`
            ))
            }

            <Cards
              brainTitle="LLM Tweet"
              brainLink="https://twitter.com/praveenlodhi99/status/1873186043769630935?ref_src=twsrc%5Etfw"
              brainType="twitter"
              brainDescription=""
            />

            <Cards
              brainTitle="Harkirat YT Video"
              brainLink="https://www.youtube.com/embed/Qfd00VQ2W1Y?si"
              brainType="youtube"
              brainDescription="This ia a YT video from the Tushar Channel, about video transmission."
            />
          </div>
        </div>
      </div>
    </>
  );
};
