'use strict'

fetch('http://api.icndb.com/jokes/random/10')
    .then((res) => {
        res.json().then((data) => {
            console.log(data);
        });
    })
    .catch((err) => {
        console.log(err);
    });




/*
let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Good to go!');
    },1000);
});

let myPromise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Promise 2 - The Promising');
    },1500);
});

Promise.all([myPromise,myPromise2])
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
*/
/*myPromise.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
});
*/