const L={x:.3,color:"#d9455f",hair:"#8b4a2b"},D={x:.7,color:"#4a8f5c",hair:"#555",mustache:1};
export const STORIES={
bicicletaria:{name:"A Bicicletaria do Lucas",scenes:[
{text:"Lucas era um garoto que amava bicicletas.",bg:"street",chars:[{...L,x:.5,walk:"in",talk:1}],props:[{type:"house",x:60,color:"#ff9aa2"},{type:"bike",x:290,color:"#e8433a"}],cam:"zoom",dur:4},
{text:"Um dia, ele contou ao pai que queria abrir uma bicicletaria.",bg:"street",chars:[{...L,x:.35,talk:1},{...D,x:.62,walk:"in"}],props:[{type:"truck",color:"#3a7bd5"}],cam:"pan",dur:5},
{text:"Os dois pintaram as paredes, organizaram as ferramentas e montaram as bicicletas.",bg:"shop",chars:[{...L,x:.3,wave:1},{...D,x:.72}],props:[{type:"box",x:60,color:"#c58b4a"},{type:"bike",x:230,color:"#2fa84f"}],cam:"zoom",dur:6},
{text:"Mas como funciona uma bicicleta? Você pedala, e o pedal gira a corrente.",bg:"shop",chars:[],props:[{type:"bikeinfo",labels:["pedal","corrente"]}],cam:null,dur:6},
{text:"A corrente gira a roda de trás. O guidão e o freio ajudam a guiar e parar.",bg:"shop",chars:[],props:[{type:"bikeinfo",labels:["roda","guidao","freio"]}],cam:null,dur:6},
{text:"A loja abriu, e os clientes chegaram!",bg:"street",chars:[{x:.22,color:"#e3a21a",hair:"#222",walk:"in"},{...L,x:.5,wave:1},{x:.78,color:"#7a5cd6",hair:"#c0392b",walk:"in"}],props:[{type:"house",x:30,color:"#ffb84d",w:300},{type:"sign",text:"BICICLETARIA|DO LUCAS"}],cam:"zoom",dur:5},
{text:"E assim começou o sonho do Lucas!",bg:"night",chars:[{...L,x:.5,wave:1,talk:1}],props:[{type:"sign",text:"BICICLETARIA|DO LUCAS"},{type:"star",x:60,y:200},{type:"star",x:300,y:260}],cam:"zoom",dur:4}]},
padaria:{name:"A Padaria da Ana",scenes:[
{text:"Ana acordava todo dia às quatro da manhã.",bg:"night",chars:[{x:.5,color:"#e87ca0",hair:"#222",walk:"in",talk:1}],props:[{type:"house",x:40,color:"#d8b384"}],cam:"zoom",dur:4},
{text:"Ela assava pães quentinhos para toda a vizinhança.",bg:"shop",chars:[{x:.4,color:"#e87ca0",hair:"#222",wave:1}],props:[{type:"box",x:230,color:"#e8c27a"},{type:"box",x:290,color:"#d9a85a"}],cam:"pan",dur:5},
{text:"Quando o sol nasceu, a fila já dava a volta no quarteirão!",bg:"park",chars:[{x:.25,color:"#3a7bd5",hair:"#333",walk:"in"},{x:.55,color:"#e87ca0",hair:"#222"},{x:.8,color:"#e3a21a",hair:"#8b4a2b",walk:"in"}],props:[{type:"house",x:30,color:"#ffd9a0",w:300},{type:"sign",text:"PADARIA|DA ANA"}],cam:"zoom",dur:5}]}};
