import { connectDB } from "@/lib/connectDB"
export const POST = async (req) =>{
    const newUser = await req.json()
    try{
        const db = await connectDB();
        const userCollection = db.collection("user");
        const existUser = await userCollection.findOne({email: newUser.email})
        if(existUser){
            return Response.json({message: "user exist"},{status : 304})

        }
        const result = await userCollection.insertOne(newUser)
        return Response.json({message: "user created"}, {status: 200})
    }catch(error){
        return Response.json(
            {message:"something went wrong",error},
            {status : 500}
        )
    }
}