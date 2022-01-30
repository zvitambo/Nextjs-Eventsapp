
import { connectDB, InsertDocument, getAllDocuments } from "../../../helpers/db-util";

async function handler (req, res){
     

    const eventId = req.query.eventId;

     let client;

     try{         
    client = await connectDB();
     }
      catch(error)
     {
       res.status(500).json({ message: "connecting to the database failed! " });
       return;
     };
    

    if(req.method === 'POST'){
      //add serverside validation

      const body = JSON.parse(req.body);
      const {email, name, text} = body;

      

      if (
        !email.includes('@') ||
        !name ||
        name.trim === '' ||
        !text ||
        name.text === ''
      ) {
          res.status(422).json({ message: 'Invalid Input.'})
         client.close();
          return;
      }
     
      const newComment = {
        eventId: eventId,
        email,
        name,
        text,
      };

     

      try{

        const result = await InsertDocument(client, 'comments', newComment);
        newComment._id = result.insertedId;

        res.status(201).json({ message: "Added Comment", comment: newComment });
      } catch(error){
          res.status(500).json({ message: "inserting documents failed! " });
         
      }

      


      
    }

    if(req.method === 'GET'){

      
      try
      {
        const documents = await getAllDocuments(client, "comments", { _id: -1 });
        res.status(200).json({ comments: documents });
      } 
      catch (error) 
      {
        res.status(500).json({ message: "failed to retrieve documents! " });      
      }  

    }

   client.close();
}

export default handler;