import "./navbar.css"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search..."/>
                    <SearchOutlinedIcon/>
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageOutlinedIcon/>
                        English
                    </div>
                    <div className="item">
                        <FullscreenExitOutlinedIcon/>
                    </div>
                    <div className="item">
                        <DarkModeOutlinedIcon/>
                    </div>
                    <div className="item">
                        <NotificationsNoneOutlinedIcon/>
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineOutlinedIcon/>
                    </div>
                    <div className="item">
                        <ListOutlinedIcon/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar