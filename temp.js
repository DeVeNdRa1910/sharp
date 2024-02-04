console.log('person1: shows ticket')
console.log('person2: shows ticket')

async function preMovie() {
    //async function will always return promise
    const promiseWifeBringingTickets = new Promise((resp , rejt)=>{
        setTimeout(()=>{
            resolve('ticket');
        }, 3000)
    });

    const getPopcorn = new Promise((resolve , reject) => resolve('popcorn'));

    const getButter = new Promise((resolve , reject) => resolve('Butter'));

    const getColdDrink = new Promise((resolve , reject) => resolve('Cold Drinks'))

    let tickets = await promiseWifeBringingTickets;

    console.log(`wife: I have the ${tickets}`);
    console.log('husband: we should go in');
    console.log('wife: no i am hungey');

    let popcorn = await getPopcorn;

    console.log(`husband:i got some ${popcorn}`);
    console.log('husband: we should go in');
    console.log('wife: no i need butter on my popcorn');

    let butter = await getButter;

    console.log(`husband: i got some ${butter} on popcorn`);
    console.log(`husband: anything else darling`);
    console.log(`wife: lets got we are getting late but if we have cold dink then its awesome`);

    let coldDrink = await getColdDrink;

    console.log(`husband: I got cold drink lets in we are getting too late`);

    return tickets;
}

preMovie().then((m)=>{console.log(m)})
/* const promiseWifeBringingTickets = new Promise((resp , rejt)=>{
    setTimeout(()=>{
        resolve('ticket');
    }, 3000)
});

promiseWifeBringingTickets.then((t)=>{
    console.log(`person3: shows ${t}`);
});

const getPopcorn = promiseWifeBringingTickets.then((t)=>{
    console.log("wife: I have the tickets");
    console.log('husband: we should go in');
    console.log('wife: no i am hungey');
    return new Promise((resolve , reject)=>resolve(`${t} popcorn`));
});

 const getButter = getPopcorn.then((t)=>{
    console.log("husband:i got some popcorn");
    console.log('husband: we should go in');
    console.log('wife: no i need butter on my popcorn');
    return new Promise((resolve , reject)=>resolve(`${t} popcorn`));
});
getPopcorn.then((t)=> console.log(t))

getButter.then((t)=>console.log(t)) */

console.log('person3: shows tickets');
console.log('person4: shows tickets');