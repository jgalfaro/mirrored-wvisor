App.FineGrained2dvisualizationView = Ember.View.extend({
  didInsertElement: function() {

    $("div.experiment").hide();
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = 1400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        // .style("margin-left", "200px")
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", d3Zoom));

    var tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "-10")
      .style("margin-left", "200px")
      .style("visibility", "hidden")
      .attr("id", "tooltip")
      .text("");

    var rect = svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height);
  },

  willDestroy: function() {
    $("svg").remove();
    $("#tooltip").remove();
    $("div.experiment").show();
  }
});
