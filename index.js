// let joke=require('one-liner-joke');
let path=require('path');
let fs=require('fs');
let url=require("url");
let http=require("http");

let datapath=path.join(__dirname, "data");
let htmlpath=path.join(__dirname, 'index.html');
let htmlshow=fs.readFileSync(htmlpath);


const server=http.createServer((req, res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');

    if(req.url=="/addjoke"&&req.method=="POST"){

        addjoke(req, res);
    }


    if(req.url=="/jokes"&&req.method=="GET"){

        getalljokes(req, res);
    }


    if(req.url.startsWith('/like')){

        like(req, res);
    }


    if(req.url.startsWith('/dislike')){

        dislike(req, res);
    }


    if(req.url.startsWith('/html')){

        drawhtml(req, res);
    }





});
server.listen(3000);











function like(req, res){
    let dir=fs.readdirSync(datapath);

    const url=require('url');
    const params=url.parse(req.url, true).query;
    let id=params.id;
    console.log(id);

    if(id&&req.method=="POST"){
        if(id>dir.length){
            res.end('такого айди нема');
        }else{
            let filepath=path.join(datapath, id+'.json');
            let file=fs.readFileSync(filepath);
            let jokejson=Buffer.from(file).toString();
            let joke=JSON.parse(jokejson);

            joke.likes++;

            fs.writeFileSync(filepath, JSON.stringify(joke));
            res.end(`вы лайкнули шутку номер....${id}`);
        }
    }else if(id&&req.method=="GET"&&id>dir.length){
        let filepath=path.join(datapath, id+'.json');
        let file=fs.readFileSync(filepath);
        let jokejson=Buffer.from(file).toString();
        let joke=JSON.parse(jokejson);

        res.end(`у шутки номер ${id}, ${joke.likes} лайков`);
    }else{
        res.end('ошибка')
    }
};
function dislike(req, res){
    let dir=fs.readdirSync(datapath);

    const url=require('url');
    const params=url.parse(req.url, true).query;
    let id=params.id;
    console.log(id);

    if(id&&req.method=="POST"){
        if(id>dir.length){
            res.end('такого айди нема');
        }else{
            let filepath=path.join(datapath, id+'.json');
            let file=fs.readFileSync(filepath);
            let jokejson=Buffer.from(file).toString();
            let joke=JSON.parse(jokejson);

            joke.dislikes++;

            fs.writeFileSync(filepath, JSON.stringify(joke));
            res.end(`вы дизлайкнули шутку номер....${id}`);
        }
    }else if(id&&req.method=="GET"&&id>dir.length){
        let filepath=path.join(datapath, id+'.json');
        let file=fs.readFileSync(filepath);
        let jokejson=Buffer.from(file).toString();
        let joke=JSON.parse(jokejson);

        res.end(`у шутки номер ${id}, ${joke.dislikes} дизлайков`);
    }else{
        res.end('ошибка')
    }



};





function addjoke(req, res){
    let data='';
    req.on('data', function(chunk){
        data+=chunk;
    });
    req.on('end', function(){
        let joke=JSON.parse(data);
        joke.likes=0;
        joke.dislikes=0;
        joke.needshow=true;

        let dir=fs.readdirSync(datapath);
        let filename=dir.length+".json";
        let filepath=path.join(datapath, filename);
        fs.writeFileSync(filepath, JSON.stringify(joke));
        res.end();
    });
};




function getalljokes(req, res){
    let dir=fs.readdirSync(datapath);
    let alljokes=[];
    for (let i = 0; i < dir.length; i++) {
        let file=fs.readFileSync(path.join(datapath, i+".json"));
        let jokejson=Buffer.from(file).toString();
        let joke=JSON.parse(jokejson);
        joke.id=i;
        alljokes.push(joke);
        
    }
    res.end(JSON.stringify(alljokes));
};










































































// for (let i = 0; i < 100; i++) {
//     let filepath=path.join(datapath, i+".json");

//     let joke_about_you={
//         id: i,
//         content: `${joke.getRandomJoke().body}`,
//         likes: 0,
//         dislikes: 0,
//         needSHOW: true
//     }



//     fs.writeFileSync(filepath, JSON.stringify(joke_about_you));
    
// }