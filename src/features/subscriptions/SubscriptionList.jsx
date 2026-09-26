import { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import { getSubscriptions} from './SubscriptionApi';

function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getSubscriptions()
      .then((data) => setSubscriptions(data))
      .catch(() => setSubscriptions([]));
  }, []);

  return (
    <Grid size={7}>
      {subscriptions.length === 0 ? (
        <Typography variant="body1">No subscriptions yet.</Typography>
      ) : (
        subscriptions.map((subscription) => (
          <Typography key={subscription.id} variant="body1">
            {subscription.name} — {subscription.price} kr
          </Typography>
        ))
      )}
    </Grid>
  );
}

export default SubscriptionList;