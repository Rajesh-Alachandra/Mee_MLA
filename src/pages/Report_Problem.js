import { Button, Grid } from "@mui/material";
import dots from '../Icons/dots-2.svg'
import parliament from '../images/parliament-meeting.svg'
import post1 from '../images/post-1.svg';
import post2 from '../images/post-2.svg';
import like from '../Icons/like.svg';
import comment from '../Icons/comment.svg';
import repost from '../Icons/re-post.svg';
import share from '../Icons/share.svg';

function Report_problem(){
    return(
        <>
             <div className="app-page-home">
            <Grid container spacing={2}>
                <Grid item lg="12">
                  <div className="app-component-reportcard">
                  <div className="app-new-feeds">
                  <Grid container spacing={2}>
                        <Grid item xs={6} lg={6}>
                          <div className="new-feeds-content">
                            <div className="feeds-top-content">
                                <h4>Report</h4>
                            </div>
                            </div>  
                           <div className="report-problem-box">
                                <div className="report-problem-box-content">
                                    <h4>Welcome</h4>
                                    <p>Please share your issue; we'll endeavor to provide the best possible solution and assistance.</p>
                                </div>
                                <div className="report-problem-form">
                                    <form>
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input type="text" className="input-form" id="fname" placeholder="Enter Name"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Email Id</label>
                                            <input type="text" className="input-form" id="email" placeholder="Enter Email"></input>
                                        </div>
                                        <div className="form-group">
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                            <label>Mobile No</label>
                                            <input type="tel" className="input-form" id="phone" placeholder="Enter Number"></input>
                                            </Grid>
                                            <Grid item xs={6}>
                                            <label>Pin Code</label>
                                            <input type="text" className="input-form" id="" placeholder="Enter Code"></input>
                                            </Grid>
                                            </Grid>
                                        </div>
                                        <div className="form-group">
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                            <label>State</label>
                                            <input type="text" className="input-form" id="" placeholder="Enter State"></input>
                                            </Grid>
                                            <Grid item xs={6}>
                                            <label>City</label>
                                            <input type="text" className="input-form" id="" placeholder="Enter City"></input>
                                            </Grid>
                                            </Grid>
                                        </div>
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input type="text" className="input-form" id="inputAddress" placeholder="Enter Address"></input>
                                        </div>
                                        <div className="form-group">
                                        <label>Address</label>
                                        <textarea id="" className="input-form-2" rows="5"></textarea>
                                        </div>
                                        <div className="submit-report">
                                            <Button>Submit Report</Button>
                                        </div>
                                    </form>
                                </div>
                           </div>
                        </Grid>
                        
                        <Grid item xs={6}  lg={6}>
                            <div className="option-share">
                            <div className="new-feeds-content">
                            <div className="feeds-top-content">
                                <h4>Opinion</h4>
                            </div>
                            <div className="add-post">
                                <Button>See More</Button>
                            </div>
                            </div>   
                            <div className="phase-box">
                              <div className="election-meeting">
                              <div className="phase-box-content">
                                    <h4>Election Meeting with Parliament</h4>
                                    <p>Today - 10:30 AM</p>
                                </div>
                                <div className="menu-dots">
                                <div class="dropdown">
                                            <button class="dropbtn">
                                                <img src={dots} />
                                            </button>
                                            <div class="dropdown-content">
                                            <a href="#">Edit</a>
                                            <a href="#">Delete</a>
                                        </div>
                                    </div>
                                </div>
                              </div>
                              <div class="post-image">
                                        <img src={parliament} />
                                        <div class="post-image-buttons">
                                            <div class="post-buttons-1">
                                                <ul>
                                                    <li>
                                                    <Button>
                                                    <img src={like} />
                                                    <span>Like</span>
                                                    </Button>
                                                    </li>
                                                    <li>
                                                    <Button>
                                                    <img src={comment} />
                                                    <span>Comments</span>
                                                    </Button>
                                                    </li>
                                                    <li>
                                                    <Button>
                                                    <img src={repost} />
                                                    <span>Repost</span>
                                                    </Button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="post-image-buttons-2">
                                        <ul>
                                        <li>
                                        <Button>
                                        <img src={share} />
                                        <span>Share</span>
                                        </Button>
                                        </li>
                                        </ul>
                                        </div>
                                    </div>
                            </div> 
                            <div className="phase-box">
                              <div className="election-meeting">
                              <div className="phase-box-content">
                                    <h4>Government has launched revised guideline for MDLADS 2023</h4>
                                    <p>Today - 10:30 AM</p>
                                </div>
                                <div className="menu-dots">
                                <div class="dropdown">
                                            <button class="dropbtn">
                                                <img src={dots} />
                                            </button>
                                            <div class="dropdown-content">
                                            <a href="#">Edit</a>
                                            <a href="#">Delete</a>
                                        </div>
                                    </div>
                                </div>
                              </div>
                              
                            </div> 
                            <div className="surveys-polls">
                            <div className="new-feeds-content">
                            <div className="feeds-top-content">
                                <h4>Opinion</h4>
                            </div>
                            <div className="add-post">
                                <Button>See More</Button>
                            </div>
                            </div> 
                            <div className="phase-box">
                                <div className="phase-box-content">
                                    <h4>In Phase 1  near RythuBazar can we have wall painted with doodles.</h4>
                                    <p><strong>Kukatpally</strong>, Today, 09:15 AM</p>
                                </div>
                            </div> 
                            <div className="phase-box phase-box-2">
                                <div className="phase-box-content">
                                    <h4>In Phase 1  near RythuBazar can we have wall painted with doodles.</h4>
                                    <p><strong>Kukatpally</strong>, Today, 09:15 AM</p>
                                </div>
                            </div> 
                            <div className="phase-box">
                                <div className="phase-box-content">
                                    <h4>In Phase 1  near RythuBazar can we have wall painted with doodles.</h4>
                                    <p><strong>Kukatpally</strong>, Today, 09:15 AM</p>
                                </div>
                            </div> 
                            </div>
                        </div> 
                        </Grid>
                        </Grid>
                  </div>
                  </div>
                   
                </Grid>
               
            </Grid>
           </div>
        </>
    )
}

export default Report_problem;