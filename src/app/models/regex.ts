export class ExpRegular {
    public static decimal = "^[0-9]+(\.[0-9]{1,2})?$";
    public static entero = "^[0-9]*$";
    public static letras = "^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]*$";
    public static nroletras = "^[0-9a-zA-ZÑñáéíóúÁÉÍÓÚ ]*$";



    //mensajes
    public static mdecimal = "El campo solo permite números enteros y decimales.";
    public static mentero = "El campo solo permite números enteros.";
    public static mletras = "El campo solo permite letras.";
    public static mnroletras = "El campo solo permite números y letras.";
    constructor() {}
}