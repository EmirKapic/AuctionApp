import Breadcrumb from "components/Common/Breadcrumb";
import Container from "components/Common/Container";
import TaskBar from "components/Common/TaskBar/TaskBar";
import TaskBarItem from "components/Common/TaskBar/TaskBarItem";
import { useState } from "react";
import Icon from "svgs/Icon";
import Seller from "./Seller";
import Bids from "./Bids";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div>
      <Breadcrumb title="My Account" items={[]} />
      <Container type="large" className="mt-10">
        <TaskBar
          activeIndex={activeTab}
          elements={[<Seller />, <Bids />]}
          elementsClassName="mt-16"
          barClassName="flex gap-3"
        >
          <TaskBarItem active={activeTab === 0} onClick={() => setActiveTab(0)}>
            <Icon name="hamburger" />
            <div>Seller</div>
          </TaskBarItem>
          <TaskBarItem active={activeTab === 1} onClick={() => setActiveTab(1)}>
            <Icon name="euro" />
            <div>Bids</div>
          </TaskBarItem>
        </TaskBar>
      </Container>
    </div>
  );
}
