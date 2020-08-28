db = connect("localhost:27017/celebs")

db.comedians.insertMany([ 
    { name: "Trevor Noah", age: 36, status: 'single' },
    { name: "Hasan Minhaj", age: 35, relationship: "married" },
])
