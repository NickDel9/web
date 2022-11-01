class User{

    constructor(fname , lname , dname , tname , email ,password){
        this.fname = fname;
        this.lname = lname;
        this.dname = dname;
        this.tname = tname;
        this.email = email;
        this.password = password
        this.latestUsername = ''
        this.latestPassword = ''
    }

    getEmail(){
        return this.email;
    }
}

module.exports = User