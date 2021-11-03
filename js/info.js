/**
  Computer exercise for TNM093
  Course responsible: Alexander Bock
  Created by: Kahin Akram
  August 2020
 */
function info(data) {	

	var margin = { top: 0, right: 0, bottom: 0, left: 0 },
			width  = $('div.info-container').width() - margin.left - margin.right,
			height = $('div.info-container').height() - margin.top - margin.bottom;

	var info_svg = d3.selectAll('div.info-container svg')
	.attr('viewBox', '0 0 ' +  ( width + margin.left + margin.right ) + ' ' +
		( height  + margin.top + margin.bottom ) )
	.attr('height', height)
	.attr('width', '100%')
	.attr('preserveAspectRatio', 'none')
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	// the columns you'd like to display
	var columns = ["Region","Inkomst","Skattesats",
			"H. studerande","Medelålder","Lgh i flerbostadshus",
			"Inflyttade","Utflyttade","Folkmängd"];

	var table = d3.select("#info-container").append("table")
				.attr('class', 'table-striped table-hover');
	var thead = table.append("thead");
	var tbody = table.append("tbody");

	// append the header row
	thead.append("tr")
		.selectAll("th")
		.data(columns)
		.enter()
		.append("th")
		.attr('class', 'font-size')
		.text(function (column) { return column; });

	// create a row for each object in the data
	var rows = tbody.selectAll("tr")
		.data(data)
		.enter()
		.append("tr");

	// create a cell in each row for each column
	var cells = rows.selectAll("td")
		.data(function(row) {
			return columns.map(function(column) {
				return {column: column, value: row[column]};
			});
		})
		.enter()
		.append("td")
		.text(function(d) { return d.value; })

		/**
		*  Final Task -- call the two function below.
		*/
	
	//Select a line and a dot from the other two methods.
	function selectValues(param) {
		pc.selectLine(param.value)
		sp.selectDot(param.value)
	}
	//Reset the selection.
	function resetSelectedValues() {
		pc.resetSelectLine()
		sp.resetSelectDot()
	}

}