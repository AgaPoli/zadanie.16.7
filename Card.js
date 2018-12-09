// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;
	this.id = id;
	this.name = name || 'No name given'; /*wartość domyślną dla nazwy kolumny, jeśli będzie pusta */
	this.element = createCard();
	/*Operacje, które możemy wykonać w obrębie kolumny, to dodanie nowej karty lub usunięcie kolumny. */
	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		cardDeleteBtn.click(function() {
			self.removeCard();
		});
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription)
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function() {
				self.element.remove();
			}
		});
	},
};