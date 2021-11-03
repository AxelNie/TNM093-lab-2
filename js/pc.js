/**
  Computer exercise for TNM093
  Course responsible: Alexander Bock
  Created by: Kahin Akram
  August 2020
 */
function pc(data) {
	
	var margin = { top: 20, right: 10, bottom: 20, left: 10 },
		width  = $('div.pc-container').width(),
		height = $('div.pc-container').height();

	var x = d3.scalePoint()
		.domain(dimensions.map(function(d) { return d.name; }))
		.range([0, width])
		.padding(1);

	var line = d3.line()
		.defined(function(d) { return !isNaN(d[1]); });
		
	var yAxis = d3.axisLeft();
	var y = {};
	var x = d3.scalePoint().range([0, width]).padding(2);
	var extents, origDimensions, dragging = {};

	var pc_svg = d3.selectAll('div.pc-container svg')
	.attr('viewBox', '0 0 ' +  (
		width + margin.left + margin.right )
		+ ' ' + ( height  + margin.top + margin.bottom ) )
	.attr('height', height)
	.attr('width', '100%')
	.attr('preserveAspectRatio', 'none')
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	x.domain(dimensions = d3.keys(data[0]).filter(function (d){
		return d != "Region" && (y[d] = d3.scaleLinear()
			.domain(d3.extent(data, function (p) { return +p[d]; }))
			.range([height, 0]));
	}));

	origDimensions = dimensions.slice(0);
	extents = dimensions.map(function (p) { return [0, 0]; });

	/** Computer Exercise starts here  */

	// Task 5.0.8 -- Drawing the Lines
	var foreground = pc_svg.append('g').attr('class', 'foreground').selectAll('path').data(data).enter().append('path').attr('d', drawPath)
	pc_svg.selectAll('path').style('fill', 'transparent').style('stroke', 'darkturquoise').style('opacity', '0.3')

	// Task 5.0.9 -- Drawing Axes
	var axes = pc_svg.selectAll('.dimension').data(dimensions).enter().append('g')
    .attr('class', 'dimension axis')
    .attr('transform', function (d) {
      return 'translate(' + position(d) + ' ' + (0) + ')'
    }).each(function (d) {
      d3.select(this).call(
        d3.axisLeft()
        .scale(d3.scaleLinear()
          .domain(
            [d3.max(data.map(data => Number(data[d]))), d3.min(data.map(data => Number(data[d])))]
          )
          .range([0, height]))
      )
    })


	// 5.0.10 -- Appending Axes Titles
	const axesTitles = axes.append('text')
    .attr('class', 'dimension axis')
    .attr('text-anchor', 'middle')
    .attr('transform', function (d) {
      return 'translate(' + 0 + ' ' + (height + 14) + ')'
    }).text(title => title)

	// 5.0.11 -- Interaction, brushing the axes
	const brushStrokes = axes.append('g')
    .attr('class', 'brush')
    .each(function (d) {
      d3.select(this).call(perAxisBrush(d))
    })

  axes.selectAll('rect')
    .attr('x', -8)
    .attr('width', 10)

	//5.0.12 -- Interaction, dragging the Axes
	
	axes.call(d3.drag()
    .subject((d) => {return {x: x(d)}})
    .on('start', (e) => {
      startDrag(e)
    })
    .on('drag', (e) => {
      drag(e)
    })
    .on('end', (e) => {
      endDrag(e)
    })
  )
	/** Computer Exercise ends here  */

	/**NECESSARY FUNCTION. DO NOT TOUCH */

	function perAxisBrush(d){
		return y[d].brush = d3.brushY()
			.extent([[-10, 0], [10, height]])
			.on("brush", brush)
			.on("end", brush)
	}

	function startDrag(d){
		dragging[d] = x(d);
	}

	function drag(d){
		dragging[d] = Math.min(width, Math.max(0, d3.event.x));
		foreground.attr("d", drawPath);
		dimensions.sort(function (a, b) { return position(a) - position(b); });
		x.domain(dimensions);
		axes.attr("transform", function (d) { return "translate(" + position(d) + ")"; })
	}

	function endDrag(d){
		delete dragging[d];
		transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
		transition(foreground).attr("d", drawPath);

		var new_extents = [];
		for (var i = 0; i < dimensions.length; ++i){
			new_extents.push(extents[origDimensions.indexOf(dimensions[i])]);
		}
		extents = new_extents;
		origDimensions = dimensions.slice(0);
	}

	// Handles a brush event, toggling the display of foreground lines.
	function brush(){
		var actives = [];
		pc_svg.selectAll(".brush")
		.filter(function (d){
			y[d].brushSelectionValue = d3.brushSelection(this);
			return d3.brushSelection(this);
		})
		.each(function (d){
			// Get extents of brush along each active selection axis (the Y axes)
			actives.push({
				dimension: d,
				extent: d3.brushSelection(this).map(y[d].invert)
			});
		});
		// Update foreground to only display selected values
		foreground.style("display", function (d){
			return actives.every(function (active){
				return active.extent[1] <= d[active.dimension] && d[active.dimension] <= active.extent[0];
			}) ? null : "none";
		});
	}

	// Returns the path for a given data point.
	function drawPath(d){
		return line(dimensions.map(function (p){
			return [x(p), y[p](d[p])];
		}));
	}

	this.selectLine = function (value){
		d3.select(".foreground").selectAll('path')
		.style("stroke", function (d){
			return d.Region == value ? "deeppink" : 'darkturquoise';
		})
		.style("stroke-width", function (d){
			return d.Region == value ? "3.0" : '0.3';
		})
		.style("opacity", function (d){
			return d.Region == value ? "1.0" : '0.3';
		})
	}

	this.resetSelectLine = function (){
		var l = d3.select(".foreground");
		l.selectAll("path")
		.style("stroke", "darkturquoise")
		.style("stroke-width", '0.4px')
		.style("opacity", '1.0')
	}

	function position(d){
		var v = dragging[d];
		return v == null ? x(d) : v;
	}

	function transition(g){
		return g.transition().duration(500);
	}
	/**END*/
}

	

