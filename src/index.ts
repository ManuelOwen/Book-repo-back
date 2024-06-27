import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prometheus } from '@hono/prometheus'
import {cors} from 'hono/cors'

import "dotenv/config"
import {logger} from "hono/logger"
import {csrf} from "hono/csrf"
import { trimTrailingSlash } from 'hono/trailing-slash'
import {timeout} from "hono/timeout"
import { HTTPException } from 'hono/http-exception';




// routers

import { readFile } from 'fs/promises'
import { BookRouter } from './Books/BookRouter'


const app = new Hono();
const {printMetrics, registerMetrics} = prometheus()
// inbuillt middlawares
  app.use(logger());

app.use(csrf())  
app.use(cors({
  origin: "*"
}))   
app.use(trimTrailingSlash())
const customTimeException = new HTTPException(408,{
  message:"Request Timeout"
})
app.use("time", timeout(10000, customTimeException), )


//routers
app.route("/api", BookRouter)




app.get("/", async (c) => {
  // return c.text("Welcome to the API")
  try{
    let html = await readFile("./index.html", 'utf-8') ;
    return c.html(html)
  }catch(err:any){
    return c.text(err.message, 500)
  }

})

// not found
app.notFound((c) => {
  return c.text("Not Found", 404)

})

app.get('/metrics', printMetrics)
// app.get('/metrics', registerMetrics)
const port = 8000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port:Number(process.env.PORT) || 8000
})


