import { config } from './ormconfig';

import { getConnection, createConnection } from 'typeorm';

const connectToDb = async () => {
  let connection;
  try {
    connection = await getConnection();
  } catch (err) {
    console.log('err');
  }

  try {
    if (connection) {
      if (connection.isConnected) await connection.connect();
    } else {
      createConnection(config);
    }
  } catch (err) {
    console.log('Connection error', err);
  }
};

const TryDbConnect: (callback: () => void) => Promise<void> = async (
  callback
) => {
  try {
    await connectToDb();
    callback();
  } catch (err) {
    console.log('DB connection error', err);
  }
};

export default TryDbConnect;
