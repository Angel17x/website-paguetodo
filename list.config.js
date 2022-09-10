function listArea(){
  return [
    {value: null, name: "Seleccione el área del servicio"},
    {value: "POS", name: "Pos"},
    {value: "SERVICE_PAY", name: "Recarga"},
    {value: "PAYMENT_SOLUTIONS", name: "Soluciones de pago"},
    {value: "CASHING", name: "Cobranza"},
    {value: "DEVELOPMENT", name: "Desarrollo a la medida"}
  ];
}
function listClaim(value){
  const object = {
    "pos": [
      {"value":null, "name":"Seleccione un tipo de reclamo"},
      {"value":"8bd253f0-0172-11ed-8ca8-51c89fcb3acb", "name": "Problemas de conexión"}
    ],
    "service_pay":[
      {"value": null, "name": "Seleccione un tipo de reclamo"},
      {"value": "4d90abd0-fd5f-11ec-a96e-25d110604b70","name": "NO HAN CARGADO UN PAGO REALIZADO HACE MAS DE 2 DIAS HABILES"}
    ],
    'payment_solutions': [
      {"value":null, "name":"Seleccione un tipo de reclamo"},
      {"value":"d507fa10-0173-11ed-8ca8-51c89fcb3acb", "name": "Sistema no responde"}
    ],
    "development":[
      {"value":null, "name":"Seleccione un tipo de reclamo"},
      {"value":"1226a4f0-0174-11ed-8ca8-51c89fcb3acb", "name": "Tiempos de espera prolongado"}
    ],
    'cashing':[
      {"value":null, "name":"Seleccione un tipo de reclamo"},
      {"value":"417f2880-0174-11ed-8ca8-51c89fcb3acb", "name": "Estatus de la cobranza"},
    ]
  }
  return object[value] ??= [];
}
function listSuggestions(value){
  const object = {
    "pos": [
      {"value":null, name:"Seleccione un tipo de sugerencia"},
      {"value":"65f5ce10-0176-11ed-8ca8-51c89fcb3acb", "name": "Mejoras en la comunicación"},
    ],
    "service_pay": [
      {"value":null, "name":"Seleccione un tipo de sugerencia"},
      {"value": "c690b180-fd5d-11ec-a96e-25d110604b70","name": "MEJORAS EN EL SISTEMA USADO"}
    ],
    'payment_solutions': [
      {"value":null, "name":"Seleccione un tipo de sugerencia"},
      {"value":"a18b9990-0177-11ed-8ca8-51c89fcb3acb", "name": "Mejoras en la comunicación"},
    ],
    "development":[
      {"value":null, "name":"Seleccione un tipo de sugerencia"},
      {"value":"2d78d3f0-0178-11ed-8ca8-51c89fcb3acb", "name": "Mejoras en la comunicación"}
    ],
    'cashing':[
      {"value":null, "name":"Seleccione un tipo de sugerencia"},
      {"value":"6e4ee180-0178-11ed-8ca8-51c89fcb3acb", "name": "Mejoras de canales de comunicación"},
    ]
  }
  return object[value] ??= [];
}
function listComplain(value){
  const object = {
    "service_pay":[
      {"value":null, name:"Seleccione un tipo de queja"},
      {"value": "c31b4460-fd5e-11ec-a96e-25d110604b70","name": "otro"}
    ],
    "pos":[
      {"value":null, name:"Seleccione un tipo de queja"},
      {"value": "05b3a2f0-0c27-11ed-bc0b-7f7c84d99b81","name": "otro"},
    ],
    "cashing":[
      {"value":null, name:"Seleccione un tipo de queja"},
      {"value": "cc896e50-0c27-11ed-bc0b-7f7c84d99b81","name": "otro"}
    ],
    "other":"c31b4460-fd5e-11ec-a96e-25d110604b70"
  }
  return object[value] ??= []
}

function id_user_petition(value){
  let object = {
    pos: "33565100-fe01-11ec-b170-6de6c7a1e31e",
    service_pay: "2dc3ecc0-fe01-11ec-b170-6de6c7a1e31e",
  }
  return object[value] || null
}
function listRequest2(value){
  const object = {
    pos: [
      {value:null, name:"Seleccione un tipo de solicitud"},
      {
        "value": "33565100-fe01-11ec-b170-6de6c7a1e31e",
        "type": "REQUEST",
        "name": "Contactar con un asesor del area",
        "source_type": "POS"
      }
    ],
    service_pay:[
      {value:null, name:"Seleccione un tipo de solicitud"},
      {
          "value": "2dc3ecc0-fe01-11ec-b170-6de6c7a1e31e",
          "type": "REQUEST",
          "name": "Contactar con un asesor del area",
          "source_type": "SERVICE_PAY"
      }
      ],
      cashing:[
      {value:null, name:"Seleccione un tipo de solicitud"},
        {
          "value": "38290ec0-fe01-11ec-b170-6de6c7a1e31e",
          "type": "REQUEST",
          "name": "Contactar con un asesor del area",
          "source_type": "CASHING"
      }
      ],
      payment_solutions:[
      {value:null, name:"Seleccione un tipo de solicitud"},
        {
          "value": "3ed5e3b0-fe01-11ec-b170-6de6c7a1e31e",
          "type": "REQUEST",
          "name": "Contactar con un asesor del area",
          "source_type": "PAYMENT_SOLUTIONS",
        }
      ],
      development:[
      {value:null, name:"Seleccione un tipo de solicitud"},
          {
            "value": "44789ba0-fe01-11ec-b170-6de6c7a1e31e",
            "type": "REQUEST",
            "name": "Contactar con un asesor del area",
            "source_type": "DEVELOPMENT"
          }
      ]
  }
  return object[value] ??= [];
}
function listRequest(){
  return [
    {value:null, name:"Seleccione el tipo de solicitud"},
    {value:"SUGGESTION", name:"Sugerencia"},
    {value:"CLAIM", name:"Reclamo"},
    {value:"COMPLAIN", name:"Queja"},
    {value:"REQUEST", name:"Solicitud"}
  ];
}
function listServices(){
  return [
     // {id:1,value:"MOVILNET_PREPAY", name:"MOVILNET RECARGA - (PREPAGO)"},
     // {id:2,value:"MOVILNET_POSPAY", name:"MOVILNET POSPAGO"},
     {id:3,value:"MOVISTAR_POSTPAID", name:"RECAUDACIÓN MOVISTAR - (POSPAGO)"},
     {id:4,value:"CANTV", name:"CANTV"},
     {id:5,value:"CANTV_INTERNET", name:"CANTV INTERNET - (POSPAGO)"}
   ];
 }
