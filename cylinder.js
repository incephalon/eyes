function drawMeCylinders()
{

var data = [[200,400,5],[500,90,7],[200,800,12]]; 
var width = 40;   
    
var svg = d3.select("svg")
   


var rects = d3.select("svg").selectAll("rect")
    .data(data)
    .enter().append("rect")
    .style("fill","grey")
    .attr("y", function(d,i){console.log(d);)
    .attr("id", function(d,i){return "rect"+i;})
    .attr("x", function(d,i){ return d[0];})
	.attr("width", width)
    .attr("height",1)
    .attr("stroke","black")
    .attr("stroke-width",1);
    
var ellipses = d3.select("svg").selectAll("ellipse")
    .data(data)
    .enter().append("ellipse")
    .style("fill","grey"})
    .attr("cy", function(d,i){return d[1];)
	.attr("cx", function(d,i){return d[0];})
	.attr("rx", width/2)
	.attr("ry", 15)
    .attr("stroke","black")
    .attr("stroke-width",1);
                              
var rects2 = d3.select("svg").selectAll("rect2")
    .data(data)
    .enter().append("rect")
    .style("fill","grey")
    .attr("y", function(d,i){return d[1];)
    .attr("id", function(d,i){return "rect"+i;})
    .attr("x", function(d,i){ return d[0]+2-width/2;})
	.attr("width", width-4)
    .attr("height",1)
    .attr("stroke","black")
    .attr("stroke-width",1);

var ellipses2 = d3.select("svg").selectAll("ellipse2")
    .data(data)
    .enter().append("ellipse")
    .style("fill","grey"})
    .attr("cy", function(d,i){return d[1];)
	.attr("cx", function(d,i){return d[0];})
	.attr("rx", width/2)
	.attr("ry", 15)
    .attr("stroke","black")
    .attr("stroke-width",1);



    
        
}