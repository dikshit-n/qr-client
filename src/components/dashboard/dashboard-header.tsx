import { Grid, Typography } from "@mui/material";
// import { format } from 'date-fns';

export function DashboardHeader({
  name,
  description,
}: {
  name?: string | JSX.Element | null;
  description?: string | JSX.Element | null;
}) {
  // const user = {
  //   avatar: '/static/images/avatars/1.jpg',
  //   name: 'Rachael Simons',
  //   jobtitle: 'Lead Developer'
  // };

  return (
    <Grid container alignItems="center">
      {/* <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid> */}
      {(name || description) && (
        <Grid item>
          {name && (
            <Typography variant="h3" component="h3" gutterBottom>
              {"Welcome"}, {name}!
            </Typography>
          )}
          {description && (
            <Typography variant="subtitle2">
              {description} {/* <b>{format(new Date(), 'MMMM dd yyyy')}</b> */}
            </Typography>
          )}
        </Grid>
      )}
    </Grid>
  );
}
