const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vercel-admin-user:1Kbd1HXXyFZyVz5j@cluster0.szqexgz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`connection sucessful`);
}).catch((e) => {
    console.log(`no connection`);
})