var express = require('express');
var app = express();
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
//firebase
var admin = require("firebase-admin");
var serviceAccount = require("./nodejsqq-firebase-adminsdk-zieci-fa7aefceb6.json");
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://nodejsqq.firebaseio.com"
});

var fireData = admin.database();

//取得firebase asd裡面的資料 
// fireData.ref('asd').once('value',(e)=>{
//    console.log('snapshotQQ',e.val())
// })

//把資料傳入firebase asd裡面
fireData.ref('asd').set({"keyQQ":"valueQQ"}).then(
   ()=>{
      fireData.ref('asd').once('value',(e)=>{
         console.log('已寫入',e.val())
         })
   }
   
)


app.engine('ejs',engine);
app.set('views','./views');
app.set('view engine','ejs');
//增加靜態檔案的路徑
app.use(express.static('public'))

// 增加 body 解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

//路由
app.get('/',function(req,res){
   res.render('index');
    
})

// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);