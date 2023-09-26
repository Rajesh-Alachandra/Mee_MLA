import { Button, Grid } from "@mui/material";
import TabbedCardList from "../components/TabbedCardList";
import Opinion from "./Opinion";
import { useEffect, useState } from "react";
import api from "../utils/api"
import axios from "axios";

function Reports() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    console.log({data})

    const fetcreports = async () => {
       
        try {

            const NewaccessToken = localStorage.getItem('NewaccessToken');
            console.log(NewaccessToken)
            if (!NewaccessToken) {
                throw new Error('Authentication credentials were not provided.');
            }

            const headers = {
                Authorization: `Bearer ${NewaccessToken}`,
            };
            
            const response = await api.get("/reports/count",{headers})
            setData(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
        }
    };

    useEffect(() => {
        fetcreports()
    }, [])

    return (
        <>
            <div className="app-page-home">
                <Grid container spacing={2}>
                    <Grid item lg="12">
                        <div className="app-component-reportcard">
                            <div className="app-new-feeds">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={12}>
                                        <div className="app-component-reportcard">
                                            <div className="app-component-reportcard__head">
                                                <h4>Reported</h4>
                                                <div className="add-post">
                                                    <Button>Report Problem</Button>
                                                </div>
                                            </div>
                                            <div className="app-component-reportcard__count">
                                                <Grid container spacing={6}>
                                                    <Grid item xs={6}>
                                                        <div className="reports-count-card">
                                                            <div className="reports-count-card__icon">
                                                                <img src="/images/indicator.svg" />
                                                            </div>
                                                            <div className="reports-count-card__info">
                                                                <p className="reports-count-card__title">Total Problem Reported</p>
                                                                <div className="reports-count-card__content">
                                                                    <h3 className="reports-count-card__count">{data.total_reports}</h3>
                                                                    <div className="reports-count-card__values --success">
                                                                        <img src="/images/increment-arrow.svg" />
                                                                        <span>+2.25%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div className="reports-count-card">
                                                            <div className="reports-count-card__icon">
                                                                <img src="/images/pending.svg" />
                                                            </div>
                                                            <div className="reports-count-card__info">
                                                                <p className="reports-count-card__title">Total Pending</p>
                                                                <div className="reports-count-card__content">
                                                                    <h3 className="reports-count-card__count">{data.pending_reports}</h3>
                                                                    <div className="reports-count-card__values --success">
                                                                        <img src="/images/increment-arrow.svg" />
                                                                        <span>+2.25%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div className="reports-count-card">
                                                            <div className="reports-count-card__icon">
                                                                <img src="/images/bulb.svg" />
                                                            </div>
                                                            <div className="reports-count-card__info">
                                                                <p className="reports-count-card__title">Total Solved</p>
                                                                <div className="reports-count-card__content">
                                                                    <h3 className="reports-count-card__count">{data.solved_reports}</h3>
                                                                    <div className="reports-count-card__values --danger">
                                                                        <img src="/images/decrement-arrow.svg" />
                                                                        <span>+2.25%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div className="reports-count-card">
                                                            <div className="reports-count-card__icon">
                                                                <img src="/images/emoji-sad.svg" />
                                                            </div>
                                                            <div className="reports-count-card__info">
                                                                <p className="reports-count-card__title">Failed</p>
                                                                <div className="reports-count-card__content">
                                                                    <h3 className="reports-count-card__count">{data.failed_reports}</h3>
                                                                    <div className="reports-count-card__values --danger">
                                                                        <img src="/images/decrement-arrow.svg" />
                                                                        <span>+2.25%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div className="app-component-announcements__tab">
                                                <TabbedCardList fetcreports={fetcreports} />
                                            </div>
                                            <div className="app-component-announcements__foot">
                                                <Button className="text-button">See All Reported</Button>
                                            </div>
                                        </div>
                                    </Grid>
                                    {/* <Grid item xs={6} lg={6}>
                                        <Opinion />
                                    </Grid> */}
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Reports;