import prismaClient from "../../../utils/prisma";
import {data} from "../data/genresData.json"

export async function seedGenres() {
    console.log("-----------------------------Seeding Genres")
    await prismaClient.genre.deleteMany();
    console.log("Deleted records in Genres table...");
  
    await prismaClient.$queryRaw`ALTER SEQUENCE "Genre_id_seq" RESTART WITH 1`;
    console.log("Reset AUTO_INCREMENT in Genres table...");
  
    for(const genre of data){
        await prismaClient.genre.create({
            data: genre,
        });
    }
  
    console.log("Added Genres data..");
}