function Column(id, name) {
	var self = this;
	this.id = id;
	this.name = name || 'No name given';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul data-id="' + self.id + '" class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});
		columnTitle.click(function() {
			self.changeColumnName();
		});
		/**Dodawanie kolumny */
		columnAddCard.click(function(event) {
			var cardName = prompt("Enter the name of the card");
			if (cardName === null) {
				return;
			}
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id
				},
				success: function(response) {
					var card = new Card(response.id, cardName);
					self.createCard(card);
				}
			});
		});
		// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle).append(columnDelete).append(columnAddCard).append(columnCardList);
		return column;
	}
}
Column.prototype = {
	createCard: function(card) {
		this.element.children('ul').append(card.element);
	},
	deleteColumn: function() { /*W celu usunięcia kolumny należy wysłać zapytanie metodą DELETE na endpoint /column/{id_kolumny}. */
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function(response) {
				self.element.remove();
				/**po uzyskaniu potwierdzenia z serwera, że element został usunięty, możemy usunąć go również z widoku. 
				Stąd użycie metody self.element.remove() w funkcji podpiętej do success. */
			}
		});
	},
	changeColumnName: function() {
		var newColumnName = prompt('Enter a new column name');
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'PUT',
			data: {
				name: newColumnName
			},
			success: function(response) {
				self.element.find('.column-title').text(newColumnName);
			}
		});
	}
};