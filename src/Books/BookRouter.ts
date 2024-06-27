import {Hono} from "hono";
import {getBook,getBooks, createBook,updateBook,deleteBook } from "./BookController";
// import {zValidator}from "@hono/zod-validator";
// import { Bookchema } from "../validators/user.validator"
// import { adminRoleAuth } from "../middlewares/bearAuth";
// // import {Bookchema} from "../validators";
 
export const BookRouter = new Hono();

// GET ALL Book
BookRouter.get("/Books", getBooks);
//grt a single user
BookRouter.get("/Book/:id", getBook);
//create user
BookRouter.post("/Book", createBook)
//update user
BookRouter.put("/Book/:id", updateBook)
//delete user
 BookRouter.delete("/Book/:id", deleteBook)


