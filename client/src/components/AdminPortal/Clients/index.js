import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Clients from "./Clients";
import ClientAdd from "./ClientAdd";
import ClientUpdate from "./ClientUpdate";

function AdminClient() {
  return (
    <Tabs
      defaultActiveKey="clientList"
      id="fill-tab-example"
      className="mb-3"
      fill //sizes tabs to fit available space
      unmountOnExit //removes content when entering a different tab
      mountOnEnter
    >
      <Tab eventKey="clientList" title="Client List">
        <Clients />
      </Tab>
      <Tab eventKey="clientAdd" title="Add New Client">
        <ClientAdd />
      </Tab>
      <Tab eventKey="clientUpdate" title="Update Client">
        <ClientUpdate />
      </Tab>
    </Tabs>
  );
}

export default AdminClient;
