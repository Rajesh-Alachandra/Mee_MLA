import { Button } from "@mui/material";

function TopNavbar(){
    return(
        <>
            <div className="app-top-navbar">
                <div className="app-top-navbar__left">
                    <h4>Dashboard</h4>
                    <p><span>Sunday</span> 01 September 2023</p>
                </div>
                <div className="app-top-navbar__right">
                    <ul className="app-top-navbar__right--list">
                        <li className="app-top-navbar__right--listitem">
                            <Button className="top-navbar-search-btn">
                                <img src="/images/search.svg"/>
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default TopNavbar;