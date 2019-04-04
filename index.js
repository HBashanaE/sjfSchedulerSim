var processCount = 0;
var processList = [];
$(function () {
    $("#createProcess").click(
        function () {
            var textInput = $("#burstTime").val();
            if($.isNumeric(textInput)){
                if(textInput!=''){
                    var processName= "Process"+processCount;
                    $('#processList0').append("<li class='text-white'>" +processName+ "</li>");
                    $('#burstTimeList0').append("<li class='text-white'>"+textInput +"</li>");
                    processCount++;
                    $("#burstTime").val(""); //or$(this).value = '';

                    $('#ganttChart0').append("<div style='width:"+textInput+"px;height:100px;border:1px solid #000; color:#f15468'></div>")

                    //processList.push(parseInt(textInput));
                    var processItem = {};
                    processItem[processName] = textInput;
                    // $.each(processItem,function(index,value){
                    //     console.log(index,value);
                    // });
                    processList.push(processItem);

                    inc = 0;
                    $.each(processList,function(index,value){
                        var processValue = value["Process"+inc];
                        // console.log(processValue);
                        $.each(processList[index],function(ind,val){
                            //console.log(val);
                        });
                        //console.log(value);
                        inc++;
                    });
                    processList.sort(function (a, b) {  
                        $.each(a,function(x,y){
                            valA= y;
                        });
                        $.each(b,function(x,y){
                            valB = y;
                        });
                        return valA-valB;  });

                        inc = 0;
                        $.each(processList,function(index,value){
                            var processValue = value["Process"+inc];
                            // console.log(processValue);
                            $.each(processList[index],function(ind,val){
                                console.log(ind);
                            });
                            //console.log(value);
                            inc++;
                        });
                    

                    $('#ganttChart1').empty();
                    $('#processList1').empty();
                    $('#processList1').append("<div class='text-white'> <strong>Process Name </strong><br></div>");
                    $('#burstTimeList1').empty();
                    $('#burstTimeList1').append("<div class='text-white'> <strong>Burst time(ms)</strong> <br></div>");
                    
                    inc = 0;
                    $.each(processList,function(index,value){
                        $.each(processList[index],function(ind,val){
                            $('#processList1').append("<li class='text-white'>" +ind+ "</li>");
                            $('#burstTimeList1').append("<li class='text-white'>"+val+"</li>");
                            $('#ganttChart1').append("<div style='width:"+val+"px;height:100px;border:1px solid #000; color:#f15468'></div>");
                        });
                        inc++;
                    });

                }else{
                    alert("Add a burst time");
                }
            }else{042606
                $("#burstTime").val("");
                alert("Only numerical inputs allowed");
            }
                
                
        }
    ) 
})

