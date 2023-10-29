import "./userlist.css"
import { Sidebar, Navbar, Datatable } from '../components';

const UserList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default UserList