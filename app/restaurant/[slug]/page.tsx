
import React from 'react'
import RestaurantNavBar from './components/RestaurantNavBar'
import Title from './components/Title'
import Rating from './components/Rating'
import Description from './components/Description'
import Images from './components/Images'
import Reviews from './components/Reviews'
import ReservationCard from './components/ReservationCard'
import {  PrismaClient, Review } from '@prisma/client'

const prisma = new PrismaClient()
interface restaurant{
        id: number;
        name: string;
        images: string[];
        description: string;
        slug: string;
        reviews:Review[]
}
const fetchRestaurantBySlug=async (slug:string):Promise<restaurant>=>{
   const restaurant= await prisma.restaurant.findUnique({
     where :{
       slug
     },
     select:{
        id:true,
        name:true,
        images:true,
        description:true,
        slug:true,
        reviews:true

     }
   })
   if(!restaurant){
      throw new Error("cannot find restaurant")
   } 
   return restaurant
}
export default async function RestaurantDteails({params}:{params:{slug:string}}) {
    const restaurnat=await fetchRestaurantBySlug(params.slug)

    return (
<>

      <div className="bg-white w-[70%] rounded p-3 shadow">
     
         <RestaurantNavBar slug={restaurnat.slug}/>
         <Title name={restaurnat.name}/>
         <Rating reviews={restaurnat.reviews}/>
         <Description description={restaurnat.description}/>
         <Images images={restaurnat.images}/>
         <Reviews reviews={restaurnat.reviews}/>

      </div>
      <div className="w-[27%] relative text-reg">
       <ReservationCard/>
      </div>
   
    </>
    )
}
