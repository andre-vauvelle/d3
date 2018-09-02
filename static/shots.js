d3.csv("static/shots.csv", function(data){

   var shots = d3.select("svg")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
            .attr("class", "shot")
            .attr("transform", function(d){
                return "translate(" + (d.converted_y * 1.1 + 100) + "," + (d.converted_x * 1.1+ 300) + ")";
            })
        .on("mouseover", function(d){
            d3.select(this).raise()
                .append("text")
                .attr("class", "playername")
                .text(d.player);
         })
         .on("mouseout", function(d){
                d3.selectAll("text.playername").remove();
            })

   shots.append("circle")
       .attr("r", 6)
       .attr("fill", function(d) {
        if (d.result == "Made Shot") {
            return "green";
        } else {
            return "red";
        }
    })

    var players = d3.nest()
        .key(function(d){ return d.player; })
            .rollup(function(v){ return v.length; })
        .entries(data);
    console.log(players);

    var selector = d3.select("#selector");

    selector
        .selectAll("option")
        .data(players)
        .enter()
        .append("option")
            .text(function(d){ return d.key + ":" + d.value; })
            .attr("value", function(d){ return d.key; })

    selector
        .on("change", function(){
            d3.selectAll(".shot")
                .attr("opacity", 1.0);
                var value = selector.property("value");
                if (value != "ALL") {
                    d3.selectAll(".shot")
                        .filter(function(d) { return d.player != value; })
                        .attr("opacity", 0.1);
                        }
                })

})