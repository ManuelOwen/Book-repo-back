import {db} from "./db"
import { BookTable} from "../drizzle/schema"

const Books = [
    {Tittle:"The Great Gatsby", Author:"F. Scott Fitzgerald", year_published:"1925"},
    {Tittle:"To", Author:"Leo Tolstoy", year_published:"1869"},
    {Tittle:"1984", Author:"George Orwell", year_published:"1949"},
    {Tittle:"Pride and Prejudice", Author:"Jane Austen", year_published:"1813"},
    {Tittle:"The Catcher in the Rye", Author:"J.D. Salinger", year_published:"1951"},
]

async function  seed(){
    await db .insert(BookTable).values(Books)
    
}
seed().then (()=> console.log("seeded succesfully")).catch (console.error)