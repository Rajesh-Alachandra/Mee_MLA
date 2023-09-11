import { Button, Grid } from "@mui/material";
import TabbedCardList from "./TabbedCardList";
import { useEffect, useState } from "react";
import api from "../utils/api"

function ReportedCard() {


    const [reports, setReports] = useState([]);
    const [reportsError, setReportsError] = useState(null);

    const [pendingReports, setPendingReports] = useState([]);
    const [solvedReports, setSolvedReports] = useState([]);
    const [failedReports, setFailedReports] = useState([]);


    console.log(pendingReports)
    console.log(solvedReports)
    console.log(failedReports)

    console.log(reports);

    const fetchReports = async () => {
        try {
            const response = await api.get("reports/");
            setReports(response.data.reports);

            const pending = response.data.reports.filter((report) => report.status === "pending");
            const solved = response.data.reports.filter((report) => report.status === "solved");
            const failed = response.data.reports.filter((report) => report.status === "failed");

            setPendingReports(pending);
            setSolvedReports(solved);
            setFailedReports(failed);
        } catch (err) {
            console.error("Error fetching data:", err);
            setReportsError(err);
        }
    };


    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    console.log(data)

    const fetcreports = async () => {
        console.log("1")
        try {
            const response = await api.get("/reports/count")
            setData(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
        }
    };



    useEffect(() => {
        fetchReports();
        fetcreports()
    }, []);


    return (
        <>
            <div className="app-component-reportcard">
                <div className="app-component-reportcard__head">
                    <h4>Reported</h4>
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
                    <TabbedCardList />
                </div>
                <div className="app-component-announcements__foot">
                    <Button className="text-button">See All Reported</Button>
                </div>
            </div>
        </>
    )
}
export default ReportedCard;