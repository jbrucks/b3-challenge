// Read in data
d3.json("data/samples.json").then((data) => {

  // Define sections of data
  var names = data.names;
  var metadata = data.metadata;
  var samples = data.samples;
    // console.log(names);
    // console.log(metadata); 
    // console.log(samples);

  // initialize charts for rewriting with input data
  function init() {
    // Set up bar chart
    // var trace1 = {
    //   x: [],
    //   y: [],
    //   mode: 'markers',
    //   marker: {
    //     size: []
    //   }
    // };
    
    // var data = [trace1];
  
    // var barChart = d3.selectAll("#bar").node();
  
    // Plotly.newPlot(barChart, data);
    var dropdownMenu = d3.selectAll("#selDataset").node();
    var metaID = dropdownMenu.value;
    var barchartInfo = samples.filter(sample => sample.id.toString() === metaID)[0];
    var otu_ids = barchartInfo.otu_ids.slice(0,10)
    var otu = otu_ids.map(d => "OTU " + d);
    var sample_values = barchartInfo.sample_values.slice(0,10)
    var otu_labels = barchartInfo.otu_labels.slice(0,10)
    // console.log(otu)
    // console.log(sample_values)
    // console.log(otu_labels)
    trace = [{
      x: sample_values,
      labels: otu,
      text: otu_labels,
      type: "bar",
      orientation: "h",
    }]
    var data = [trace]
    var layout = {
      title: 'OTU ID',
      showlegend: false,
    };
    var barChartloc = d3.selectAll("#bar").node();
  
    Plotly.react(barChartloc, data, layout);
    
    // Set up bubble chart
    var trace2 = {
      x: [],
      y: [],
      mode: 'markers',
      marker: {
        size: []
      }
    };
    
    var data2 = [trace2];
    
    var layout = {
      title: 'OTU ID',
      showlegend: false,
    };
    
    var bubbleChart = d3.selectAll("#bubble").node();

    Plotly.newPlot(bubbleChart, data2, layout);
  }

  // Variable for dropdown selection
  var idSelect = d3.select("#selDataset");

  // write in names for drop down selection
  names.forEach(function(num){
    idSelect.append("option").attr("value", num).text(num);
  });

  function demoInfo(event) {
    var dropdownMenu = d3.selectAll("#selDataset").node();
    var metaID = dropdownMenu.value;
    // console.log(metaID)
    var metaInfo = metadata.filter(meta => meta.id.toString() === metaID)[0];
    // console.log(metaInfo)
    var metaSpace = d3.select("#panel").select(".sample-metadata");
    Object.entries(metaInfo).forEach(([key, value]) => {
      metaSpace.append("p").text(`${key}: ${value}`)
    });
  };

  function barChart(event) {
    var dropdownMenu = d3.selectAll("#selDataset").node();
    var metaID = dropdownMenu.value;
    var barchartInfo = samples.filter(sample => sample.id.toString() === metaID)[0];
    var otu_ids = barchartInfo.otu_ids.slice(0,10)
    var otu = otu_ids.map(d => "OTU " + d);
    var sample_values = barchartInfo.sample_values.slice(0,10)
    var otu_labels = barchartInfo.otu_labels.slice(0,10)
    // console.log(otu)
    // console.log(sample_values)
    // console.log(otu_labels)
    trace1 = [{
      x: sample_values,
      labels: otu,
      text: otu_labels,
      type: "bar",
      orientation: "h",
    }]
    var data1 = [trace1]
    var layout2 = {
      title: 'OTU ID',
      showlegend: false,
    };
    var barChartloc = d3.selectAll("#bar").node();
  
    Plotly.react(barChartloc, data1, layout2);
  };

  function bubbleChart(event) {
    var dropdownMenu = d3.selectAll("#selDataset").node();
    var metaID = dropdownMenu.value;
    var bubblechartInfo = samples.filter(sample => sample.id.toString() === metaID)[0];
    var otu_ids2 = bubblechartInfo.otu_ids
    var sample_values2 = bubblechartInfo.sample_values
    var otu_labels = bubblechartInfo.otu_labels
    // console.log(otu)
    // console.log(sample_values)
    // console.log(otu_labels)
    var trace3 = {
      y: sample_values2,
      x: otu_ids2,
      mode: 'markers',
      text: otu_labels,
      marker: {
        size: sample_values2,
        color: otu_ids2
      }
    };
  
    var data3 = [trace3];
    
    var layout2 = {
      title: 'OTU ID',
      showlegend: false,
    };
    
    var bubbleChartloc = d3.selectAll("#bubble").node();

    Plotly.react(bubbleChartloc, data3, layout2);
  };

  // initialize functions and event handlers
  barChart();
  bubbleChart();
  demoInfo();
  init();
  d3.select("#selDataset").on("change", demoInfo);
  d3.select("#selDataset").on("change", barChart);
  d3.select("#selDataset").on("change", bubbleChart);
})
.catch(function(error) {
  console.log(error)
});