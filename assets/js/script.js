$(document).ready(function(){
    //finchè non viene letto il document tutto il container è display none
    $('.container').show();
    //creo gli array vuoti
    var arrNumRandom = [];
    var arrNumUser = [];
    var arrNumResult = [];
    //chiedo all'utente con quanti numeri vuole giocare
    var limitUser = parseInt(prompt('Con quanti numeri vuoi giocare?'))
    //setto la situazione di default
    reset();
    //tramite il click su start faccio scomparire il bottone e genero i numeri random
    $('#start').click(function(){
        $(this).hide();
        while(arrNumRandom.length < limitUser){
            arrNumRandom.push(getRandomNumber(1,100)); 
        }
        //mostro a video i numeri random
        printOutput(arrNumRandom,'#output');
        //setto un timeout di cinque secondi,dove al termine mostrerò il div box dove l'utente dovra inserire i numeri
        setTimeout(function(){
            $('#box').show();
            printOutput('inserisci i numeri','#output')
        },5000)
    });
    //al click di invia vado a memorizzare in un array i numeri inseriti dall'utente
    $('#invia').click(function(){

        if(arrNumUser.length < limitUser){
                arrNumUser.push($('#box input').val());
                $('#box input').val('');
                //al raggiungimento del limite inserito dall'utente faccio sparire di nuovo il box e faccio apparire "cacolo in corso"
                if(arrNumUser.length ===limitUser){
                    $('#box').hide();
                    printOutput('Calcolo in corso','#output');
                    //setto un timeout di 3 secondi
                    setTimeout(function(){
                        //imposto una variabile che parte da 0 
                        var i = 0;
                        //inizio un ciclo while sull'array dell'utente
                        while( i < arrNumUser.length){
                            //controllo se l'array random contiene i numeri dell'utente,se il risultato è positivo allora pusherà nell'array vuoto
                            if(arrNumRandom.includes(parseInt(arrNumUser[i]))){
                                arrNumResult.push(parseInt(arrNumUser[i]));
                            }
                            i++;
                        }
                        //se la lunghezza dell'array result è uguale a quello random l'utente ha vinto
                        if(arrNumResult.length === arrNumRandom.length){
                            printOutput('Complimenti! hai indovinato tutti i numeri! i numeri erano :' + arrNumResult ,'#output')
                        }//se la lunghezza dell'array result è 0 l'utente ha perso
                        else if(arrNumResult.length === 0){
                            printOutput('Hai perso non hai indovinato nessun numero!','#output')
                        }//se la lunghezza dell'array result è inferiore a quello random,mostro all'utente quanti numeri ha indovinato
                        else if(arrNumResult.length < arrNumRandom.length){
                            printOutput('Hai indovinato ' + arrNumResult.length + ' numeri su ' + arrNumRandom.length + ' i numeri sono: ' + arrNumResult,'#output');
                            
                        }
                        //al termine del gioco faccio apparire il pulsante restart,al click ricaricherà la pagina
                        $('#restart').show();
                        $('#restart').click(function(){
                            location.reload();
                        });
                    },3000);
                }
        }
        
    });

});
//funzione di reset
function reset(){
    printOutput('Clicca via!','#output')
    $('#start').show();
    $('#box').hide();
    $('#restart').hide();
};

//funzione per scrivere un output in un target
function printOutput(str,target){
$(target).text(str);
};
//funzione numeri random
function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max - min + 1)+min);
};