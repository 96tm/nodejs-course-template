import app from './app';

import { PORT } from './common/config';

import TryDbConnect from './common/db';
import User from './entity/User';

TryDbConnect(() => {
  app.listen(PORT, async () => {
    await User.createAdmin();
    console.log(`App is running on http://localhost:${PORT}`);
  });
});
