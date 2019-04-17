export default {
    findAll: db=> {
        const classes = db.all('SELECT * FROM Classes');
        return classes;
    }
}