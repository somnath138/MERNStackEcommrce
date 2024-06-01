module.exports= theFunc =>(req,res,next)=>{
    //next is callback function
    Promise.resolve(theFunc(req,res,next)).catch(next);
    //first try resolve part then of it not resolve then go to the catch block
     
    //handle the error which created through the async function and handle the error through try catch block
}