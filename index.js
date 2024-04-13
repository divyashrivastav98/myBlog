import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const blogs = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        blogs: blogs
    });
});

app.post("/submit", (req, res) => {
    const blog = {
        id: Math.random(),
        title: req.body.title,
        description: req.body.description
    }

    blogs.push(blog);

    res.render("index.ejs", {
        blogs: blogs
    })
});

app.get("/blogs/:blogid", (req, res) => {
    const id = req.params.blogid;
    const selectedBlog = blogs.find(b => b.id == id);
    res.render("blog.ejs", {
        blog: selectedBlog
    })
});

app.get("/delete/:blogid", (req, res) => {
    const id = req.params.blogid;
    const selectedBlogIndex = blogs.findIndex(b => b.id == id);
    blogs.splice(selectedBlogIndex, 1);
    res.redirect("/");
});

app.get("/blog/edit/:blogid", (req, res) => {
    const id = req.params.blogid;
    const selectedBlog = blogs.find(b => b.id == id);
    res.render("blog.ejs", {
        blog: selectedBlog,
        isEdit: true
    })
});

app.post("/update/:blogid", (req, res) => {
    const updatedDescription = req.body["edit-description"];
    const id = req.params.blogid;
    const selectedBlogIndex = blogs.findIndex(b => b.id == id);
    blogs[selectedBlogIndex].description = updatedDescription;
    res.redirect("/");
});

app.listen(port);