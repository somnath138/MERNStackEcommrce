//createing token and saving in cookie
const sendToken=(user,statusCode,res)=>{
    const token=user.getJWTToken();////GET THE TOKEN FROM THE userModel
     // //if it matched then return success true and send the token
     // //named it token  //user.getJWTToken mean jee user  ta post request diye pathano hocche sei user er  post request theke token create koro jate login kore nite paro
    //option for cookie

    const options={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRE *24*60*60*1000),//COOKIE_EXPIRE time in milisecond
        httpOnly:true,
    }
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        token,
    })
}
module.exports=sendToken