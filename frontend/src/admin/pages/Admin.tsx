import { Sidebar, Navbar, Widget, Chart, Featured, Table } from '../components';
import "./Admin.css"

const Admin = () => {
  return (
    <div className="admin">
        <Sidebar/>
        <div className="adminConteiner">
            <Navbar/>
            <div className="widgets">
                <Widget type="user" />
                <Widget type="order" />
                <Widget type="earning" />
                <Widget type="balance" />
            </div>
            <div className="charts">
                <Featured />
                <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
            </div>
                <div className="listContainer">
                <div className="listTitle">Latest Transactions</div>
                <Table />
            </div>
        </div>
    </div>
  );
};

export default Admin;