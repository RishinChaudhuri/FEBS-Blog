const express= require("express");
const bodyParser= require("body-parser");
const ejs= require("ejs");
const _=require("lodash");
const mongoose= require("mongoose");
mongoose.connect('mongodb+srv://RishinChaudhuri:Rishin13@clusterblog.brfgv8b.mongodb.net/postDB?retryWrites=true&w=majority/postsDB',{useNewUrlParser:true});
// Connection URL
const startingHomeContent="Society of Finance, Economics And Business(FEBS) is a platform for enthusiastic students to come together and learn the intriguing and fun world of finance, by organizing introductory sessions for people who are interested in finance but do not have any prior knowledge, through inviting Industry Leaders and alumni in the industry for insight into the latest industrial trends and holding lectures and discussions involving the latest happenings around the world. ";
const contactContent="If you are looking for knowledge on terms,concepts to help get your finances in order. Connect with us today to get in touch with someone who can help you take your first steps to financial freedom.";
const aboutContent=" We aim to familiarize everyone with the economic lens of issues and make everyone adroit in handling personal finance. The society members bond over different ideas and try to uphold the economic ideals, incubate the awareness of financial issues, thereby fostering leadership in members.";
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


const blogSchema= new mongoose.Schema({
  title: String,
  body: String,
  author:String
});

const Post= mongoose.model("Post",blogSchema);

app.get("/",function(req,res){
  Post.find({},function(err,posts){

  res.render("home",{startingContent:startingHomeContent,blogs:posts});
  });


});

app.get("/posts/:postid",function(req,res){

  const requestedPostId=(req.params.postid);

  Post.findOne({_id: requestedPostId}, function(err, post){

   res.render("posts", {post:post});

 });

});
app.get("/contact",function(req,res){
  res.render("Contact",{contact:contactContent});

});
app.get("/About",function(req,res){
  res.render("About",{about:aboutContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});
app.post("/compose",function(req,res){

  const post = new Post({
    title:req.body.postTitle,
    author:req.body.postAuthor,
    body:req.body.postBody
  });
  post.save(function(err){
    if(!err)
    res.redirect("/");

  });

});


app.listen(3000,function(){
  console.log("Server is working properly");
});
