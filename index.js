
$(function () {
    var processItemList = [];
    $("#addProcess").click(
        function () {
            var processList0 = [];
            var processList0X = [];
            var processList1 = [];
            var processList2 = [];
            var burstTimeInput = parseInt($("#burstTime").val());
            var arivalTimeInput = parseInt($("#arivalTime").val());
            var waitingTime0 = 0;
            var waitingTime1 = 0;
            var turnaroundtime0 = 0;
            var turnaroundtime1 = 0;

            if($.isNumeric(burstTimeInput) && $.isNumeric(arivalTimeInput)){ //check whether the inputs are all numeric
                if(burstTimeInput!== '' && arivalTimeInput!== '' ){ //check wether inputs are not empty

                    $("#burstTime").val(""); //clear textbox burstTime
                    $("#arivalTime").val(""); //clear textbox arivalTime
                    
                    //create process item include arival time and burst time
                    var processItem0 = [];
                    processItem0.push(arivalTimeInput);
                    processItem0.push(burstTimeInput);

                    //append process item into process item list which is not changed during whole runtime
                    processItemList.push(processItem0);
                    
                    //sort process item list according to arival time
                    processItemList.sort(function (a, b) {  
                        var valA = a[0];
                        var valB = b[0];
                        return valA-valB;  
                    });

                    //create processList to display FCFS gantt chart (with intervals)
                    var currentTime = processItemList[0][0];

                    for(var i = 0; i<processItemList.length; i++){
                        processName = "Process"+i;
                        var arivalTime = processItemList[i][0];
                        var burstTime = processItemList[i][1];
                        var processItem1 = [];
                        if(currentTime < arivalTime){
                            processItem1.push('Waiting');
                            processItem1.push(currentTime);
                            processItem1.push(arivalTime - currentTime);

                            processList0X.push(processItem1);

                            currentTime = arivalTime;

                            processItem1 = [];
                            processItem1.push(processName);
                            processItem1.push(arivalTime);
                            processItem1.push(burstTime);
                            processItem1.push(currentTime - arivalTime);
                            processItem1.push(currentTime);

                            processList0X.push(processItem1);
                            currentTime += processItemList[i][1];

                        }else{
                            processItem1.push(processName);
                            processItem1.push(arivalTime);
                            processItem1.push(burstTime);
                            processItem1.push(currentTime - arivalTime);
                            processItem1.push(currentTime);
                            waitingTime0 += currentTime - arivalTime;

                            processList0X.push(processItem1);
                            currentTime += processItemList[i][1];
                        }
                    }

                    //addProcess name
                    for(var i = 0; i<processItemList.length; i++){
                        processName = "Process"+i;
                        var arivalTime = processItemList[i][0];
                        var burstTime = processItemList[i][1];
                        var processItem1 = [];
                        
                            processItem1.push(processName);
                            processItem1.push(arivalTime);
                            processItem1.push(burstTime);
                            processItem1.push(currentTime - arivalTime);
                            processItem1.push(currentTime);

                            processList0.push(processItem1);
                            
                    }
            
                    //clear
                    $('#ganttChart0').empty();
                    $('#processList0').empty();
                    $('#processList0').append("<div class='text-white'> <strong>Process Name </strong><br></div>");
                    $('#arivalTimeList0').empty();
                    $('#arivalTimeList0').append("<div class='text-white'> <strong>Arival time(ms)</strong> <br></div>");
                    $('#burstTimeList0').empty();
                    $('#burstTimeList0').append("<div class='text-white'> <strong>Burst time(ms)</strong> <br></div>");
                    
                    //build gantt chart and table for FCFS
                    $.each(processList0X, function (index, value) {
                        if(value[0] === 'Waiting'){
                            $('#ganttChart0').append("<div style='width:" + value[2] + "px;height:100px;border:1px solid black; background-color:black'></div>");
                        }else{
                            $('#processList0').append("<li class='text-white'>" + value[0] + "</li>");
                            $('#arivalTimeList0').append("<li class='text-white'>" + value[1]+ "</li>");
                            $('#burstTimeList0').append("<li class='text-white'>" + value[2] + "</li>");
                            $('#ganttChart0').append("<div style='width:" + value[2] + "px;height:100px;border:1px solid #fff; background-color:#2b3de1'></div>");
                        }
                        
                    });
                    //display waiting timeand turnaround time
                    $('#waitingTime0').text("Waiting time: "+(waitingTime0/processItemList.length));
                    $('#turnaroundTime0').text("Turnaround time: "+(turnaroundTime0/processItemList.length));


                    
                    processList0.sort(function(a,b){
                        return a[1]- b[1] || a[2] - b[2];
                    })                     

                    
                    var x = processList0[0][1] + processList0[0][2]; // arival time+burst time of first process
                    processList1 = [];
                    processList1.push(processList0.shift());

                    //sort according to SJF schedule
                    while(true){
                        var z = 0;

                        if(!processList0.length){
                            break;
                        }

                        for(var i = 0;i< processList0.length; i++ ){
                            if(processList0[i][1] > x){
                                intermArray = processList0.splice(0,i);
                                intermArray.sort(function(a,b){
                                    return a[2]- b[2]
                                });
                                processList0 = intermArray.concat(processList0);
                                z = 1;
                                processList1.push(processList0.shift());
                                break;
                            }
                        }
                        
                        if(!z){
                            processList0.sort(function(a,b){
                                return a[2] - b[2];
                            });
                            x += processList0[0][1]
                            processList1.push(processList0.shift());
                        }
                    }

                    //add intervals
                    var currentTime = processList1[0][1];
                    for(var i = 0; i<processList1.length; i++){
                        var processName = processList1[i][0];
                        var arivalTime = processList1[i][1];
                        var burstTime = processList1[i][2];
                        var processItem1 = [];
                        if(currentTime < arivalTime){
                            processItem1.push('Waiting');
                            processItem1.push(currentTime);
                            processItem1.push(arivalTime - currentTime);

                            processList2.push(processItem1);

                            currentTime = arivalTime;

                            processItem1 = [];
                            processItem1.push(processName);
                            processItem1.push(arivalTime);
                            processItem1.push(burstTime);
                            processItem1.push(currentTime - arivalTime);
                            processItem1.push(currentTime);

                            processList2.push(processItem1);
                            currentTime += processItemList[i][1];

                        }else{
                            processItem1.push(processName);
                            processItem1.push(arivalTime);
                            processItem1.push(burstTime);
                            processItem1.push(currentTime - arivalTime);
                            processItem1.push(currentTime);
                            waitingTime1 += currentTime - arivalTime;

                            processList2.push(processItem1);
                            currentTime += processItemList[i][1];
                        }
                    }                      

                    //clear
                    $('#ganttChart1').empty();
                    $('#processList1').empty();
                    $('#processList1').append("<div class='text-white'> <strong>Process Name </strong><br></div>");
                    $('#arivalTimeList1').empty();
                    $('#arivalTimeList1').append("<div class='text-white'> <strong>Arival time(ms)</strong> <br></div>");
                    $('#burstTimeList1').empty();
                    $('#burstTimeList1').append("<div class='text-white'> <strong>Burst time(ms)</strong> <br></div>");

                    //build gantt chart and table for SJF
                    $.each(processList2,function(index,value){
                        if(value[0] === 'Waiting'){
                            $('#ganttChart1').append("<div style='width:" + value[2] + "px;height:100px;border:1px solid black; background-color:black'></div>");
                        }else{
                            $('#ganttChart1').append("<div style='width:" + value[2] + "px;height:100px;border:1px solid #fff; background-color:#2b3de1'></div>");
                            $('#processList1').append("<li class='text-white'>" + value[0] + "</li>");
                            $('#arivalTimeList1').append("<li class='text-white'>" + value[1]+ "</li>");
                            $('#burstTimeList1').append("<li class='text-white'>" + value[2] + "</li>");
                        }
                    });
                    //display waiting time and turnaround time
                    $('#waitingTime1').text("Waiting time: "+(waitingTime1/processItemList.length));
                    $('#turnaroundTime1').text("Turnaround time: "+(turnaroundTime1/processItemList.length));

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

