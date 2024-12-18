import { Grid2 } from "@mui/material";
import BasicCard from "./BasicCard";
import QueueCard from "./QueueCard";

function HomePage() {
  return (
    <>
      <Grid2
        container
        spacing={3}
        sx={{
          padding: "35px 0",
          justifyContent: "center",
        }}
      >
        <Grid2
          item
          xs={12}
          md={7}
          container
          spacing={2}
          direction="column"
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid2
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "30vw",
            }}
          >
            <QueueCard />
          </Grid2>

          <Grid2 item xs={12} md={7} container spacing={2}>
            <Grid2
              item
              size={{ xs: 12, s: 10, sm: 6, lg: 4 }}
              sx={{ display: "flex" }}
            >
              <BasicCard
                title="View All Questions"
                description="View all the questions you can attempt."
                label="Questions List"
                link="/questionpage"
              />
            </Grid2>

            <Grid2
              item
              size={{ xs: 12, s: 10, sm: 6, lg: 4 }}
              sx={{ display: "flex" }}
            >
              <BasicCard
                title="Past Question Attempts"
                description="View your previous question attempts and 
                their solutions to track your progress and learn from 
                your mistakes."
                label="Coming Soon"
                disabledButton={true}
              />
            </Grid2>

            <Grid2
              item
              size={{ xs: 12, s: 10, sm: 6, lg: 4 }}
              sx={{ display: "flex" }}
            >
              <BasicCard
                title="Previous Matches"
                description="Enjoyed collaborating with someone? View 
                your past matches and send a friend request to your previous 
                matches."
                label="Coming Soon"
                disabledButton={true}
              />
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}

export default HomePage;
