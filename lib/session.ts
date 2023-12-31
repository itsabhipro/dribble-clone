import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google"
import jsonwebtokken from "jsonwebtoken"
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/common.type";
import { getUser, createNewUser } from "./actions";

export const authOptions:NextAuthOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        
    ],
    jwt:{
        encode: async ({secret, token})=>{
            const encodedToken = await jsonwebtokken.sign({
                ...token,
                iss:'grafbase',
                exp:Math.floor(Date.now() / 1000) +60*60
            },secret)
            return encodedToken;
        },
        decode:async ({secret, token})=>{
            const decodedToken = jsonwebtokken.verify(token!,secret) as JWT;
            return decodedToken;
        }
    },
    theme:{
        colorScheme: 'light',
        logo: "/logo.png"
    },
    callbacks:{
        async session({session}){
            const email = session?.user?.email as string;
            try {
                const data = await getUser(email) as {user?:UserProfile}
                const newSession = {
                    ...session,
                    user:{
                        ...session.user,
                        ...data?.user
                    }
                }
                
                return newSession;
            } catch (error) {
                console.log(error);
                return session
            }
        },
        async signIn({user}:{user:User | AdapterUser}){
            try {
                const isUserExists = await getUser(user?.email as string) as {user?:UserProfile}
                if(!isUserExists?.user){
                    await createNewUser(user.name as string,user.email as string, user.image as string)
                }
                return true
            } catch (error:any) {
                console.log(error)
                return false
            }
        }
    }
}
export const getCurrentUser = async () => {
    const session = await getServerSession(authOptions) as SessionInterface;
    return session;
}