
import { connectDB, InsertDocument } from "../../../helpers/db-util";


async function handler(req, res) {

    if (req.method === 'POST'){
        const userEmail = req.body.email;
        
        if(!userEmail || !userEmail.includes('@')){
          res.status(422).json({message: 'invalid email'});
          return;
        }

        let client

      try {
        client = await connectDB();
      } catch(error){
        res.status(500).json({message: 'connecting to the database failed! '});
        return;
      }
        
      try {
        await InsertDocument(client, 'emails', { email: userEmail });
        client.close();
      } catch (error) {
        res
          .status(500)
          .json({ message: "inserting data  failed! " });
        return;
      }

      res.status(201).json({ message: 'signed up successfully' });

    }
  
}

export default handler;
