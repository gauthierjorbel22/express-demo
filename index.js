// https://www.youtube.com/watch?v=pKd0Rpw7O48

const Joi = require('joi');    //joi returns a class that's why it is capital letter
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: "Introduction to programming" },
    { id: 2, name: "Data Structures and algorithms" },
    { id: 3, name: "Operating Systems" }
]

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) { //404
       return res.status(404).send('The course with the given ID was not found!');
    }
    res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.params)
})
// Post request 
app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body)
    if (error) {
       return res.status(400).send(error.details[0].message);
        
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) { //404
        return res.status(404).send('The course with the given ID was not found!');
    }

    const { error } = validateCourse(req.body)
    if (error) {
       return res.status(400).send(error.details[0].message);
    }
    course.name = req.body.name;
    res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){
        return res.status(404).send("The course with the given ID was not found.")
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}
// PORT 
const port = process.env.PORT || 8081;
app.listen(8081, () => console.log(`Listening on port ${port}`));