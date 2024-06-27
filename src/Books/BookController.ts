import { deleteBookService,updateBookService,getBookService,createBookService, BookService } from "./BookService"
import { Context } from "hono"

export const listBooks = async (c: Context) => {
    try {
        //limit the number of Books to be returned

        const limit = Number(c.req.query('limit'))

        const data = await BookService(limit);
        if (data == null || data.length == 0) {
            return c.text("Book not found", 404)
          
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

 export const getBooks = async (c:Context)=>{
    try{
        const data = await BookService();
        return c.json(data)
    }catch(error:any){
        return c.json({message:error.message}, 500)
    }

 }
//get a single Book
export const getBook = async (c:Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        const Book = await getBookService(id);
        if(Book == null) return c.text(" Book not found ",404)
        return c.json(Book,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}
//create a Book


export const createBook = async (c:Context) => {
    try{
        const Book = await c.req.json();
        const createdBook = await createBookService(Book);
        if(!Book) return c.text(" Book not created ",400)


        return c.json(Book,201)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}


//update a Book
export const updateBook = async (c:Context) => {

    const id = Number(c.req.param("id"));
    const Book = await c.req.json();
    try{
        if(isNaN(id))  return c.text("Invalid ID ",400)
            const existingBook = await getBook(c);
        if(existingBook == undefined) return c.text("Book not found ",404)
        //update Book
        const updateBook = await updateBookService(id,Book);
        return c.json({msg: updateBook},200)
        return c.text(Book,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}
//delete a Book

export const deleteBook = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    try{
        if(isNaN(id))  return c.text("Invalid ID ",400)
        //search for Book
        const existingBook = await getBookService(id);
        if(existingBook == undefined) return c.text("Book not found ",404)
        //delete Book
        const deletedBook = await deleteBookService(id);
        return c.json({msg: deletedBook},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}