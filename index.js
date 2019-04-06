
$(function () {
    var processItemList = [];
    var processList1 = [];
    $("#addProcess").click(
        function () {
            var processList0 = [];
            var burstTimeInput = $("#burstTime").val();
            var arivalTimeInput = $("#arivalTime").val();
            if($.isNumeric(burstTimeInput) && $.isNumeric(arivalTimeInput)){
                if(burstTimeInput!='' && arivalTimeInput!= ''){

                    $("#burstTime").val("");
                    $("#arivalTime").val("");
 
                    var processItem0 = [];
                    processItem0.push(arivalTimeInput);
                    processItem0.push(burstTimeInput);
                    processItemList.push(processItem0);
                    
                    processItemList.sort(function (a, b) {  
                        var valA = a[0];
                        var valB = b[0];
                        return valA-valB;  
                    });

                    var inc = 0;
                    $.each(processItemList,function(a,b){
                        processName = "Process"+inc;
                        var processItem1 = [];
                        processItem1.push(processName);
                        processItem1.push(b[0]);
                        processItem1.push(b[1]);
                        processList0.push(processItem1);
                        inc++;
                    });               

                    $('#ganttChart0').empty();
                    $('#processList0').empty();
                    $('#processList0').append("<div class='text-white'> <strong>Process Name </strong><br></div>");
                    $('#arivalTimeList0').empty();
                    $('#arivalTimeList0').append("<div class='text-white'> <strong>Arival time(ms)</strong> <br></div>");
                    $('#burstTimeList0').empty();
                    $('#burstTimeList0').append("<div class='text-white'> <strong>Burst time(ms)</strong> <br></div>");
                    
                    $.each(processList0, function (index, value) {
                            $('#processList0').append("<li class='text-white'>" + value[0] + "</li>");
                            $('#arivalTimeList0').append("<li class='text-white'>" + value[1]+ "</li>");
                            $('#burstTimeList0').append("<li class='text-white'>" + value[2] + "</li>");
                            $('#ganttChart0').append("<div style='width:" + value[2] + "px;height:100px;border:1px solid #fff; background-color:#f15468'></div>");
                    });

                    processList0.sort(function(a,b){
                        return a[1].localeCompare(b[1]) || a[2].localeCompare(b[2]);
                    }) 
                    // console.log(processList0.toString());

                    $('#ganttChart1').empty();
                    $('#processList1').empty();
                    $('#processList1').append("<div class='text-white'> <strong>Process Name </strong><br></div>");
                    $('#arivalTimeList1').empty();
                    $('#arivalTimeList1').append("<div class='text-white'> <strong>Arival time(ms)</strong> <br></div>");
                    $('#burstTimeList1').empty();
                    $('#burstTimeList1').append("<div class='text-white'> <strong>Burst time(ms)</strong> <br></div>");

                    var cumBurstTime = 0;
                    $.each(processList0,function(index,value){
                        cumBurstTime += value[2];
                        currentArivalTime = value[1];
                        
                        // if(cumBurstTime < currentArivalTime){
                        //     var interval = currentArivalTime - cumBurstTime;
                        //     $('#ganttChart1').append("<div style='width:" + interval + "px;height:100px;border:1px solid #fff; background-color:#fff'></div>");
                        // }else{
                        //     $('#ganttChart1').append("<div style='width:" + value[2] + "px;height:100px;border:1px solid #fff; background-color:#f15468'></div>");
                        // }
                        $('#ganttChart1').append("<div style='width:" + value[2] + "px;height:100px;border:1px solid #fff; background-color:#f15468'></div>");
                        $('#processList1').append("<li class='text-white'>" + value[0] + "</li>");
                        $('#arivalTimeList1').append("<li class='text-white'>" + value[1]+ "</li>");
                        $('#burstTimeList1').append("<li class='text-white'>" + value[2] + "</li>");

                    });

                }else{
                    alert("Add a burst time");
                }
            }else{
                $("#burstTime").val("");
                alert("Only numerical inputs allowed");
            }
                
                
        }
    ) 
})

