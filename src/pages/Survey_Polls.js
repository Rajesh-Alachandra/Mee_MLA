import { Button, Grid, Tooltip } from "@mui/material";
import dots from '../Icons/dots-2.svg'
import parliament from '../images/parliament-meeting.svg'
import like from '../Icons/like.svg';
import comment from '../Icons/comment.svg';
import repost from '../Icons/re-post.svg';
import share from '../Icons/share.svg';
import addoption from '../Icons/add-option.svg'
import { useState, useEffect } from "react";
import PollCreator from "../components/PollCreator";
import { toast } from "react-toastify";
import api, { noauthinstance } from "../utils/api"

function Survey_Polls() {

    const [pollQuestion, setPollQuestion] = useState('');
    const [pollChoices, setPollChoices] = useState(['']);
    const [triggerRefresh, setTriggerRefresh] = useState(0)
    console.log('pollchoices', pollChoices)
    const dataaa = pollChoices.map((text) => {
        console.log('poll text', text)
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

            const { data, status } = await noauthinstance.post('polls/', pollData);
            console.log({ pollData })
            if (data) {
                toast.success('Poll successfully created!')
                console.log('Poll successfully created!');
                setPollQuestion('');
                setPollChoices(['']);
                setTriggerRefresh(prev => prev + 1)
                console.log('pollwholedata', setPollChoices)
            } else {
                console.error('Error creating the poll.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    const [pollData, setPollData] = useState([]);
    const [userVotes, setUserVotes] = useState([]);
    useEffect(() => {

        async function fetchPollData() {
            try {
                const { data, status } = await noauthinstance.get("polls/");
                if (status === 200) {
                    setPollData(data);

                    const initialUserVotes = {};
                    data.forEach((poll) => {
                        poll.choices.forEach((choice) => {
                            initialUserVotes[choice.id] = false;
                        });
                    });
                    setUserVotes(initialUserVotes);
                    setTriggerRefresh(prev => prev + 1)
                } else {
                    console.error("Failed to fetch poll data.");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }

        fetchPollData();

    }, []);
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

                                    <Grid item xs={6} lg={6}>
                                        <div className="option-share">
                                            <div className="new-feeds-content">
                                                <div className="feeds-top-content">
                                                    <h3>Created polls</h3>
                                                </div>
                                            </div>
                                            <div className="phase-box">
        
                                                {pollData.map((poll, index) => (
                                                    <div className="election-meeting" key={index}>
                                                        <div className="phase-box-content">
                                                            <div className="_0bpq">
                                                                <h3>{poll.question}</h3>
                                                               

                                                                {poll.choices.map((choice, choiceIndex) => (
                                                                    <div className="_0cyc" key={choiceIndex}>
                                                                        <span className="choice-text">
                                                                            {choice.text}
                                                                        </span>
                                                                        <div className="linear-graph">
                                                                            <Tooltip title={`${choice.votes} votes`} arrow>
                                                                                <div
                                                                                    className="bar"
                                                                                    style={{ width: `${(choice.votes / poll.total_votes) * 100}%` }}
                                                                                />
                                                                            </Tooltip>
                                                                        </div>
                                                                    </div>
                                                                ))}

                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="post-image"></div>
                                            </div>
                                        </div>
                                    </Grid>


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