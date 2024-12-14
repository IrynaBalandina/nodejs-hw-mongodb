
export const errorHandler =(error, res, req, next)=>{
    res.status(500).json({
        message:"Server error",
        error:error.message,
    });
};
