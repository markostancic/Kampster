jQuery(document).ready(function ($) {
    var messages = [];
    $.ajax({
            url: '/Fe-praksa/json/data.json',
            type: 'GET',
            dataType: 'json'
        })
        .done(function (result) {
            messages = [];
            for (var i in result){
                var el = result[i];
                var name = el.fName;
                for(var j in el.comment){
                    var item = el.comment[j];
                    messages.push({'owner': el.id, fName: el.fName, lName: el.lName, name: item.name, descComm: item.text});
                }
                var image = name.toLocaleLowerCase();
                var item = el.comment[j];
                $('#contact').append('<div class="container row"><img src="/Fe-praksa/images/'+ image +'.jpg" class="img img-response img-circle icon" alt="slika 1"><p class="name"><b>'+name+' '+el.lName+'</b>'+' '+el.des+'</p><p class="date">Pre '+el.date+' sati</p></div><div class="row" id="link1"><a id="'+name+'" class="up"><i class="material-icons">keyboard_arrow_up</i></a><a id="'+name+'" class="down"><i class="material-icons">keyboard_arrow_down</i></a><a id="'+name+'" class="reply" href="#"><i class="material-icons">reply</i>Odgovori</a></div><div class="'+name+' text6"><p><b>'+item.name+'</b></p><p class="descComm">'+item.text+'</p><div id="'+name+'" class="answer"></div><a id="'+name+'" class="load">Ucitaj jos</a></div>');
                $('#'+name+'.up').click(function (el) {
                    var name = el.currentTarget.id;
                    for(var k in messages){
                        if(messages[k].fName == name){
                            $("."+name).hide();
                        }
                    }
                });
                $('#'+name+'.down').click(function (el) {
                    var name = el.currentTarget.id;
                    for(var k in messages){
                        if(messages[k].fName == name){
                            $("."+name).show();
                        }
                    }
                });
                $('#'+name+'.reply').click(function (el) {
                    var name = el.currentTarget.id;
                    for(var k in messages){
                        if(messages[k].fName == name){
                            $('#'+name+'.answer').append('<div class="row form-inline"><input type="text" id="'+name+'" class="input form-control" /><button type="button" id="'+name+'" class="button btn btn-primary">Pošalji</button></div>');
                            break;
                        }
                    }
                    
                    $('#'+name+'.button').click(function(){
                      $('#'+name+'.answer').append('<div class="row"><p id="text3"><b>Kristijan</b>'+' '+$('#'+name+'.input').val()+'</p></div>');
                      $('#'+name+'.answer').hide(); 
                    });
                    $('#'+name+'.load').click(function(){
                      $('.input').hide();
                      $('.dugme').hide();
                      $('#'+name+'.answer').toggle();
                    });
                });
            }
            $('#all').append('<div class="row" id="link"><a id="comment">Ucitaj jos komentara</a></div>');
            $('#comment').click(function(){
                $('#view_comm').empty();
                    for(var k in messages){
                       $('#view_comm').append('<div class="row"><p><b>'+messages[k].name+'</b>'+' '+messages[k].descComm+'</p></div>');
                    }
                });
            $('#input').append('<div class="row field"><img src="images/kris.jpg" alt="slika" class="img img-response img-circle icon2"/><input type="text" id="msg" placeholder="Unesi komentar..." /><button type="button" id="button1" class="btn btn-success"><i class="material-icons">send</i></button></div>');

            $('#button1').click(function(){
                $('#input_send').append('<div class="row"><img src="images/kris.jpg" alt="slika" class="img img-response img-circle icon1"/><p id="text7"><b>Kristijan</b> '+$("#msg").val()+'</p></div>');
            });
        })
        .fail(function () {
            console.log("fail");
        })	
});
