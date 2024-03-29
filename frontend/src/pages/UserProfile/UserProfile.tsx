import Breadcrumb from "components/Common/Breadcrumb";
import Container from "components/Common/Container";
import TaskBar from "components/Common/TaskBar/TaskBar";
import TaskBarItem from "components/Common/TaskBar/TaskBarItem";
import { useState } from "react";
import Icon from "svgs/Icon";
import Seller from "./Seller";
import Bids from "./Bids";
import Settings from "./Settings/Settings";
import Profile from "./Profile/Profile";
import User from "models/User";

export interface UserProfileProps {
  updateUserContext: (updatedUser: User) => void;
  onDeactivate: () => void;
}

const pageName: Record<0 | 1 | 2 | 3, string> = {
  0: "Profile",
  1: "Seller",
  2: "Bids",
  3: "Settings",
};

export default function UserProfile(props: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2 | 3>(0);
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
          elements={[
            <Profile updateUserContext={props.updateUserContext} />,
            <Seller />,
            <Bids />,
            <Settings onDeactivate={props.onDeactivate} />,
          ]}
          elementsClassName="mt-16"
          barClassName="flex gap-3"
        >
          <TaskBarItem active={activeTab === 0} onClick={() => setActiveTab(0)}>
            <div>Profile</div>
          </TaskBarItem>
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
