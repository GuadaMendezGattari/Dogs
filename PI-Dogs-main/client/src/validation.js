export default function validate(input) {
    let errors = {};
    if(!input.name) errors.name = 'Se debe ingresar un nombre';
    else if(/^\s*[a-zà-ÿ]+[\sa-zà-ÿ]*$/gi.test(input.name) === false) errors.name = 'El nombre no puede contener numeros o simbolos';
    if(!input.min_height) errors.min_height = 'Se debe ingresar una altura minima';
    if(!input.max_height) errors.max_height = 'Se debe ingresar una altura maxima';
    else if(input.max_height < input.min_height) errors.max_height = 'La altura maxima debe ser mayor o igual a la altura minima';
    if(!input.min_weight) errors.min_weight = 'Se debe ingresar un peso minimo';
    if(!input.max_weight) errors.max_weight = 'Se debe ingresar un peso maximo';
    else if(input.max_weight < input.min_weight) errors.max_weight = 'El peso maximo debe ser mayor o igual al peso minimo';
    if(!input.temperaments.length) errors.temperaments = 'Se debe ingresar como minimo un temperamento';
    return errors;
}