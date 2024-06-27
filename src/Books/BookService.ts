import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { TIBook, TSBook, BookTable } from "../drizzle/schema";

export const BookService = async (limit?: number): Promise<TSBook[]> => {
    if(limit){
        return await db.query.BookTable.findMany({limit:limit})
    }
    return await db.query.BookTable.findMany();
}

export const getBookService = async (id: number): Promise<TIBook | undefined> => {
    return await db.query.BookTable.findFirst({
        where: eq(BookTable.id, id)
    })
}



 export const createBookService = async (Book:TIBook)=> {
    await db.insert(BookTable).values(Book)
    return "Book created successfully";
 }
    export const updateBookService = async (id:number, Book:TIBook)=>{
        await db.update(BookTable).set(Book).where(eq(BookTable.id, id))
        return "Book updated successfully";
    }
    export const deleteBookService= async (id:number)=>{
        await db.delete(BookTable).where(eq(BookTable.id, id))
        return "Book deleted successfully";
    }