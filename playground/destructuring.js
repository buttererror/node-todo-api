// destructuring assignment

function drawES2015Chart({size = 'big', cords = {x: 0, y: 0}, radius = 25} = {}) {
   console.log(size, cords, radius);
   // do some chart drawing
}

// drawES2015Chart({
//    cords: {x: 18, y: 30},
//    radius: 30
// });

// drawES2015Chart();

// let user =[
//    {
//       displayName: "mAhmed",
//       age: 26,
//       location: "Alex",
//       fullName: {
//          firstName: "Mahmoud",
//          lastName: "Ahmed"
//       }
//    },
//    {
//       displayName: "mAhmed",
//       age: 27,
//       location: "Alex",
//       fullName: {
//          firstName: "Mohamed",
//          lastName: "Ahmed"
//       }
//    }
// ];
//
// for(let {displayName, fullName: {firstName: f, lastName: l}} of user){
//    console.log(displayName + " is " + f + " " + l);
// }

let user = {
   displayName: "mAhmed",
   age: 26,
   location: "Alex",
   fullName: {
      firstName: "Mahmoud",
      lastName: "Ahmed"
   }
};

let {displayName: name} = user;
console.log(name);

for(let name in user){
   console.log(user[name]);
}
