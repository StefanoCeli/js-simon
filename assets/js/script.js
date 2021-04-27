$(document).ready(function(){
    $('.container').show();
    var arrNumRandom = [];
    var arrNumUser = [];
    var arrNumResult = [];
    var limitUser = parseInt(prompt('Con quanti numeri vuoi giocare?'))

    reset();

    $('#start').click(function(){
        $(this).hide();
        while(arrNumRandom.length < limitUser){
            arrNumRandom.push(getRandomNumber(1,100)); 
        }
        printOutput(arrNumRandom,'#output')
        setTimeout(function(){
            $('#box').show();
            printOutput('inserisci i numeri','#output')
        },5000)
    });
    console.log(arrNumUser);

    $('#invia').click(function(){

        if(arrNumUser.length < limitUser){
                arrNumUser.push($('#box input').val());
                $('#box input').val('');

                if(arrNumUser.length ===limitUser){
                    $('#box').hide();
                    printOutput('Calcolo in corso','#output');
                    setTimeout(function(){
                        var i = 0;

                        while( i < arrNumUser.length){

                            if(arrNumRandom.includes(parseInt(arrNumUser[i]))){
                                arrNumResult.push(parseInt(arrNumUser[i]));
                            }
                            i++;
                        }
                        console.log(arrNumResult);
                        console.log(arrNumRandom);

                        if(arrNumResult.length === arrNumRandom.length){
                            printOutput('Complimenti! hai indovinato tutti i numeri! i numeri erano :' + arrNumResult ,'#output')
                        }else if(arrNumResult.length === 0){
                            printOutput('Hai perso non hai indovinato nessun numero!','#output')
                        }else if(arrNumResult.length < arrNumRandom.length){
                            printOutput('Hai indovinato ' + arrNumResult.length + ' numeri su ' + arrNumRandom.length + ' i numeri sono: ' + arrNumResult,'#output');
                            
                        }

                        $('#restart').show();
                        $('#restart').click(function(){
                            location.reload();
                        });
                    },3000);
                }
        }
        
    });

});

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

function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max - min + 1)+min);
};