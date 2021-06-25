$(document).ready(function(){

    $.getJSON("/statecity/fetchstate",function(data){

     $.each(data,function(index,item){
     $('#state').append($('<option>').text(item.statename).val(item.stateid))

     })

    })

   $('#state').change(function(){

    $.getJSON("/statecity/fetchcity",{stateid:$('#state').val()},function(data){
        $('#city').empty()
        $('#city').append($('<option>').text("-Select-")) 
        $.each(data,function(index,item){
        $('#city').append($('<option>').text(item.cityname).val(item.cityid))
   
        })
   
       })
   



   })


})