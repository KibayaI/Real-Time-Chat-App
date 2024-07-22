const users = new Map()

users.set("first", "Kibaya")
users.set("second", "Muhia")
users.set("last", "Dennis")

console.log(users)

users.delete("second")

// console.log(users.get("second"))

console.log(users)