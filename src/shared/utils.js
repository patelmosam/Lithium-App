
export function parse_sql(sql) {
    sql = sql.split("(")[1].split(")")[0];
    // console.log(sql)
    sql = sql.split(',');
    let schema = {}
    sql.map((s) => {
        // console.log(s);

        s = extract(s.trim());
        if (s.length == 1){
            s = s[0].split(" ");
            schema[s[0]] = s[1];
        }else
            schema[s[0]] = s[1];
    })
    // console.log('schema',schema)
    return schema;
}

function extract(str){
    str = str.split("'");
    // console.log(str)
    let res = str.filter((s) => {
        if(s=="" || s==" ")
            return false;
        else
            return true;
    })
    // console.log(res);
    return res;
}

function remove_quote(s){
    let temp = s.match(/'([^']+)'/)[1];
    if(temp==null)
        return s;
    else 
        return temp;
}