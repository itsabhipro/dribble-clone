import { ProjectForm } from "@/common.type";
import { createProjectMutation, createUserMutation, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, updateProjectMutation } from "@/graphql";
import { GraphQLClient } from "graphql-request";
import { headers } from "next/dist/client/components/headers";
const isProduction = process.env.NODE_ENV === 'production';

const url:string = isProduction ? process.env.GRAPHQL_API_END_POINT || "": "http://127.0.0.1:4000/graphql" ;

const serverUrl:string = isProduction ? process.env.NEXTAUTH_URL||"" : "http://localhost:3000";
const apiKey:string = isProduction ? process.env.G_QL_API_KEY || "":"12345";
const client = new GraphQLClient(url);

async function makeGraphQlRequest(query:string, variables={}){
    try {
        
        return await client.request(query,variables);
    } catch (error:any) {
        console.log(error)
        throw error;
    }
}

export const getUser = (email:string)=>{
    client.setHeader('x-api-key',apiKey);
    return makeGraphQlRequest(getUserQuery,{email})
}
export const createNewUser = async (name:string, email:string, avatarUrl:string)=>{
    client.setHeader('x-api-key',apiKey);
    const variables = {
        input:{
            name,email,avatarUrl
        }
    }
    return makeGraphQlRequest(createUserMutation,variables)
}
export const fetchToken =async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`);
        return response.json();
    } catch (error) {
        throw error;
    }
}

const uploadImage = async (imagePath:string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`,{
            method:"POST",
            body:JSON.stringify({imagePath}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
        throw(error);
    }
}
export const createNewProject =async (form:ProjectForm,creatorId:string,token:string) => {
    const {imageUrl} = await uploadImage(form.image);
    client.setHeader("Authorization",`Bearer ${token}`)
    if(imageUrl){
        const variables = {
            input:{
                ...form,
                image:imageUrl,
                createdBy:{
                    link:creatorId
                }
            }
            
        }
        return makeGraphQlRequest(createProjectMutation,variables)
    }
    console.log("there is something wrong");
}

export const fetchAllProject =async (category?:string, endCursor?:string) => {
    client.setHeader('x-api-key',apiKey);
    return makeGraphQlRequest(projectsQuery,{category,endCursor});
}
export const getProjectDetails =async (id:string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQlRequest(getProjectByIdQuery,{id})
}

export const getUserProject =async (userId:string,last?:number) => {
    client.setHeader('x-api-key',apiKey);
    return makeGraphQlRequest(getProjectsOfUserQuery,{id:userId,last})
    
}   

export const deleteProject =async (id:string, token:string) => {
    client.setHeader('Authorization',`Bearer ${token}`);
    return makeGraphQlRequest(deleteProjectMutation,{id,token});
}
function isBase64(url:string){
    const base64 = /^data:image\/[a-z]+;base64/;
    return base64.test(url);
}
export const updateProject =async (form:ProjectForm, projectId:string, token:string) => {
    let updatedForm = {...form};
    if(isBase64(form?.image)){
        const {imageUrl} = await uploadImage(form.image);
        updatedForm = {...form,image:imageUrl}
    }
    client.setHeader('Authorization',`Bearer ${token}`);
    return makeGraphQlRequest(updateProjectMutation,{id:projectId, input:updatedForm})
}
