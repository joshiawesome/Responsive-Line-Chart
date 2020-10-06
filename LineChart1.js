var lineData = [{
  'x': 1,
  'y': 5
}, {
  'x': 20,
  'y': 20
}, {
  'x': 40,
  'y': 10
}, {
  'x': 60,
  'y': 40
}, {
  'x': 80,
  'y': 5
}, {
  'x': 100,
  'y': 60
}];
var lineData2 = [{
  'x': 1,
  'y': 5
}, {
  'x': 20,
  'y': 20
}, {
  'x': 40,
  'y': 10
}, {
  'x': 60,
  'y': 40
}, {
  'x': 80,
  'y': 5
}, {
  'x': 100,
  'y': 60
}];

var line1_Text="^SPX";
var line2_Text="^TPX"

LineChart("#visualisation1",lineData,line1_Text);
LineChart("#visualisation2",lineData2,line2_Text);

function LineChart(div,lineData,texts) {

  console.log(texts);

  var vis = d3.select(div),
    WIDTH = 200,
    HEIGHT = 60,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    };

    d3.selectAll("svg")
    .attr("width", 200)
    .attr("height",60)
    .call(responsivefy);

  var xRange = d3.scaleLinear()
   .range([MARGINS.left, WIDTH - MARGINS.right])
    .domain([d3.min(lineData, function (d) {
        return d.x;
      }),
      d3.max(lineData, function (d) {
        return d.x;
      })
    ]);

  var yRange = d3.scaleLinear()
    .range([HEIGHT - MARGINS.top, MARGINS.bottom])
    .domain([d3.min(lineData, function (d) {
        return d.y;
      }),
      d3.max(lineData, function (d) {
        return d.y;
      })
    ]);

 
  /*var aspect=WIDTH/HEIGHT;
  console.log(aspect);
  var targetwidth = $(window).width();
  console.log(targetwidth);
  var chart=d3.select(div);

  var widths = div.clientWidth;
  console.log(widths);*/
 

  vis.append("svg:g")
    .attr("class", "x axis")
    .attr("id", "x")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(d3.axisBottom(xRange))
    .call(vis => vis.select(".domain").remove());

  vis.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(d3.axisLeft(yRange))
    .call(vis => vis.select(".domain").remove());

  xRange.tickFormat(function (d) { return ''; });

  
  var lineFunc = d3.line()
  .x(function (d) {
    return xRange(d.x);
  })
  .y(function (d) {
    return yRange(d.y);
  });
 

  vis.append("svg:path")
  .attr("class", "line")
  .attr("d", lineFunc(lineData))
  .attr("stroke", "#E91E63")
  .attr("stroke-width", 2)
  .attr("fill", "none");

  var lo=window.innerWidth;
    console.log(lo);

  function responsivefy(vis) {
    var container = d3.select(vis.node().parentNode),
        width = parseInt(vis.style("width")),
        height = parseInt(vis.style("height")),
        aspect = width / height;

    var targetWidth = parseInt(container.style("width"));
    console.log(targetWidth);

    vis.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMid")
        .attr("width", 200)
        .attr("height",60);

    d3.select(window).on("resize." + container.attr("id"), resize);

    
    function resize() {
        var targetWidth;
        var targetwidths = $(window).width();
        console.log(targetwidths);
        //targetWidth = parseInt(container.style("width"));
        targetWidth=$(window).width();
        if(targetWidth>1024){
          vis.attr("width", 200);
          vis.attr("height", 60);
        }
        else{
        console.log(targetWidth);
        vis.attr("width", targetWidth);
        vis.attr("height", Math.round(targetWidth / aspect));
        }
    }
  } 
}