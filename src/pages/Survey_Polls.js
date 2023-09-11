import { Button, Grid } from "@mui/material";
import dots from '../Icons/dots-2.svg'
import parliament from '../images/parliament-meeting.svg'
import like from '../Icons/like.svg';
import comment from '../Icons/comment.svg';
import repost from '../Icons/re-post.svg';
import share from '../Icons/share.svg';
import addoption from '../Icons/add-option.svg'
import { useState } from "react";
import PollCreator from "../components/PollCreator";
import api from "../utils/api"
import { toast } from "react-toastify";

function Survey_Polls() {

    const [pollQuestion, setPollQuestion] = useState('');
    const [pollChoices, setPollChoices] = useState(['']);

    console.log(pollChoices)
    const dataaa = pollChoices.map((text) => {
        console.log(text)
        return (
            { text }
        )
    })

    const handleQuestionChange = (e) => {
        setPollQuestion(e.target.value);
    };

    const handleChoiceChange = (e, index) => {
        const updatedChoices = [...pollChoices];
        updatedChoices[index] = e.target.value;
        setPollChoices(updatedChoices);
    };

    const handleAddChoice = () => {
        setPollChoices([...pollChoices, '']);
    };

    const handlePollSubmit = async (e) => {
        e.preventDefault();

        const filteredChoices = pollChoices.filter((choice) => choice.trim() !== '');

        console.log({ filteredChoices })

        if (filteredChoices.length === 0) {
            alert('At least one choice is required.');
            return;
        }

        const pollData = {
            question: pollQuestion,
            choices: dataaa,
        };


        // const polldata = {
        //     "question": "Favorite Color",
        //     "choices": [
        //         { "text": "Red" },
        //         { "text": "Blue" },
        //         { "text": "Green" }
        //     ]
        // }
        console.log({ pollData })

        try {
            const { data, status } = await api.post('polls/', pollData);

            if (data) {
                toast.success('Poll successfully created!')
                console.log('Poll successfully created!');
                setPollQuestion('');
                setPollChoices(['']);
            } else {
                console.error('Error creating the poll.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
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
                                                <h4>Survey / Polls</h4>
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
                                                        <label>Ask a Question</label>
                                                        <textarea value={pollQuestion} onChange={handleQuestionChange} className="input-form-2" rows="5"></textarea>
                                                    </div>
                                                    <div className="form-group option">
                                                        <label className="option">Options</label>
                                                        {pollChoices.map((choice, index) => (
                                                            <input
                                                                type="text"
                                                                key={index}
                                                                className="input-form"
                                                                value={choice}
                                                                onChange={(e) => handleChoiceChange(e, index)}
                                                                required
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="add-option">
                                                        <div className="add-option-buttons">
                                                            <Button onClick={handleAddChoice}>
                                                                <span>Add Option</span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="submit-report">
                                                        <Button onClick={handlePollSubmit}>Create Poll</Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </Grid>

                                    {/* <Grid item xs={6} lg={6}>
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
                                    </Grid> */}
                                </Grid>
                            </div>
                        </div>
                        {/* <PollCreator /> */}
                    </Grid>

                </Grid>
            </div>
        </>
    )
}

export default Survey_Polls;