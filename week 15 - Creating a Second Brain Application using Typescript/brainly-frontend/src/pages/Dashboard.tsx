import { useEffect, useState } from "react";
import CreateContentModel from "../components/CreateContentModel";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { useContent } from "../hooks/useContent";
import { Card } from "../components/Card";

export const Dashboard = () => {
  const [createContent, setCreateContent] = useState(false);
  const { contents, refresh } = useContent();

  const handleOpenModel = () => setCreateContent(true);
  const handleCloseModel = () => setCreateContent(false);

  useEffect(() => {
    refresh();
  }, [createContent])

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

            {contents.map(({ type, link, title, description }) =>              
              <Card
                type={type}
                link={link}
                title={title}
                description={description}
              />
            )}

          </div>
        </div>
      </div>
    </>
  );
};



// https://x.com/CodeByPoonam/status/1882441160020676767
