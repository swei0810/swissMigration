var data1 = [
    { group: "2016", value: 20.4 },
    { group: "2017", value: 21.5 },
    { group: "2018", value: 20.2 }
];

var data2 = [
    { group: "2016", value: 22.5 },
    { group: "2017", value: 23.4 },
    { group: "2018", value: 22.2 }
];

// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(".citizenship")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// X axis
var x = d3.scaleBand()
    .range([0, width])
    .domain(data1.map(function (d) { return d.group; }))
    .padding(0.2);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

// Add Y axis
var y = d3.scaleLinear()
    .domain([0, 40])
    .range([height, 0]);
svg.append("g")
    .attr("class", "myYaxis")
    .call(d3.axisLeft(y));

// A function that create / update the plot for a given variable:
function update(data, type) {

    var u = svg.selectAll("rect")
        .data(data)
    let color = "#69b3a2";
    if (type === "female") {
        color = "#fdfd96";

    }

    u
        .enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", function (d) { return x(d.group); })
        .attr("y", function (d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.value); })
        .attr("fill", color)
}

// Initialize the plot with the first dataset
update(data1)