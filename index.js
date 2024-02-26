let joke=require('one-liner-joke');
let path=require('path');
let fs=require('fs');
let url=require("url");

let datapath=path.join(__dirname, "data");

for (let i = 0; i < 100; i++) {
    let filepath=path.join(datapath, i+".json");

    let joke_about_you={
        id: i,
        content: `${joke.getRandomJoke().body}`,
        likes: 0,
        dislikes: 0,
        needSHOW: true
    }



    fs.writeFileSync(filepath, JSON.stringify(joke_about_you));
    
}