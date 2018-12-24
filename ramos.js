var APPROVED = [];

function Ramo(nombre, sigla, creditos, sector, prer=[], id, colorBySector) {
	this.nombre = nombre;
	this.sigla = sigla;
	this.creditos = creditos;
	this.sector = sector;
	this.prer = new Set(prer);
	this.id = id;
	let approved = false;
	let self = this;
	let ramo;

	this.draw = function(canvas, posX, posY, size) {
		ramo = canvas.append('g')
			.attr('id', self.sigla);
		var graybar = size/5;

		ramo.append("rect")
			.attr("x", posX)
			.attr("y", posY)
			.attr("width", size*1.2)
			.attr("height", size)
			.attr("fill", colorBySector[sector][0]);

		// above bar
		ramo.append("rect")
			.attr("x", posX)
			.attr("y", posY)
			.attr("width", size*1.2)
			.attr("height", graybar)
			.attr("fill", '#6D6E71');

		// below bar
		ramo.append("rect")
			.attr("x", posX)
			.attr("y", posY + size - graybar)
			.attr("width", size*1.2)
			.attr("height", graybar)
			.attr("fill", '#6D6E71');

		// credits rect
		ramo.append("rect")
			.attr("x", posX + size*1.2 - 23)
			.attr("y", posY + size - graybar + 1)
			.attr("width", 19)
			.attr("height", 18)
			.attr("fill", 'white');
		ramo.append("text")
			.attr("x", posX + size*1.2 - 17)
			.attr("y", posY + size - 6)
			.text(self.creditos)
			.attr("font-family", "sans-serif")
			.attr("font-weight", "regular")
			.attr("fill", "black")
			.attr("font-size", 12);
			
		
		ramo.append("text")
			.attr("x", posX + size*1.2/2)
			.attr("y", posY + size/2)
			.text(self.nombre)
			.attr("class", "ramo-label")
			.attr("font-family", 'sans-serif')
			.attr("fill", function() {
				if (self.sector != 'IS')
					return "white";
				return '#6D6E71';
			})
			.attr("font-size", 13)
			.attr("text-anchor", "middle")
			.attr("dy", 0)

		// Sigla
		ramo.append("text")
			.attr("x", posX + 2)
			.attr("y", posY + size/7)
			.text(self.sigla)
			.attr("font-family", "sans-serif")
			.attr("font-weight", "bold")
			.attr("fill", "white")
			.attr("font-size", 12);

		ramo.append("rect")
			.attr("x", posX)
			.attr("y", posY)
			.attr("width", size*1.2)
			.attr("height", size)
			.attr("fill", 'white')
			.attr("opacity", "0.001")
			.attr("class", "non-approved");

		var cross = ramo.append('g').attr("class", "cross").attr("opacity", 0);
		cross.append("path")
			.attr("d", "M" + posX + "," + posY + "L" + (posX+size*1.1) + "," + (posY+size))
			.attr("stroke", "#550000")
			.attr("stroke-width", 9);

		// id
		ramo.append("circle")
			.attr("cx", posX + size*1.2-10)
			.attr("cy", posY + graybar/2 )
			.attr("fill", "white")
			.attr("r", 8);
		ramo.append("text")
			.attr("x", function() {
				if (self.id > 9)
					return posX + size*1.2-10
				return posX + size*1.2 - 10.5
			})
			.attr("y", posY + graybar/2 + 3)
			.attr("text-anchor", "middle")
			.attr('font-family', 'sans-serif')
			.attr("fill", "black")
			.attr('font-size', 10)
			.text(self.id);

		// prerr circles!
		let c_x = 0;
		self.prer.forEach(function(p) {
			let r = 10;
			ramo.append("circle")
				.attr('cx', posX + r + c_x + 5)
				.attr('cy', posY + size - graybar/2)
				.attr('r', r)
				.attr('fill', colorBySector[all_ramos[p].sector][0])
				.attr('stroke', 'white');
			ramo.append('text')
				.attr('x', posX + r + c_x + 5)
				.attr('y', posY + size - graybar/2 + 5)
				.text(all_ramos[p].id)
				.attr("text-anchor", "middle")
				.attr("font-family", "sans-serif")
				.attr("font-size", 12)
				.attr('fill', 'white');
			c_x += r*2;
		});

		ramo.on('click', self.approveRamo);

		return;
	}

	this.approveRamo = function() {
			if (!approved) {
				d3.select("#" + self.sigla).select(".cross").transition().delay(20).attr("opacity", "1");
				APPROVED.push(self);
			} else {
				d3.select("#" + self.sigla).select(".cross").transition().delay(20).attr("opacity", "0.01");
				let _i = APPROVED.indexOf(self)
				if (_i > -1) {
					APPROVED.splice(_i, 1);
				}
			}
			approved = !approved;
	}

	this.verifyPrer = function() {
		let _a = [];
		APPROVED.forEach(function(ramo) {
			_a.push(ramo.sigla);
		});
		_a = new Set(_a);
		for(let r of self.prer) {
			if (!_a.has(r)) {
				ramo.select(".non-approved").transition().duration(70).attr("opacity", "0.71");
				return;
			}
		}
		ramo.select(".non-approved").transition().duration(70).attr("opacity", "0.0");
	}

}
