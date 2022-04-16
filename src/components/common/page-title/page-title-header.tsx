import { Grid, Typography } from "@mui/material";
// import { format } from 'date-fns';

export function PageTitleHeader({
  title,
  description,
}: {
  title?: string | JSX.Element | null;
  description?: string | JSX.Element | null;
}) {
  // const user = {
  //   avatar: '/static/images/avatars/1.jpg',
  //   title: 'Rachael Simons',
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
          alt={user.title}
          src={user.avatar}
        />
      </Grid> */}
      {(title || description) && (
        <Grid item>
          {title && (
            <Typography variant="h3" component="h3" gutterBottom>
              {title}
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
