function d3Zoom() {
  // console.log(d3.selectAll("svg"));
  d3.selectAll("svg").selectAll("circle").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  //console.log(d3.event.scale)
  d3.selectAll("svg").selectAll("circle").attr("r", 5/d3.event.scale);
}

// render(remoteHost+"/data/experiments/14/clusters/fine_grained/0-mds.tsv");

function d3UpdateTooltip(tooltip, text) {
  d3.select("div#tooltip2").html(text);
}

function d3Render(file) {
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 1400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  var x = d3.scale.linear()
    .domain([-0.5, 0.5])
    .range([0, width]);

  var y = d3.scale.linear()
      .domain([0.5, -0.5])
      .range([0, height]);

  var color = d3.scale.category10();

  d3.tsv(file, function(error, data) {

    d3.select("body").transition();

    d3.select("svg").selectAll("circle").remove();

    d3.select("svg").selectAll("circle")
        .data(data)
      .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .attr("transform", function(d) { return "translate(" + d.x + ","+d.y+");"; })
        .style("fill", function(d) { return color(d.cluster); })
        .on("mouseover", function(d){ d3UpdateTooltip(d3.select("#tooltip"), d.cluster+'<br>'+d.url); return d3.select("#tooltip").style("visibility", "visible");})
        .on("mouseout", function(){ d3UpdateTooltip(d3.select("#tooltip"), '&nbsp;<br>&nbsp;'); return d3.select("#tooltip").style("visibility", "hidden");});

  });
}
