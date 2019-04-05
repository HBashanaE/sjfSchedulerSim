$(function () {
    $("#addProcess").click(
        function () {
            var burstTimeInput = $("#burstTime").val();
            var arivalTimeInput = $("#arivalTime").val();
            if($.isNumeric(burstTimeInput) && $.isNumeric(arivalTimeInput)){
                if(burstTimeInput!='' && arivalTimeInput!= ''){

                    var processItemList = [];
                    var processList0 = [];
                    var processList1 = [];

                    $("#burstTime").val("");
                    $("#arivalTime").val("");

                    var processItem0 = {};
                    processItem0[arivalTimeInput] = burstTimeInput;
                    processItemList.push(processItem0);

                    processItemList.sort(function (a, b) {  
                        $.each(a,function(x,y){
                            valA= x;
                        });
                        $.each(b,function(x,y){
                            valB = x;
                        });
                        return valA-valB;  });
                    
                    
                    var inc = 0;
                    $.each(processItemList,function(index,value){
                        var processItem1 = [];
                        $.each(processItemList[index],function(ind,val){
                            processName = "Process"+inc;
                            processItem1.push(processName);
                            console.log(processName);
                            processItem1.push(ind);
                            console.log(ind);
                            processItem1.push(val);
                            console.log(val);
                        });
                        processList0.push(processItem1);
                        console.log(processList0);
                        inc++;
                    });

                    $('#ganttChart1').empty();
                    $('#processList1').empty();
                    $('#processList1').append("<div class='text-white'> <strong>Process Name </strong><br></div>");
                    $('#burstTimeList1').empty();
                    $('#burstTimeList1').append("<div class='text-white'> <strong>Burst time(ms)</strong> <br></div>");
                    
                    inc = 0;
                    $.each(processList0, function (index, value) {
                            $('#processList0').append("<li class='text-white'>" + value[0] + "</li>");
                            $('#arivalTimeList0').append("<li class='text-white'>" + value[1]+ "</li>");
                            $('#burstTimeList0').append("<li class='text-white'>" + value[2] + "</li>");
                            $('#ganttChart1').append("<div style='width:" + value[2] + "px;height:100px;border:1px solid #000; color:#f15468'></div>");
                        inc++;
                    });


                    // inc = 0;
                    // $.each(processList,function(index,value){
                    //     var processValue = value["Process"+inc];
                    //     // console.log(processValue);
                    //     $.each(processList[index],function(ind,val){
                    //         console.log(ind);
                    //     });
                    //     //console.log(value);
                    //     inc++;
                    // });
                    

                    
                    // inc = 0;
                    // $.each(processItemList,function(index,value){
                    //     $.each(processItemList[index],function(ind,val){
                    //         $('#processList1').append("<li class='text-white'>" +ind+ "</li>");
                    //         $('#burstTimeList1').append("<li class='text-white'>"+val+"</li>");
                    //         $('#ganttChart1').append("<div style='width:"+val+"px;height:100px;border:1px solid #000; color:#f15468'></div>");
                    //     });
                    //     inc++;
                    // });

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

