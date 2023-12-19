import Breadcrumb from "components/Common/Breadcrumb";
import Container from "components/Common/Container";
import TaskBar from "components/Common/TaskBar/TaskBar";
import TaskBarItem from "components/Common/TaskBar/TaskBarItem";
import { useState } from "react";
import Icon from "svgs/Icon";
import Seller from "./Seller";
import Bids from "./Bids";
import Settings from "./Settings/Settings";

const pageName: Record<0 | 1 | 2 | 3, string> = {
  0: "Profile",
  1: "Seller",
  2: "Bids",
  3: "Settings",
};

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2 | 3>(1);
  return (
    <div>
      <Breadcrumb
        title="My Account"
        items={[
          { title: "My Account", to: "/shop" },
          { title: pageName[activeTab] },
        ]}
      />
      <Container type="large" className="mt-10">
        <TaskBar
          activeIndex={activeTab}
          elements={[<div>hi</div>, <Seller />, <Bids />, <Settings />]}
          elementsClassName="mt-16"
          barClassName="flex gap-3"
        >
          <TaskBarItem active={activeTab === 1} onClick={() => setActiveTab(1)}>
            <Icon name="hamburger" />
            <div>Seller</div>
          </TaskBarItem>
          <TaskBarItem active={activeTab === 2} onClick={() => setActiveTab(2)}>
            <Icon name="euro" />
            <div>Bids</div>
          </TaskBarItem>
          <TaskBarItem active={activeTab === 3} onClick={() => setActiveTab(3)}>
            <div>Settings</div>
          </TaskBarItem>
        </TaskBar>
      </Container>
    </div>
  );
}
