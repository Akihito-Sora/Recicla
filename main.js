// Henrique Toshio Fatori ra:2312867

var lista = [];
var contador = 1;

var plastico = "plastico";
var vidro = "vidro";
var papel= "papel";
var organico = "organico";
var metal = "metal";
var aux = 0;
var a = 0;
var b = 0;

function cadastrar(){

    var material = document.getElementById('inputMaterial');
    var dica = document.getElementById('inputDica');

    if (material.value.length == 0){
        alert('Informe um material');
    }else if(dica.value.length == 0){
        alert('Informe uma dica');
    }else if (semAcento(material.value.toLowerCase()) == plastico.toLowerCase()){
        var info = {id: contador++,icon: 'imagens/plastico.png', material: 'Plástico', dica: dica.value};
        salvado(info);
    }else if(material.value.toLowerCase() == vidro.toLowerCase() ){
        var info = {id: contador++,icon: 'imagens/vidro.png', material: 'Vidro', dica: dica.value};
        salvado(info);
    }else if(material.value.toLowerCase() == papel.toLowerCase()){
        var info = {id: contador++,icon: 'imagens/papel.png', material: 'Papel', dica: dica.value};
        salvado(info);
    }else if(material.value.toLowerCase() == metal.toLowerCase()){
        var info = {id: contador++,icon: 'imagens/metal.png', material: 'Metal', dica: dica.value};
        salvado(info);
    }else if (semAcento(material.value.toLowerCase()) == organico.toLowerCase()){
        var info = {id: contador++,icon: 'imagens/organico.png', material:'Orgânico' , dica: dica.value};
        salvado(info);
    }else{
        alert('"'+material.value + '" não é uma opção valida\n\n Os materias são PLASTICO, VIDRO, METAL, PAPEL e ORGANICO');
    }
    showlista();
    filtrar();
    material.value = '';
    dica.value = '';
} 

function salvado(info){
    lista.push(info);
    localStorage.setItem('lista', JSON.stringify(lista));
}
function showlista(){
    var mostra = document.getElementById('mostra');
    mostra.innerHTML ='';
    var h2 = document.createElement('h2');
    h2.innerHTML ='Lista de Dicas';
    mostra.appendChild(h2) ;

    var tbody = document.createElement('table');
    var thead = tbody.insertRow();
    var head_icon = thead.insertCell();
    var head_material =thead.insertCell();
    var head_dica= thead.insertCell();
    var head_delete =thead.insertCell();
    head_icon.innerHTML = 'Icon';
    head_material.innerHTML = 'Material Reciclavel';
    head_dica.innerHTML =  'Dica de Reciclagem';
    head_delete.innerHTML = 'Ação';

    head_dica.classList.add('th');
    head_icon.classList.add('th');
    head_material.classList.add('th');
    head_delete.classList.add('th')

    for (var i = 0; i < lista.length; i++){
        var tr = tbody.insertRow();
        var td_icon = tr.insertCell();
        var td_material = tr.insertCell();
        var td_dica = tr.insertCell();
        var td_del = tr.insertCell();


        var icon = document.createElement('img');
        icon.src = lista[i].icon;
        icon.classList.add('delete');
        td_icon.appendChild(icon);
        td_icon.classList.add('td_icon');

        td_material.innerHTML = lista[i].material;
        td_dica.innerHTML =lista[i].dica;

        var img  = document.createElement('img');
        img.setAttribute('onclick','deletar('+lista[i].id+')');
        img.classList.add('delete');
        img.src = 'imagens/delete.png';
        td_del.appendChild(img);
        td_del.classList.add('td_icon');
    };
    mostra.appendChild(tbody);
}

function deletar (id){
    var updated = lista.filter(function (info) {
        return info.id !== id;
      });

    if (updated.length < lista.length) {
        lista = updated;
        localStorage.setItem('patientList', JSON.stringify(lista));
        showlista();
        filtrar();
      } else {
        alert('Paciente não encontrado.');
      }
}

function filtrar() {
    if (aux){
        var valoresSelecionados = [];
        var checkboxes = document.getElementsByClassName("filtro");
        var chaveElement = document.getElementById("chave");
        
        chaveElement.addEventListener('input', filtrar);
        
        for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
            for (var j = 0; j < lista.length; j++) {
              if (checkboxes[i].value == lista[j].material) {
                valoresSelecionados.push(lista[j]);
              }
            }
          }
        }  
        var chave = chaveElement.value.trim();
        var filtro = [];
      
        if (chave.length === 0) {
          filtro = valoresSelecionados;
        } else {
          for (var i = 0; i < valoresSelecionados.length; i++) {
            if (valoresSelecionados[i].dica.includes(chave)) {
              filtro.push(valoresSelecionados[i]);
            }
          }
        }
        listaSelecionados(filtro);
    }
    
}

function createDiv(){
    var div_filtro = document.createElement("div");
    div_filtro.className ='cadastro';
    var h2 = document.createElement('h2');
    h2.innerHTML ='Filtro';
    div_filtro.appendChild(h2) ;

    var fieldset = document.createElement("fieldset");
    var legend = document.createElement("legend");
    legend.innerHTML = "Selecione um Material";
    fieldset.appendChild(legend);

    var input1 = document.createElement("input");
    input1.setAttribute("type", "checkbox");
    input1.setAttribute("class","filtro");
    input1.setAttribute("value", "Plástico");
    fieldset.appendChild(input1);
    var label1 = document.createElement("label");
    label1.innerHTML = "Plástico";
    fieldset.appendChild(label1);

    var input2 = document.createElement("input");
    input2.setAttribute("type", "checkbox");
    input2.setAttribute( "class","filtro");
    input2.setAttribute("value", "Vidro");
    fieldset.appendChild(input2);
    var label2 = document.createElement("label");
    label2.innerHTML = "Vidro";
    fieldset.appendChild(label2);

    var input3 = document.createElement("input");
    input3.setAttribute("type", "checkbox");
    input3.setAttribute("class","filtro");
    input3.setAttribute("value", "Papel");
    fieldset.appendChild(input3);
    var label3 = document.createElement("label");
    label3.innerHTML = "Papel";
    fieldset.appendChild(label3);

    var input4 = document.createElement("input");
    input4.setAttribute("type", "checkbox");
    input4.setAttribute("class","filtro");
    input4.setAttribute("value", "Metal");
    fieldset.appendChild(input4);
    var label4 = document.createElement("label");
    label4.innerHTML = "Metal";
    fieldset.appendChild(label4);

    var input5 = document.createElement("input");
    input5.setAttribute("type","checkbox");
    input5.setAttribute("class","filtro");
    input5.setAttribute("value", "Orgânico");
    fieldset.appendChild(input5);
    var label5 = document.createElement("label");
    label5.innerHTML = "Orgânico";
    fieldset.appendChild(label5);

    div_filtro.appendChild(fieldset);

    var fieldset2 = document.createElement("fieldset");
    var legend2 = document.createElement("legend");
    legend2.innerHTML = "Se desejar insira uma palavra para buscar na Dica";
    fieldset2.appendChild(legend2);
    var inputchave = document.createElement("input");
    inputchave.setAttribute("type", "text");
    inputchave.setAttribute("id", "chave");
    fieldset2.appendChild(inputchave);

    div_filtro.appendChild(fieldset2);

    var table = document.createElement("table");
    table.setAttribute("id", "tbody");
    div_filtro.appendChild(table);

    var filtro = document.getElementById("filtrar");
    filtro.appendChild(div_filtro);

    var checkboxes = document.getElementsByClassName("filtro");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', filtrar);
    }
    var chaveElement = document.getElementById("chave");
    chaveElement.addEventListener('input', filtrar ); 

    var tbody = document.getElementById("tbody");
    tbody.innerHTML = '';
    var thead = tbody.insertRow();
    var head_icon = thead.insertCell();
    var head_material =thead.insertCell();
    var head_dica= thead.insertCell();
    var head_acao = thead.insertCell();
    head_icon.innerHTML = 'Icon';
    head_material.innerHTML = 'Material';
    head_dica.innerHTML =  'Dica';
    head_acao.innerHTML = 'Ação';

    head_dica.classList.add("th");
    head_icon.classList.add("th");
    head_material.classList.add("th");
    head_acao.classList.add("th");

    var sem = tbody.insertRow();
    sem.innerHTML = 'Nenhum Resultado para Busca';
    sem.className = 'center';

    aux = 1;

}

function listaSelecionados(valoresSelecionados) {
    var tbody = document.getElementById("tbody");
    tbody.innerHTML = '';
    var thead = tbody.insertRow();
    var head_icon = thead.insertCell();
    var head_material =thead.insertCell();
    var head_dica= thead.insertCell();
    var head_acao = thead.insertCell();
    head_icon.innerHTML = 'Icon';
    head_material.innerHTML = 'Material';
    head_dica.innerHTML =  'Dica';
    head_acao.innerHTML = 'Ação';

    head_dica.classList.add("th");
    head_icon.classList.add("th");
    head_material.classList.add("th");
    head_acao.classList.add("th");


    if (valoresSelecionados.length == 0) {
        var sem = tbody.insertRow();
        sem.innerHTML = 'Nenhum Resultado para Busca';
        sem.className = 'center';
    }

    for (var i = 0; i < valoresSelecionados.length; i++) {
        var tr = tbody.insertRow();
        var td_icon = tr.insertCell();
        var td_material = tr.insertCell();
        var td_dica = tr.insertCell();
        var td_acao = tr.insertCell();

        var icon = document.createElement('img');
        icon.src = valoresSelecionados[i].icon;
        icon.classList.add('delete');
        td_icon.appendChild(icon);
        td_icon.classList.add('td_icon');

        var del = document.createElement('img');
        del.setAttribute('onclick','deletar('+lista[i].id+')');
        del.src = 'imagens/delete.png';
        del.classList.add('delete');
        td_acao.classList.add('td_icon');
        td_acao.appendChild(del);
       


        td_material.innerHTML = valoresSelecionados[i].material;
        td_dica.innerHTML =valoresSelecionados[i].dica;
    }
}

function horario(){
    var table = document.createElement('div');
    table.className="cadastro";
    var tbody = document.createElement('table');
    var divm = document.createElement('div');
    var title = document.createElement('div');
    title.innerHTML = 'Coleta de Materias reciclaveis';
    title.setAttribute('class', 'title');
    divm.appendChild(title);
    var inf = document.createElement('div');
    inf.innerHTML = ' as coletas ocorrem a partir das 7:30 AM';
    divm.appendChild(inf);
    divm.setAttribute('class', 'center');
    table.appendChild(divm);

    var head = tbody.insertRow();
    var head_setor = head.insertCell();
    var head_bairro = head.insertCell();
    var head_dia= head.insertCell();
    head_setor.innerHTML = 'Setor';
    head_bairro.innerHTML = 'Bairro';
    head_dia.innerHTML = 'Dia da Semana';

    head_setor.classList.add('th');
    head_bairro.classList.add('th');
    head_dia.classList.add('th');

    var hora1 = {bairro: 'Bela Vista', dia:'Segunda-Feira' };
    var hora2 = {bairro: 'Res. das Orquídeas' , dia:'Terça-Feira'};
    var hora3 = {bairro: 'Vitoria Regia', dia:'Quarta-Feira'};
    var hora4 = {bairro: 'Jd. Ouro Verde' , dia:'Quinta-Feira'};
    var hora5 = {bairro: 'Alvorada', dia:'Sexta-Feira'};
    var hora6 = {bairro: 'Campus Universitarios', dia:' Sabado'};

    var listahorario=[hora1, hora2, hora3, hora4, hora5, hora6];

    for (var i =0; i < listahorario.length; i++){
        var tr = tbody.insertRow();
        var td_setor = tr.insertCell();
        var td_bairro = tr.insertCell();
        var td_dia = tr.insertCell();

        td_setor.innerHTML = i+1;
        td_bairro.innerHTML = listahorario[i].bairro;
        td_dia.innerHTML= listahorario[i].dia;

        td_bairro.className="background_gray";
        td_dia.className="background_gray";
        td_setor.className="background_gray";
    }
    table.appendChild(tbody);

    var horario= document.getElementById("horario");
    horario.innerHTML='';
    horario.appendChild(table);
}

function btn(bt){
    
    if (bt.id == 'btnfiltrar'){
        //var icon = document.getElementById("f");
        if (a == 0){
            a = 1;
            //icon.src= "imagens/ocultar.png";
            bt.innerHTML = "Ocultar Filtro";
            createDiv();
        }else{
            var c = document.getElementById("filtrar");
            c.innerHTML = '';
            //icon.src="imagens/mostrar.png";
            bt.innerHTML = "Mostrar Filtro";
            a = 0;
            aux = 0;
        }
    }else {
        //var icon2= document.getElementById("h");
        if (b == 0){
            b = 1;
            //icon2.src="imagens/ocultar.png";
            bt.innerHTML = "Ocultar Horarios de coleta";
            horario();
        }else {
            var c = document.getElementById('horario');
            c.innerHTML = '';
            //icon2.src="imagens/mostrar.png";
            bt.innerHTML = "Mostrar Horarios de coleta";         
            b = 0;
        }
    }
}

function semAcento(texto) {
    // eliminando acentuação
    texto = texto.replace(/[ÀÁÂÃÄÅ]/,"A");
    texto = texto.replace(/[àáâãäå]/,"a");
    texto = texto.replace(/[ÈÉÊË]/,"E");
    texto = texto.replace(/[Ç]/,"C");
    texto = texto.replace(/[ç]/,"c");
    
    return texto.replace(/[^a-z0-9]/gi,''); 
}

