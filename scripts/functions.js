
var serverUrl = "http://www.cbioportal.org/webservice.do?";
var pCColor;


function getClinicalData(cancer_study_id) {

    d3.select("#par_coords").remove();

    var clinicalDataQuery = serverUrl + "cmd=getClinicalData&case_set_id=" + cancer_study_id + "_all";
    var pCColor;

    console.log(clinicalDataQuery);

    new Promise(function(resolve) {
        d3.tsv(clinicalDataQuery, function(p) { resolve(p); })
    })
        .then(function(clinicalDataResult) {

            clinicalData = clinicalDataResult;
            plotParallelCoordinate(clinicalData);

        });

}
function plotParallelCoordinate(clinicalData) {

    d3.select("#par_coords").remove();
    //d3.select("#bubble_chart").remove();

    if (clinicalData.length > 1) {
        var noProps = Object.keys(clinicalData[0]).length;
        console.log(clinicalData)
        if (noProps > 5) {
            var props = Object.keys(clinicalData[0]);

            var tClinicalData = [];

            clinicalData.forEach(function(cd) {
                //console.log(cd);
                var rcd = new Object();
                for (var i = 0; i < 6; i++) {
                    rcd[props[i]] = cd[props[i]];
                }
                tClinicalData.push(rcd);
            });

            //console.log(tClinicalData);
            clinicalData = tClinicalData;
        }

    }

    var parcoords = d3.parcoords()('#clinicalHolder')
        .color("orange")
        .alpha(0.4);

    parcoords
        .data(clinicalData)
        .render()
        .brushMode("1D-axes");

}





function arrayContainsArray(superset, subset) {
    return subset.every(function (value) {
        return (superset.indexOf(value) >= 0);
    });
}

function getColor(study_type) {
    if (study_type == "bladder")
        return "blue";
    else if (study_type == "breast")
        return "orange";
    else if (study_type == "liver")
        return "purple";
    else if (study_type == "pancreatic")
        return "red";
    else if (study_type == "skin")
        return "green";
    else {
        return "black";
    }
}

function setThresholdValue(min, max) {
    var thresholdvalue = document.getElementById("thersholdSlider");
    thresholdvalue.min = min;
    thresholdvalue.max = max;
    thresholdvalue.value = min;
    document.getElementById("lblminthreshold").innerHTML = min;
    document.getElementById("lblmaxthreshold").innerHTML = max;
}
function DrawBublleChart(d) {
    var bubblearray = [];
    console.log(d);
    d.genes.forEach(function (data) {
        if(data.pdbid.length>0){
        bubblearray.push({"name": data.protein, "freq": +data.freq, "pdbid": data.pdbid})}

    })


    var width = 500,
        height = 500;

    //Set up the colour scale
    var color = d3.scale.category20();
    var bubbleNodeScale = d3.scale.linear().domain(d3.extent(bubblearray, function (e) {
        return e.freq
    })).range([30, 40]);
    d3.select("#bubblesvg").remove();//Clear
    //Set up the force layout
    var force = d3.layout.force().charge(-180)
        .size([width, height]);
    force.nodes(bubblearray).start();
    d3.select("#bubblesvg").remove();
    var bubblesvg = d3.select("#bubblechart").append("svg")
        .attr("width", width)
        .attr("height", height)
       .attr("id", "bubblesvg").style("background-color", "darkgray"
       );
    bubblesvg.append("text").text("Selected Cancer Study: "+ d.id).attr("x",10).attr("y", 20);

    var defs = bubblesvg.append("defs");
    defs.selectAll(".circle-pattern")
        .data(bubblearray).enter().append("pattern")
        .attr("id", function (d) {
            return d.name
        })
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1).attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("xlink:href", function (d) {
            if(d.pdbid)
            return "http://www.rcsb.org/pdb/images/" + d.pdbid + "_bio_r_500.jpg?bioNum=1";
            else return "images/no.png"
        });
    //Create all the line svgs but without locations yet
    //Do the same with the circles for the nodes - no
    var node = bubblesvg.selectAll(".node")
        .data(force.nodes())
        .enter().append("g").attr("class","csbubble")

        node.append("circle")
            .attr("class", "cbubble")
        .attr("r", function (e) {
            return bubbleNodeScale(e.freq)
        })
        .style("fill", function (d) {
            return "url(#" + d.name + ")"
        })
        .call(force.drag);
        node.append("text").attr("class","txtclass").text(function(d){return d.name}).style("text-anchor","middle").style("opacity",0);
    node.append("title").html(function (d) {
        return "Name:" + d.name + "<br/>" + "Freq: " + d.freq
    });


    //Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
    force.on("tick", function () {

        node
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
    });

    $(document).ready(function () {
        $('#chkGenes').change(function(){

            if(this.checked){
             var removeimage =   bubblesvg.selectAll(".cbubble");
                removeimage.style("opacity",0.3)
                var textAtt =bubblesvg.selectAll(".txtclass");
                textAtt.style("opacity",1)
            }
            else{
                var removeimage =   bubblesvg.selectAll(".cbubble");
                removeimage.style("opacity",1)
                var textAtt =bubblesvg.selectAll(".txtclass");
                textAtt.style("opacity",0)
            }

        });


    })


}
