
//----
console.log("proyecto iniciado....\n")
//---- inportante para que funcione tego que poner npm start -- get
//---- si  lo estoy ejecutando desde un script
//---- * si no ejecuto el archivo con node index.js argument1 argumento2

function input_parameters() {
    const argv_ = process.argv.slice(2)
    //console.log(argv_.length)
    //const length_argv=argv_.length
    if (argv_.length > 0) {
        var list=[]
        let i=0
        for (let parameter of argv_){
            i=i+1
            console.log(`Parametro ${i}: ${parameter}`)
            list.push(parameter.toLowerCase())
        }
    }else{
        console.log('no ingresaste ningun dato')
    }
    return  list
}

//----recibo el resultado de input_parameters en forma de lista
//--- y la guardo  en list_parameters_array
const list_parameters_array=input_parameters()
//console.log(list_parameters_array)


//-------------------------------------------------------------------------------------//
//-------------funcion para chequear  losparametros de post linea 63-------------------//
//-------------------------------------------------------------------------------------//

function verify_post(parameter){
    // console.log(parameter)
    if ( parameter.length === 4 ){

        const id=parameter[0]//aca tendria que poner  una verificacion  con expresiones regulares
        const titulo=parameter[1]
        const precio=parameter[2]// aca igual
        const descripcion=parameter[3]

        if( typeof id!== "string"){
            console.log(`Error: El  elemento (${id}) no es un numero.`);
        }
        if( typeof titulo !== "string"){
            console.log(`Error: El  elemento (${titulo}) no es un string.`);
        }
        if( typeof precio!== "string"){
            console.log(`Error: El  elemento (${precio}) no es un numero.`);
            
        }
        if( typeof descripcion!== "string"){
            console.log(`Error: El  elemento (${descripcion}) no es un string.`);
        }
    return [parameter]

    }  
    else {
        console.log("falta un dato para ingresar son 4")
        process.exit(1)
    } 
}
//-------------------------------------------------------------------------------------//
//-------------------------funciones arreglo de parametros-----------------------------//
//-------------------------------------------------------------------------------------//

function fixed_parameters(lista_){
    lista_||process.exit(1)//aca arregle porque me tiraba un error aca 
    const [para1,para2]=lista_
    const fixed_list=para1.concat(para2)
    // console.log(fixed_list)
    // console.log(typeof(fixed_list))

    //---creo una constante con loq ue voy a buscar
    const slash="/"
    //------------hago la validacion 
    if(fixed_list.includes(slash)){
        const position_slash=fixed_list.lastIndexOf(slash)
        const left_part=fixed_list.slice(0,position_slash+1)
        const rigth_part=fixed_list.slice(position_slash)
        const number_part=fixed_list.slice(position_slash+1)
        //----si incluye entonces comparo con la lista valida1
        //---- y tambien tengo que validar que sea un numero lo que sige despues de la barra
        const slash_numbres= /\/((?:[1-9])|(?:[1-9]\d)|(?:[1-9]\d{2})|(?:1000))$/;
        const valid_list_parameters_1=["getproducts/","deleteproducts/"]
        if(valid_list_parameters_1.includes(left_part) && (slash_numbres.test(rigth_part))){
            return [left_part,para2,number_part]
        }else{
            console.log("el paramero ingresado es incorrecto ")
            process.exit(1)
        }
    }
    const valid_list_parameters_2=["getproducts","postproducts"]

    if (fixed_list===valid_list_parameters_2[1]) {
        if(process.argv.slice(3).length<=6 && process.argv.slice(3).length>2){
            const console_parameters=process.argv.slice(4)
            const verify_post_parameters=verify_post(console_parameters)
            const post_dir=fixed_list.slice(4)//pongo en return  la direccion products
            //,verify_post_parameters
            return [fixed_list,post_dir,console_parameters]
        }
        else{
            console.log("el paramero ingresado es incorrecto ")
            process.exit(1)
        }
    }

    if (fixed_list===valid_list_parameters_2[0]) {
        return [fixed_list,para2]
    }
    else{
        console.log("el paramero ingresado es incorrecto ")
        process.exit(1)
    }     
}

//console.log(fixed_parameters(list_parameters_array))
const output_parameters=fixed_parameters(list_parameters_array)
//---lista de parametros validos para posterior comparacion 
const valid_list_parameters=["getproducts/","getproducts","deleteproducts/","postproducts"]
const fake_store_api = "https://fakestoreapi.com/"


//-------------------------------------------------------------------------------------//
//------------------------GET PRODUCTS /ID---------------------------------------------//
//-------------------------------------------------------------------------------------//

async function get_products(url) {
        try {
            const resp = await fetch(url)
            if (!resp.ok) {
                throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
        } else {
            const data = await resp.json();
            console.log(data);
        }
        } catch (error) {
            console.error('Hubo un problema al obtener los productos:', error);
        }
}

//-------------------------------------------------------------------------------------//
//------------------------GET PRODUCTS /ID---------------------------------------------//
//-------------------------------------------------------------------------------------//

async function get_product(url) {
        try {
            const resp = await fetch(url)
            if (!resp.ok) {
                throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
        } else {
            const data = await resp.json();
            console.log(data);
        }
        } catch (error) {
            console.error('Hubo un problema al obtener los productos:', error);
        }
}

//-------------------------------------------------------------------------------------//
//-------------------------DELETE------------------------------------------------------//
//-------------------------------------------------------------------------------------//
async function delete_product(url) {
        try {
            const resp = await fetch(url,{method:'DELETE'})
            if (!resp.ok) {
                throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
        } else {
            const data = await resp.json();
            console.log(data);
        }
        } catch (error) {
            console.error('Hubo un problema al obtener los productos:', error);
        }
}

//-------------------------------------------------------------------------------------//
//-------------------------POST--------------------------------------------------------//
//-------------------------------------------------------------------------------------//

async function post_products(url,productData) {
        try {
            const resp = await fetch(url, {
            method: 'POST', // Método HTTP
            headers: {
                'Content-Type': 'application/json' // Indicamos que el cuerpo es JSON
            },
            body: JSON.stringify(productData) // Convertimos el objeto JavaScript a una cadena JSON
        })
            if (!resp.ok) {
                throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
        } else {
            const data = await resp.json();
            console.log(data);
        }
        } catch (error) {
            console.error('Hubo un problema al obtener los productos:', error);
        }
}

//-------------------------------------------------------------------------------------//
//------------FUNCION DE CONVERSION A JSON---------------------------------------------//
//-------------------------------------------------------------------------------------//

function data_to_json(data){
    const data_json={
        id:parseInt(data[0]),
        title:data[1],
        price:parseFloat(data[2]),
        descripcion:data[3],
    }
    return data_json
}

//-------------------------------------------------------------------------------------//
//-------------------------llamada  los verbos para mandarlos--------------------------//
//-------------------------------------------------------------------------------------//

if (output_parameters[0]=== valid_list_parameters[1]){
    const req_http=fake_store_api.concat(output_parameters[1])
    console.log(req_http)
    get_products(req_http)
}

if (output_parameters[0]=== valid_list_parameters[0]){
    const req_http=fake_store_api.concat(output_parameters[1])
    const id=parseInt(output_parameters[2])-1
    console.log(req_http,id)
    get_product(req_http,id)
}

if (output_parameters[0]=== valid_list_parameters[2]){
    const req_http=fake_store_api.concat(output_parameters[1])
    const id=parseInt(output_parameters[2])-1
    console.log(req_http,id)
    delete_product(req_http)
}

if (output_parameters[0]=== valid_list_parameters[3]){
    const req_http=fake_store_api.concat(output_parameters[1])
    console.log(req_http)
    const valid_param= output_parameters[2]
    console.log(valid_param)
    const json_data=data_to_json(valid_param)
    console.log(json_data)
    post_products(req_http,json_data)
}