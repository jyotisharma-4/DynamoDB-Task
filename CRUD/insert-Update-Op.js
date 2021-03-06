const dynamoDB=require('../config')

const addMovie=(req,res)=>{
  let title=req.body.title
  let rateScore=req.body.rateScore
 // console.log(title, rateScore);

  function setData(title,rateScore){
    const params={
      TableName:"Movies",
      Item:{
            title:{S: title},
            rateScore: {N: rateScore}
          }
          
      };
  
      dynamoDB.putItem(params,function(err){
          if(err){
              console.log("unable to add movie"+err);
              res.status(400).send(err)
          }
          else{
              console.log(title+" movie added with "+rateScore+" rate");
              res.status(200).send(title+" movie added with "+rateScore+" rate")
          }
      })
  }
  setData(title,rateScore)

}

const updateMovieScore=(req,res)=> {
let title= req.body.title
let newRateScore=req.body.rateScore
function updateData(title,newRateScore){
  const params = {
    TableName: "Movies",
    Item: {
      title: { S: title },
      rateScore: { N: newRateScore.toString() }
    },
    ReturnConsumedCapacity: "TOTAL"
  };

  dynamoDB.putItem(params, function(err) {
    if (err) {
      console.log("value of title and rateScore should not be null", err);
      res.status(400).send(err)
    } else {
      console.log(`Updated ${title} with new Rate Score of ${newRateScore}%`);
      res.status(200).send(`Updated ${title} with new Rate Score of ${newRateScore}%`)
    }
  });
}
updateData(title,newRateScore)
}

module.exports={
    addMovie,
    updateMovieScore
}