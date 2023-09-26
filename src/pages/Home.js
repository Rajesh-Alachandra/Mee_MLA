import { Grid } from "@mui/material";
import ReportedCard from "../components/ReportedCard";
import Annoncement from "../components/Annoncement";
import Feeds from "../components/Feeds";

function Home() {
    return (
        <>
            <div className="app-page-home">
                <Grid container spacing={2}>
                    <Grid item lg="7">
                        <div className="app-page-home__reportcards">
                            <ReportedCard />
                        </div>
                        {/* <div className="app-page-home__announcements mt-30">
                            <Annoncement />
                        </div> */}
                    </Grid>
                    <Grid item lg="5">
                        <div className="app-page-home__feeds">
                            <Feeds />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
export default Home;