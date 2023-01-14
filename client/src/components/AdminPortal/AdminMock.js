import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Clients from "./Clients";
import ClientAdd from "./ClientAdd";
import ClientUpdate from "./ClientUpdate";

function AdminClient() {
  return (
    <Tabs
      defaultActiveKey="clientList"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="clientList" title="Client List">
        <Clients />
      </Tab>
      <Tab eventKey="clientUpdate" title="Update Client">
        <ClientUpdate />
      </Tab>
      <Tab eventKey="clientNew" title="Add New Client">
       <ClientAdd />
      </Tab>
    </Tabs>
  );
}

export default AdminClient;