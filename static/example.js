
d3.select("body")
    .selectAll("p")
        .data(["hello", "hi", "yo", "hola", "whats up", "why"])
        .enter()
        .append("p")
            .text(function(d){
                return d + ", world";
                })