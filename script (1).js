var global = {
    data: []
};

function update_A1(){
    var set = {};
    console.log("A");
    global.data.forEach(function(i){
        console.log("B");
        if(!set.hasOwnProperty(i["AREA 1"])){
            set[i["AREA 1"]] = i["AREA 1"];
            document.querySelector("#area-1 > select").innerHTML += "<option value='"+i["AREA 1"]+"'>"+i["AREA 1"]+"</option>";
            document.querySelector("#area-1 > select").material_select();
        }
    });
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
}
function update_A2(){
    global.data
}

function read_csvs(url,call){
    var data;
    Papa.parse(url, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function(results) {
            console.log(results);
            global.data = global.data.concat(results.data);
            console.log("0")
            update_A1();
        }
    });
    return data;
}


function read_names(url,call){
    var data;
    Papa.parse(url, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function(results) {
            results.data.forEach(function(n){
                var nurl = "https://raw.githubusercontent.com/lnspace/route-tracker/master/"+n.Name+".csv";
                read_csvs(nurl);
            });
        }
    });
    return data;
}

window.onload = function(){
    var name = "input.csv";
    var url = "https://raw.githubusercontent.com/lnspace/route-tracker/master/file_name.csv";
    read_names(url);

};
