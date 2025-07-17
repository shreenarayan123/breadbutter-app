'use server'

import { client } from "@/lib/prisma";


interface Project {
    title: string,
    clientNeed: string,
    location: string,
    budget: number,
    customerId: string,
    stylePref: string[],
    category: string

}
export const createCustomer = async (
    name:string,
    email:string,
)=>{
    try {
        const newCustomer = await client.customer.create({
            data:{
                name:name,
                email:email,
            }
        })
        if(newCustomer){
            console.log("new customer created: ", newCustomer);
            return newCustomer
        }
    } catch (error) {
        console.log("Error creating customer:", error);
    }
}