import app from './app';

import { PORT } from './common/config';

import TryDbConnect from './common/db';

TryDbConnect(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
