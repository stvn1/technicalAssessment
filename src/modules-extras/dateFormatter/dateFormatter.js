const dateFormatter = (date) =>{

    if((typeof date) == "string"){
        return date;
    }

    else{
    let {seconds, nanoseconds} = date
    return new Date(seconds * 1000 + nanoseconds/1000000).toISOString();


    }
    // return new Date(seconds * 1000 + nanoseconds/1000000).toISOString().substring(0, 10);
    // //or
    // return new Date(seconds * 1000 + nanoseconds/1000000).toString().substring(0, 15);

}

export default dateFormatter;